import express from 'express';
import Solution from '../models/Solution.js';  // Make sure this import is present
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all solutions
router.get('/', async (req, res) => {
  try {
    const solutions = await Solution.find().sort({ order: 1 });
    res.json(solutions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single solution
router.get('/:id', async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);
    if (!solution) {
      return res.status(404).json({ error: 'Solution not found' });
    }
    res.json(solution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create solution (admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    const solution = new Solution(req.body);
    await solution.save();
    res.status(201).json(solution);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update solution (admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const solution = await Solution.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!solution) {
      return res.status(404).json({ error: 'Solution not found' });
    }
    res.json(solution);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete solution (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const solution = await Solution.findByIdAndDelete(req.params.id);
    if (!solution) {
      return res.status(404).json({ error: 'Solution not found' });
    }
    res.json({ message: 'Solution deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;