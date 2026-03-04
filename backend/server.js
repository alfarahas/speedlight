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
    console.log('📦 Available models:', Object.keys(mongoose.models));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ========== PUBLIC ROUTES (NO AUTH REQUIRED) ==========

// Public solutions and industries (from your route files)
app.use('/api/public', solutionRoutes);        // This will handle /api/public/solutions
app.use('/api/public', industryRoutes);        // This will handle /api/public/industries

// Public solution details (from solutionDetails.js)
app.use('/api/public', solutionDetailsRoutes); // This will handle /api/public/solution-details/:solutionId

// Public industry details (from industryDetails.js)
app.use('/api/public', industryDetailsRoutes); // This will handle /api/public/industry-details/:industryId

// ========== AUTH ROUTES ==========
app.use('/api/auth', authRoutes);

// ========== PROTECTED ROUTES (REQUIRE AUTHENTICATION) ==========
app.use('/api/solutions', authenticateToken, solutionRoutes);
app.use('/api/industries', authenticateToken, industryRoutes);
app.use('/api/solution-details', authenticateToken, solutionDetailsRoutes);
app.use('/api/industry-details', authenticateToken, industryDetailsRoutes);

// ========== ERROR HANDLING ==========
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
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