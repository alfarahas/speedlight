import express from 'express';
import SolutionDetail from '../models/SolutionDetail.js';
import Solution from '../models/Solution.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get solution details by solution ID (public)
router.get('/public/:solutionId', async (req, res) => {
  try {
    const solutionDetail = await SolutionDetail.findOne({ 
      solutionId: req.params.solutionId,
      isActive: true 
    }).populate('relatedSolutions', 'title icon');
    
    if (!solutionDetail) {
      return res.status(404).json({ error: 'Solution details not found' });
    }
    
    res.json(solutionDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all solution details (admin)
router.get('/', isAdmin, async (req, res) => {
  try {
    const solutionDetails = await SolutionDetail.find()
      .populate('solutionId', 'title icon category')
      .sort({ createdAt: -1 });
    res.json(solutionDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single solution detail by ID (admin)
router.get('/:id', isAdmin, async (req, res) => {
  try {
    const solutionDetail = await SolutionDetail.findById(req.params.id)
      .populate('solutionId', 'title icon category')
      .populate('relatedSolutions', 'title icon');
      
    if (!solutionDetail) {
      return res.status(404).json({ error: 'Solution details not found' });
    }
    res.json(solutionDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create solution details (admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    // Check if details already exist for this solution
    const existing = await SolutionDetail.findOne({ solutionId: req.body.solutionId });
    if (existing) {
      return res.status(400).json({ error: 'Solution details already exist for this solution' });
    }

    const solutionDetail = new SolutionDetail(req.body);
    await solutionDetail.save();
    
    const populatedDetail = await SolutionDetail.findById(solutionDetail._id)
      .populate('solutionId', 'title icon category');
      
    res.status(201).json(populatedDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update solution details (admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const solutionDetail = await SolutionDetail.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('solutionId', 'title icon category');
    
    if (!solutionDetail) {
      return res.status(404).json({ error: 'Solution details not found' });
    }
    res.json(solutionDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete solution details (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const solutionDetail = await SolutionDetail.findByIdAndDelete(req.params.id);
    if (!solutionDetail) {
      return res.status(404).json({ error: 'Solution details not found' });
    }
    res.json({ message: 'Solution details deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;