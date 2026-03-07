import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import solutionRoutes from './routes/solutions.js';
import industryRoutes from './routes/industries.js';
import { authenticateToken } from './middleware/auth.js';
import solutionDetailsRoutes from './routes/solutionDetails.js';
import industryDetailsRoutes from './routes/industryDetails.js';
import uploadRoutes from './routes/upload.js';

// Import models directly
import User from './models/User.js';
import Solution from './models/Solution.js';
import Industry from './models/Industry.js';
import SolutionDetail from './models/SolutionDetail.js';
import IndustryDetail from './models/IndustryDetail.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/speedlight')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    console.log('📦 Available models:', Object.keys(mongoose.models));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ========== PUBLIC ROUTES (NO AUTH REQUIRED) - PUT THESE FIRST ==========

// Debug route to see all registered routes (optional - remove in production)
app.get('/api/public/debug-routes', (req, res) => {
  const routes = [];
  const extractRoutes = (stack, basePath = '') => {
    stack.forEach(layer => {
      if (layer.route) {
        routes.push({
          path: basePath + layer.route.path,
          methods: Object.keys(layer.route.methods)
        });
      } else if (layer.name === 'router' && layer.handle.stack) {
        extractRoutes(layer.handle.stack, basePath);
      }
    });
  };
  extractRoutes(app._router.stack);
  res.json({ routes: routes.sort((a, b) => a.path.localeCompare(b.path)) });
});

// Get all active solutions
app.get('/api/public/solutions', async (req, res) => {
  try {
    console.log('📡 Fetching public solutions...');
    const solutions = await Solution.find({ isActive: true }).sort({ order: 1 });
    console.log(`✅ Found ${solutions.length} solutions`);
    res.json(solutions);
  } catch (error) {
    console.error('❌ Error in public solutions:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all active industries
app.get('/api/public/industries', async (req, res) => {
  try {
    console.log('📡 Fetching public industries...');
    const industries = await Industry.find({ isActive: true }).sort({ order: 1 });
    console.log(`✅ Found ${industries.length} industries`);
    res.json(industries);
  } catch (error) {
    console.error('❌ Error in public industries:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get solution details by solution ID
app.get('/api/public/solution-details/solution/:solutionId', async (req, res) => {
  try {
    console.log(`📡 Fetching solution details for ID: ${req.params.solutionId}`);
    
    // TEMPORARY: Find ANY detail for this solution (ignore status for now)
    const solutionDetail = await SolutionDetail.findOne({ 
      solutionId: req.params.solutionId
      // Don't filter by status temporarily
    }).populate('relatedSolutions', 'title icon description');
    
    if (!solutionDetail) {
      console.log('❌ Solution details not found');
      return res.status(404).json({ error: 'Solution details not found' });
    }
    
    console.log('✅ Solution details found with status:', solutionDetail.status);
    res.json(solutionDetail);
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get industry details by industry ID
app.get('/api/public/industry-details/industry/:industryId', async (req, res) => {
  try {
    console.log(`📡 Fetching industry details for ID: ${req.params.industryId}`);
    const industryDetail = await IndustryDetail.findOne({ 
      industryId: req.params.industryId,
    }).populate('featuredSolutions', 'title icon description');
    
    if (!industryDetail) {
      console.log('❌ Industry details not found');
      return res.status(404).json({ error: 'Industry details not found' });
    }
    
    console.log('✅ Industry details found');
    res.json(industryDetail);
  } catch (error) {
    console.error('❌ Error in public industry details:', error);
    res.status(500).json({ error: error.message });
  }
});

// ========== AUTH ROUTES ==========
app.use('/api/auth', authRoutes);

// ========== PROTECTED ROUTES (REQUIRE AUTHENTICATION) ==========
app.use('/api/solutions', authenticateToken, solutionRoutes);
app.use('/api/industries', authenticateToken, industryRoutes);
app.use('/api/solution-details', authenticateToken, solutionDetailsRoutes);
app.use('/api/industry-details', authenticateToken, industryDetailsRoutes);
app.use('/api/upload', uploadRoutes);

// ========== ERROR HANDLING ==========
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler - THIS MUST BE LAST
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Public API: http://localhost:${PORT}/api/public`);
  console.log(`🔒 Admin API: http://localhost:${PORT}/api (requires token)`);
});