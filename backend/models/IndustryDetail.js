import mongoose from 'mongoose';

const industryDetailSchema = new mongoose.Schema({
  industryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Industry',
    required: true,
    unique: true
  },
  overview: {
    type: String,
    required: true
  },
  challenges: [{
    title: String,
    description: String,
    icon: String
  }],
  solutions: [{
    title: String,
    description: String,
    icon: String,
    solutions: [String] // List of specific solutions for this industry
  }],
  technologies: [{
    name: String,
    icon: String
  }],
  caseStudies: [{
    title: String,
    description: String,
    image: String,
    link: String
  }],
  benefits: [{
    title: String,
    description: String,
    icon: String
  }],
  featuredSolutions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Solution'
  }],
  stats: {
    projects: Number,
    clients: Number,
    experience: String
  },
  gallery: [{
    imageUrl: String,
    caption: String
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

const IndustryDetail = mongoose.model('IndustryDetail', industryDetailSchema);
export default IndustryDetail;