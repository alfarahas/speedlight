import mongoose from 'mongoose';

const solutionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '🔹'
  },
  category: {
    type: String,
    enum: ['collaboration', 'audio', 'display', 'networking', 'control', 'support'],
    default: 'collaboration'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Solution = mongoose.model('Solution', solutionSchema);
export default Solution;