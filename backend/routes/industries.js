import express from 'express';
import Industry from '../models/Industry.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all industries
router.get('/', async (req, res) => {
  try {
    const industries = await Industry.find().sort({ order: 1 });
    res.json(industries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single industry
router.get('/:id', async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);
    if (!industry) {
      return res.status(404).json({ error: 'Industry not found' });
    }
    res.json(industry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create industry (admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    const industry = new Industry(req.body);
    await industry.save();
    res.status(201).json(industry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update industry (admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const industry = await Industry.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!industry) {
      return res.status(404).json({ error: 'Industry not found' });
    }
    res.json(industry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete industry (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const industry = await Industry.findByIdAndDelete(req.params.id);
    if (!industry) {
      return res.status(404).json({ error: 'Industry not found' });
    }
    res.json({ message: 'Industry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;