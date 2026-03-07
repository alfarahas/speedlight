// routes/solutionDetails.js
import express from 'express';
import multer from 'multer';
import SolutionDetail from '../models/SolutionDetail.js';
import Solution from '../models/Solution.js';
import { authenticateToken, isAdmin, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for memory storage (keeping for partner logos if needed)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Helper function to parse JSON fields safely
const parseJSONField = (field, defaultValue = {}) => {
  if (!field) return defaultValue;
  try {
    return typeof field === 'string' ? JSON.parse(field) : field;
  } catch (error) {
    return defaultValue;
  }
};

// @route   POST /api/solution-details
// @desc    Create a new solution detail
// @access  Private/Admin
router.post('/', adminAuth, upload.fields([
  { name: 'partnerLogos', maxCount: 10 } // Only partner logos need file upload now
]), async (req, res) => {
  try {
    const { body, files } = req;
    
    console.log('📥 Received body:', body);
    
    // Check if solution exists
    const solution = await Solution.findById(body.solutionId);
    if (!solution) {
      return res.status(404).json({ 
        success: false,
        error: 'Solution not found' 
      });
    }

    // Check if solution detail already exists for this solution
    const existingDetail = await SolutionDetail.findOne({ solutionId: body.solutionId });
    if (existingDetail) {
      return res.status(400).json({ 
        success: false,
        error: 'Solution detail already exists for this solution' 
      });
    }

    // Create slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Handle hero image - now it comes as JSON string or object
    let heroImageData = { url: '', alt: '', publicId: '' };
    if (body.heroImage) {
      try {
        heroImageData = typeof body.heroImage === 'string' 
          ? JSON.parse(body.heroImage) 
          : body.heroImage;
        console.log('🖼️ Hero image data:', heroImageData);
      } catch (e) {
        console.error('Error parsing heroImage:', e);
      }
    }

    // Process partner logos (keeping this for future use)
    let partnersData = [];
    if (body.partners) {
      const partners = parseJSONField(body.partners, []);
      
      for (let i = 0; i < partners.length; i++) {
        const partner = partners[i];
        const logoFile = files && files.partnerLogos ? files.partnerLogos[i] : null;
        
        if (logoFile) {
          // For now, just use a placeholder since we're not implementing partner logos yet
          partnersData.push({
            ...partner,
            logo: {
              url: '',
              publicId: ''
            }
          });
        } else {
          partnersData.push(partner);
        }
      }
    }

    // Parse other JSON fields
    const overview = body.overview ? parseJSONField(body.overview, {}) : {};
    
    const keyFeaturesItems = body.keyFeatures?.items || [];
    const businessBenefitsItems = body.businessBenefits?.items || [];
    const whatWeDeliverItems = body.whatWeDeliver?.items || [];
    const applicationsItems = body.applications?.items || [];
    const whySpeedlightFeatures = body.whySpeedlight?.features || [];
    const relatedSolutions = body.relatedSolutions || [];
    const seo = body.seo ? parseJSONField(body.seo, {}) : {};

    // Create solution detail with proper structure
    const solutionDetail = new SolutionDetail({
      solutionId: body.solutionId,
      title: body.title,
      slug,
      heroImage: heroImageData,
      overview: {
        title: body.overview?.title || 'Overview',
        description: overview.description || ''
      },
      keyFeatures: {
        title: body.keyFeatures?.title || 'Key Features',
        items: keyFeaturesItems.map((item, index) => ({
          text: item.text || item,
          icon: item.icon || '',
          order: item.order || index
        }))
      },
      businessBenefits: {
        title: body.businessBenefits?.title || 'Business Benefits',
        items: businessBenefitsItems.map((item, index) => ({
          text: item.text || item,
          icon: item.icon || '',
          order: item.order || index
        }))
      },
      whatWeDeliver: {
        title: body.whatWeDeliver?.title || 'What We Deliver',
        items: whatWeDeliverItems.map((item, index) => ({
          text: item.text || item,
          order: item.order || index
        }))
      },
      applications: {
        title: body.applications?.title || 'Applications',
        items: applicationsItems.map((item, index) => ({
          name: item.name || item,
          icon: item.icon || '',
          order: item.order || index
        }))
      },
      technologyPartners: {
        title: body.technologyPartners?.title || 'Technology Partners',
        partners: partnersData
      },
      whySpeedlight: {
        title: body.whySpeedlight?.title || 'Why Speedlight Infosolutions',
        features: whySpeedlightFeatures.map((feature, index) => ({
          text: feature.text || feature,
          icon: feature.icon || '',
          order: feature.order || index
        }))
      },
      relatedSolutions,
      seo,
      status: body.status || 'draft',
      publishedAt: body.status === 'published' ? new Date() : null
    });

    console.log('💾 Saving solution detail...');
    await solutionDetail.save();
    
    // Populate references before sending response
    await solutionDetail.populate('solutionId', 'name slug');
    await solutionDetail.populate('relatedSolutions', 'name slug');
    
    console.log('✅ Solution detail saved successfully');
    res.status(201).json({
      success: true,
      data: solutionDetail
    });
  } catch (err) {
    console.error('❌ Error creating solution detail:', err);
    res.status(500).json({ 
      success: false,
      error: 'Server Error',
      message: err.message
    });
  }
});

// @route   PUT /api/solution-details/:id
// @desc    Update a solution detail
// @access  Private/Admin
router.put('/:id', adminAuth, upload.fields([
  { name: 'partnerLogos', maxCount: 10 }
]), async (req, res) => {
  try {
    const { body, files } = req;
    let solutionDetail = await SolutionDetail.findById(req.params.id);
    
    if (!solutionDetail) {
      return res.status(404).json({ 
        success: false,
        error: 'Solution detail not found' 
      });
    }

    console.log('📥 Update body:', body);

    // Update basic fields
    if (body.title) {
      solutionDetail.title = body.title;
      solutionDetail.slug = body.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    // Handle hero image update
    if (body.heroImage) {
      try {
        solutionDetail.heroImage = typeof body.heroImage === 'string' 
          ? JSON.parse(body.heroImage) 
          : body.heroImage;
      } catch (e) {
        console.error('Error parsing heroImage:', e);
      }
    }

    // Update overview
    if (body.overview) {
      const overviewData = typeof body.overview === 'string' 
        ? JSON.parse(body.overview) 
        : body.overview;
      solutionDetail.overview = {
        title: body.overview?.title || solutionDetail.overview?.title || 'Overview',
        description: overviewData.description || solutionDetail.overview?.description || ''
      };
    }

    // Update key features
    if (body.keyFeatures) {
      const keyFeaturesData = typeof body.keyFeatures === 'string'
        ? JSON.parse(body.keyFeatures)
        : body.keyFeatures;
      
      solutionDetail.keyFeatures = {
        title: keyFeaturesData.title || solutionDetail.keyFeatures?.title || 'Key Features',
        items: (keyFeaturesData.items || []).map((item, index) => ({
          text: item.text || item,
          icon: item.icon || '',
          order: item.order || index
        }))
      };
    }

    // Update business benefits
    if (body.businessBenefits) {
      const benefitsData = typeof body.businessBenefits === 'string'
        ? JSON.parse(body.businessBenefits)
        : body.businessBenefits;
      
      solutionDetail.businessBenefits = {
        title: benefitsData.title || solutionDetail.businessBenefits?.title || 'Business Benefits',
        items: (benefitsData.items || []).map((item, index) => ({
          text: item.text || item,
          icon: item.icon || '',
          order: item.order || index
        }))
      };
    }

    // Update what we deliver
    if (body.whatWeDeliver) {
      const deliverData = typeof body.whatWeDeliver === 'string'
        ? JSON.parse(body.whatWeDeliver)
        : body.whatWeDeliver;
      
      solutionDetail.whatWeDeliver = {
        title: deliverData.title || solutionDetail.whatWeDeliver?.title || 'What We Deliver',
        items: (deliverData.items || []).map((item, index) => ({
          text: item.text || item,
          order: item.order || index
        }))
      };
    }

    // Update applications
    if (body.applications) {
      const appData = typeof body.applications === 'string'
        ? JSON.parse(body.applications)
        : body.applications;
      
      solutionDetail.applications = {
        title: appData.title || solutionDetail.applications?.title || 'Applications',
        items: (appData.items || []).map((item, index) => ({
          name: item.name || item,
          icon: item.icon || '',
          order: item.order || index
        }))
      };
    }

    // Update technology partners (simplified for now)
    if (body.technologyPartners) {
      const partnersData = typeof body.technologyPartners === 'string'
        ? JSON.parse(body.technologyPartners)
        : body.technologyPartners;
      
      solutionDetail.technologyPartners = {
        title: partnersData.title || solutionDetail.technologyPartners?.title || 'Technology Partners',
        partners: partnersData.partners || []
      };
    }

    // Update why speedlight
    if (body.whySpeedlight) {
      const whyData = typeof body.whySpeedlight === 'string'
        ? JSON.parse(body.whySpeedlight)
        : body.whySpeedlight;
      
      solutionDetail.whySpeedlight = {
        title: whyData.title || solutionDetail.whySpeedlight?.title || 'Why Speedlight Infosolutions',
        features: (whyData.features || []).map((feature, index) => ({
          text: feature.text || feature,
          icon: feature.icon || '',
          order: feature.order || index
        }))
      };
    }

    // Update other fields
    if (body.relatedSolutions) {
      solutionDetail.relatedSolutions = body.relatedSolutions;
    }
    
    if (body.seo) {
      solutionDetail.seo = typeof body.seo === 'string' ? JSON.parse(body.seo) : body.seo;
    }
    
    if (body.status) {
      solutionDetail.status = body.status;
      if (body.status === 'published' && !solutionDetail.publishedAt) {
        solutionDetail.publishedAt = new Date();
      }
    }

    console.log('💾 Updating solution detail...');
    await solutionDetail.save();
    
    // Populate references
    await solutionDetail.populate('solutionId', 'name slug');
    await solutionDetail.populate('relatedSolutions', 'name slug');
    
    console.log('✅ Solution detail updated successfully');
    res.json({
      success: true,
      data: solutionDetail
    });
  } catch (err) {
    console.error('❌ Error updating solution detail:', err);
    res.status(500).json({ 
      success: false,
      error: 'Server Error',
      message: err.message
    });
  }
});

// @route   GET /api/solution-details
// @desc    Get all solution details with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      solutionId,
      search 
    } = req.query;

    const query = {};

    // Filter by status (only show published to public)
    if (status) {
      query.status = status;
    } else {
      // If no status specified, only show published
      query.status = 'published';
    }

    // Filter by solution
    if (solutionId) {
      query.solutionId = solutionId;
    }

    // Search in title and overview
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const solutionDetails = await SolutionDetail.find(query)
      .populate('solutionId', 'name slug')
      .populate('relatedSolutions', 'name slug')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await SolutionDetail.countDocuments(query);

    res.json({
      success: true,
      data: solutionDetails,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit),
        hasNextPage: parseInt(page) < Math.ceil(total / parseInt(limit)),
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (err) {
    console.error('Error fetching solution details:', err.message);
    res.status(500).json({ 
      success: false,
      error: 'Server Error',
      message: err.message 
    });
  }
});

// @route   GET /api/solution-details/:slug
// @desc    Get solution detail by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const solutionDetail = await SolutionDetail.findOne({ 
      slug: req.params.slug,
      status: 'published'
    })
    .populate('solutionId', 'name slug description icon')
    .populate('relatedSolutions', 'name slug');

    if (!solutionDetail) {
      return res.status(404).json({ 
        success: false,
        error: 'Solution detail not found' 
      });
    }

    // Increment view count
    solutionDetail.views += 1;
    await solutionDetail.save();

    res.json({
      success: true,
      data: solutionDetail
    });
  } catch (err) {
    console.error('Error fetching solution detail:', err.message);
    res.status(500).json({ 
      success: false,
      error: 'Server Error',
      message: err.message 
    });
  }
});

// ===== PUBLIC ENDPOINT BY SOLUTION ID =====
// @route   GET /api/solution-details/solution/:solutionId
// @desc    Get solution detail by solution ID (public, no auth required)
// @access  Public
router.get('/solution/:solutionId', async (req, res) => {
  try {
    console.log('🔍 Fetching solution details for solution ID:', req.params.solutionId);
    
    const solutionDetail = await SolutionDetail.findOne({ 
      solutionId: req.params.solutionId,
      status: 'published'
    })
    .populate('solutionId', 'name slug description icon')
    .populate('relatedSolutions', 'name slug');

    if (!solutionDetail) {
      console.log('❌ Solution detail not found');
      return res.status(404).json({ 
        success: false,
        error: 'Solution detail not found' 
      });
    }

    console.log('✅ Solution detail found');
    res.json({
      success: true,
      data: solutionDetail
    });
  } catch (err) {
    console.error('❌ Error fetching solution detail by solution ID:', err.message);
    res.status(500).json({ 
      success: false,
      error: 'Server Error',
      message: err.message 
    });
  }
});
// ===== END PUBLIC ENDPOINT =====

// @route   GET /api/solution-details/admin/all
// @desc    Get all solution details for admin (including drafts)
// @access  Private/Admin
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const solutionDetails = await SolutionDetail.find(query)
      .populate('solutionId', 'name slug')
      .populate('relatedSolutions', 'name slug')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await SolutionDetail.countDocuments(query);

    res.json({
      success: true,
      data: solutionDetails,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (err) {
    console.error('Error fetching admin solution details:', err.message);
    res.status(500).json({ 
      success: false,
      error: 'Server Error',
      message: err.message 
    });
  }
});

// @route   DELETE /api/solution-details/:id
// @desc    Delete a solution detail
// @access  Private/Admin
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const solutionDetail = await SolutionDetail.findById(req.params.id);
    
    if (!solutionDetail) {
      return res.status(404).json({ 
        success: false,
        error: 'Solution detail not found' 
      });
    }

    await solutionDetail.deleteOne();
    
    res.json({ 
      success: true,
      message: 'Solution detail deleted successfully' 
    });
  } catch (err) {
    console.error('Error deleting solution detail:', err.message);
    res.status(500).json({ 
      success: false,
      error: 'Server Error',
      message: err.message 
    });
  }
});

// @route   PATCH /api/solution-details/:id/status
// @desc    Update solution detail status
// @access  Private/Admin
router.patch('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['draft', 'published', 'archived'].includes(status)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid status' 
      });
    }

    const solutionDetail = await SolutionDetail.findById(req.params.id);
    
    if (!solutionDetail) {
      return res.status(404).json({ 
        success: false,
        error: 'Solution detail not found' 
      });
    }

    solutionDetail.status = status;
    if (status === 'published' && !solutionDetail.publishedAt) {
      solutionDetail.publishedAt = new Date();
    }
    
    await solutionDetail.save();
    
    res.json({
      success: true,
      data: solutionDetail,
      message: `Solution detail status updated to ${status}`
    });
  } catch (err) {
    console.error('Error updating solution detail status:', err.message);
    res.status(500).json({ 
      success: false,
      error: 'Server Error',
      message: err.message 
    });
  }
});

// @route   POST /api/solution-details/:id/clone
// @desc    Clone a solution detail
// @access  Private/Admin
router.post('/:id/clone', adminAuth, async (req, res) => {
  try {
    const sourceDetail = await SolutionDetail.findById(req.params.id);
    
    if (!sourceDetail) {
      return res.status(404).json({ 
        success: false,
        error: 'Solution detail not found' 
      });
    }

    // Create a new document with the same data
    const cloneData = sourceDetail.toObject();
    delete cloneData._id;
    delete cloneData.slug;
    delete cloneData.createdAt;
    delete cloneData.updatedAt;
    delete cloneData.publishedAt;
    delete cloneData.views;
    
    cloneData.title = `${cloneData.title} (Copy)`;
    cloneData.status = 'draft';
    
    // Create slug from new title
    cloneData.slug = cloneData.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    const clonedDetail = new SolutionDetail(cloneData);
    await clonedDetail.save();
    
    res.status(201).json({
      success: true,
      data: clonedDetail,
      message: 'Solution detail cloned successfully'
    });
  } catch (err) {
    console.error('Error cloning solution detail:', err.message);
    res.status(500).json({ 
      success: false,
      error: 'Server Error',
      message: err.message 
    });
  }
});

export default router;