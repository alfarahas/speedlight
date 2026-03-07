// middleware/auth.js
import jwt from 'jsonwebtoken';

// Authenticate token middleware
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Check if user is admin middleware
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Combined admin authentication middleware
export const adminAuth = [authenticateToken, isAdmin];

// Optional: Combined middleware as a single function
export const adminMiddleware = (req, res, next) => {
  authenticateToken(req, res, (err) => {
    if (err) return;
    isAdmin(req, res, next);
  });
};

// Export all as default object
export default {
  authenticateToken,
  isAdmin,
  adminAuth,
  adminMiddleware
};