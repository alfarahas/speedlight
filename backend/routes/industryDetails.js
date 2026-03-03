import express from 'express';
import IndustryDetail from '../models/IndustryDetail.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get industry details by industry ID (public)
router.get('/public/:industryId', async (req, res) => {
  try {
    const industryDetail = await IndustryDetail.findOne({ 
      industryId: req.params.industryId,
      isActive: true 
    }).populate('featuredSolutions', 'title icon description');
    
    if (!industryDetail) {
      return res.status(404).json({ error: 'Industry details not found' });
    }
    
    res.json(industryDetail);
  } catch (error) {
    console.error('Error fetching industry details:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all industry details (admin)
router.get('/', isAdmin, async (req, res) => {
  try {
    const industryDetails = await IndustryDetail.find()
      .populate('industryId', 'name icon')
      .sort({ createdAt: -1 });
    res.json(industryDetails);
  } catch (error) {
    console.error('Error fetching industry details:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single industry detail by ID (admin)
router.get('/:id', isAdmin, async (req, res) => {
  try {
    const industryDetail = await IndustryDetail.findById(req.params.id)
      .populate('industryId', 'name icon')
      .populate('featuredSolutions', 'title icon');
      
    if (!industryDetail) {
      return res.status(404).json({ error: 'Industry details not found' });
    }
    res.json(industryDetail);
  } catch (error) {
    console.error('Error fetching industry detail:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create industry details (admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    // Check if details already exist for this industry
    const existing = await IndustryDetail.findOne({ industryId: req.body.industryId });
    if (existing) {
      return res.status(400).json({ error: 'Industry details already exist for this industry' });
    }

    const industryDetail = new IndustryDetail(req.body);
    await industryDetail.save();
    
    const populatedDetail = await IndustryDetail.findById(industryDetail._id)
      .populate('industryId', 'name icon');
      
    res.status(201).json(populatedDetail);
  } catch (error) {
    console.error('Error creating industry details:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update industry details (admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const industryDetail = await IndustryDetail.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('industryId', 'name icon');
    
    if (!industryDetail) {
      return res.status(404).json({ error: 'Industry details not found' });
    }
    res.json(industryDetail);
  } catch (error) {
    console.error('Error updating industry details:', error);
    res.status(400).json({ error: error.message });
  }
});

// Delete industry details (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const industryDetail = await IndustryDetail.findByIdAndDelete(req.params.id);
    if (!industryDetail) {
      return res.status(404).json({ error: 'Industry details not found' });
    }
    res.json({ message: 'Industry details deleted successfully' });
  } catch (error) {
    console.error('Error deleting industry details:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;