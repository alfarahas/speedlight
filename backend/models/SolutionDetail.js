import mongoose from 'mongoose';

const solutionDetailSchema = new mongoose.Schema({
  solutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Solution',
    required: true,
    unique: true
  },
  overview: {
    type: String,
    required: true
  },
  keyFeatures: [{
    type: String
  }],
  technologies: [{
    name: String,
    icon: String
  }],
  benefits: [{
    title: String,
    description: String,
    icon: String
  }],
  useCases: [{
    title: String,
    description: String,
    image: String
  }],
  relatedSolutions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Solution'
  }],
  gallery: [{
    imageUrl: String,
    caption: String
  }],
  specifications: [{
    name: String,
    value: String
  }],
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

const SolutionDetail = mongoose.model('SolutionDetail', solutionDetailSchema);
export default SolutionDetail;