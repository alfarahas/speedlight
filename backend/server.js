import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import solutionRoutes from './routes/solutions.js';
import industryRoutes from './routes/industries.js';
import { authenticateToken } from './middleware/auth.js';
import solutionDetailsRoutes from './routes/solutionDetails.js';
import industryDetailsRoutes from './routes/industryDetails.js';

// Import models directly
import User from './models/User.js';
import Solution from './models/Solution.js';
import Industry from './models/Industry.js';
import SolutionDetail from './models/SolutionDetail.js';
import IndustryDetail from './models/IndustryDetail.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/speedlight')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    
    // Log available models for debugging
    console.log('📦 Available models:', Object.keys(mongoose.models));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/solutions', authenticateToken, solutionRoutes);
app.use('/api/industries', authenticateToken, industryRoutes);
app.use('/api/solution-details', authenticateToken, solutionDetailsRoutes);
app.use('/api/industry-details', authenticateToken, industryDetailsRoutes);

// PUBLIC ROUTES (no auth required)

// Get all active solutions
app.get('/api/public/solutions', async (req, res) => {
  try {
    const solutions = await Solution.find({ isActive: true }).sort({ order: 1 });
    res.json(solutions);
  } catch (error) {
    console.error('Error in public solutions:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all active industries
app.get('/api/public/industries', async (req, res) => {
  try {
    const industries = await Industry.find({ isActive: true }).sort({ order: 1 });
    res.json(industries);
  } catch (error) {
    console.error('Error in public industries:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get solution details by solution ID
app.get('/api/public/solution-details/:solutionId', async (req, res) => {
  try {
    const solutionDetail = await SolutionDetail.findOne({ 
      solutionId: req.params.solutionId,
      isActive: true 
    }).populate('relatedSolutions', 'title icon description');
    
    if (!solutionDetail) {
      return res.status(404).json({ error: 'Solution details not found' });
    }
    
    res.json(solutionDetail);
  } catch (error) {
    console.error('Error in public solution details:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get industry details by industry ID
app.get('/api/public/industry-details/:industryId', async (req, res) => {
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
    console.error('Error in public industry details:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Public API: http://localhost:${PORT}/api/public`);
  console.log(`🔒 Admin API: http://localhost:${PORT}/api (requires token)`);
});