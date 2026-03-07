// routes/industryDetails.js
import express from 'express';
import multer from 'multer';
import IndustryDetail from '../models/IndustryDetail.js';
import { authenticateToken, isAdmin, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for memory storage (for future file uploads)
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

// ========== PUBLIC ROUTES ==========

// Get industry details by industry ID (public)
router.get('/public/:industryId', async (req, res) => {
  try {
    console.log(`📡 Fetching industry details for ID: ${req.params.industryId}`);
    
    const industryDetail = await IndustryDetail.findOne({ 
      industryId: req.params.industryId,
      status: 'published' 
    }).populate('featuredSolutions', 'title icon description');
    
    if (!industryDetail) {
      console.log('❌ Industry details not found');
      return res.status(404).json({ error: 'Industry details not found' });
    }
    
    console.log('✅ Industry details found');
    res.json(industryDetail);
  } catch (error) {
    console.error('❌ Error fetching industry details:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get industry details by slug (public)
router.get('/public/slug/:slug', async (req, res) => {
  try {
    console.log(`📡 Fetching industry details for slug: ${req.params.slug}`);
    
    const industryDetail = await IndustryDetail.findOne({ 
      slug: req.params.slug,
      status: 'published' 
    }).populate('featuredSolutions', 'title icon description');
    
    if (!industryDetail) {
      console.log('❌ Industry details not found');
      return res.status(404).json({ error: 'Industry details not found' });
    }
    
    // Increment view count
    industryDetail.views += 1;
    await industryDetail.save();
    
    console.log('✅ Industry details found');
    res.json(industryDetail);
  } catch (error) {
    console.error('❌ Error fetching industry details:', error);
    res.status(500).json({ error: error.message });
  }
});

// ========== ADMIN ROUTES ==========

// Get all industry details (admin)
router.get('/admin/all', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    const query = {};
    if (status) query.status = status;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const industryDetails = await IndustryDetail.find(query)
      .populate('industryId', 'name icon')
      .populate('featuredSolutions', 'title icon')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await IndustryDetail.countDocuments(query);

    res.json({
      success: true,
      data: industryDetails,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching industry details:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single industry detail by ID (admin)
router.get('/admin/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const industryDetail = await IndustryDetail.findById(req.params.id)
      .populate('industryId', 'name icon')
      .populate('featuredSolutions', 'title icon');
      
    if (!industryDetail) {
      return res.status(404).json({ error: 'Industry details not found' });
    }
    res.json({
      success: true,
      data: industryDetail
    });
  } catch (error) {
    console.error('Error fetching industry detail:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create industry details (admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { body } = req;
    
    console.log('📥 Creating industry details:', body);

    // Check if details already exist for this industry
    const existing = await IndustryDetail.findOne({ industryId: body.industryId });
    if (existing) {
      return res.status(400).json({ error: 'Industry details already exist for this industry' });
    }

    // Create slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Handle hero image
    let heroImageData = { url: '', alt: '', publicId: '' };
    if (body.heroImage) {
      heroImageData = typeof body.heroImage === 'string' 
        ? JSON.parse(body.heroImage) 
        : body.heroImage;
    }

    // Prepare the data
    const industryDetailData = {
      industryId: body.industryId,
      title: body.title,
      slug,
      heroImage: heroImageData,
      overview: {
        title: body.overview?.title || 'Overview',
        description: body.overview?.description || ''
      },
      coreServices: {
        title: body.coreServices?.title || 'Core Services',
        items: (body.coreServices?.items || []).map((item, index) => ({
          text: item.text || item,
          icon: item.icon || '',
          order: item.order || index
        }))
      },
      deliveryApproach: {
        title: body.deliveryApproach?.title || 'Our Delivery Approach',
        items: (body.deliveryApproach?.items || []).map((item, index) => ({
          text: item.text || item,
          icon: item.icon || '',
          order: item.order || index
        }))
      },
      deploymentLocations: {
        title: body.deploymentLocations?.title || 'Typical Deployment Locations',
        items: (body.deploymentLocations?.items || []).map((item, index) => ({
          name: item.name || item,
          icon: item.icon || '',
          order: item.order || index
        }))
      },
      whyChooseUs: {
        title: body.whyChooseUs?.title || 'Why Clients Choose Speedlight',
        features: (body.whyChooseUs?.features || []).map((feature, index) => ({
          text: feature.text || feature,
          icon: feature.icon || '',
          order: feature.order || index
        }))
      },
      challenges: (body.challenges || []).map((item, index) => ({
        ...item,
        order: item.order || index
      })),
      solutions: (body.solutions || []).map((item, index) => ({
        ...item,
        order: item.order || index
      })),
      technologies: (body.technologies || []).map((item, index) => ({
        ...item,
        order: item.order || index
      })),
      caseStudies: (body.caseStudies || []).map((item, index) => ({
        ...item,
        order: item.order || index
      })),
      benefits: (body.benefits || []).map((item, index) => ({
        ...item,
        order: item.order || index
      })),
      featuredSolutions: body.featuredSolutions || [],
      stats: body.stats || {},
      gallery: (body.gallery || []).map((item, index) => ({
        ...item,
        order: item.order || index
      })),
      status: body.status || 'draft',
      publishedAt: body.status === 'published' ? new Date() : null
    };

    const industryDetail = new IndustryDetail(industryDetailData);
    await industryDetail.save();
    
    const populatedDetail = await IndustryDetail.findById(industryDetail._id)
      .populate('industryId', 'name icon')
      .populate('featuredSolutions', 'title icon');
      
    res.status(201).json({
      success: true,
      data: populatedDetail
    });
  } catch (error) {
    console.error('Error creating industry details:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update industry details (admin only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { body } = req;
    
    console.log('📥 Updating industry details:', body);

    let industryDetail = await IndustryDetail.findById(req.params.id);
    
    if (!industryDetail) {
      return res.status(404).json({ error: 'Industry details not found' });
    }

    // Update slug if title changed
    if (body.title && body.title !== industryDetail.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    // Handle hero image
    if (body.heroImage) {
      body.heroImage = typeof body.heroImage === 'string' 
        ? JSON.parse(body.heroImage) 
        : body.heroImage;
    }

    // Update all fields
    const updateData = {
      ...body,
      updatedAt: Date.now()
    };

    // Handle nested sections with proper mapping
    if (body.coreServices) {
      updateData.coreServices = {
        title: body.coreServices.title || 'Core Services',
        items: (body.coreServices.items || []).map((item, index) => ({
          text: item.text || item,
          icon: item.icon || '',
          order: item.order || index
        }))
      };
    }

    if (body.deliveryApproach) {
      updateData.deliveryApproach = {
        title: body.deliveryApproach.title || 'Our Delivery Approach',
        items: (body.deliveryApproach.items || []).map((item, index) => ({
          text: item.text || item,
          icon: item.icon || '',
          order: item.order || index
        }))
      };
    }

    if (body.deploymentLocations) {
      updateData.deploymentLocations = {
        title: body.deploymentLocations.title || 'Typical Deployment Locations',
        items: (body.deploymentLocations.items || []).map((item, index) => ({
          name: item.name || item,
          icon: item.icon || '',
          order: item.order || index
        }))
      };
    }

    if (body.whyChooseUs) {
      updateData.whyChooseUs = {
        title: body.whyChooseUs.title || 'Why Clients Choose Speedlight',
        features: (body.whyChooseUs.features || []).map((feature, index) => ({
          text: feature.text || feature,
          icon: feature.icon || '',
          order: feature.order || index
        }))
      };
    }

    const updatedDetail = await IndustryDetail.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('industryId', 'name icon')
     .populate('featuredSolutions', 'title icon');
    
    res.json({
      success: true,
      data: updatedDetail
    });
  } catch (error) {
    console.error('Error updating industry details:', error);
    res.status(400).json({ error: error.message });
  }
});

// Delete industry details (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const industryDetail = await IndustryDetail.findByIdAndDelete(req.params.id);
    if (!industryDetail) {
      return res.status(404).json({ error: 'Industry details not found' });
    }
    res.json({ 
      success: true,
      message: 'Industry details deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting industry details:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update status (admin only)
router.patch('/:id/status', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['draft', 'published', 'archived'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const industryDetail = await IndustryDetail.findById(req.params.id);
    
    if (!industryDetail) {
      return res.status(404).json({ error: 'Industry details not found' });
    }

    industryDetail.status = status;
    if (status === 'published' && !industryDetail.publishedAt) {
      industryDetail.publishedAt = new Date();
    }
    
    await industryDetail.save();
    
    res.json({
      success: true,
      data: industryDetail,
      message: `Status updated to ${status}`
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;