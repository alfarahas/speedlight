// models/IndustryDetail.js
import mongoose from 'mongoose';

const industryDetailSchema = new mongoose.Schema({
  // Basic Information
  industryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Industry',
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },

  // Hero Section with Image
  heroImage: {
    url: String,
    alt: String,
    publicId: String
  },

  // Overview Section
  overview: {
    title: {
      type: String,
      default: "Overview"
    },
    description: {
      type: String,
      required: true
    }
  },

  // Core Services Section (NEW)
  coreServices: {
    title: {
      type: String,
      default: "Core Services"
    },
    items: [{
      text: String,
      icon: String,
      order: {
        type: Number,
        default: 0
      }
    }]
  },

  // Our Delivery Approach Section (NEW)
  deliveryApproach: {
    title: {
      type: String,
      default: "Our Delivery Approach"
    },
    items: [{
      text: String,
      icon: String,
      order: {
        type: Number,
        default: 0
      }
    }]
  },

  // Typical Deployment Locations Section (NEW)
  deploymentLocations: {
    title: {
      type: String,
      default: "Typical Deployment Locations"
    },
    items: [{
      name: String,
      icon: String,
      order: {
        type: Number,
        default: 0
      }
    }]
  },

  // Why Clients Choose Speedlight Section (NEW)
  whyChooseUs: {
    title: {
      type: String,
      default: "Why Clients Choose Speedlight"
    },
    features: [{
      text: String,
      icon: String,
      order: {
        type: Number,
        default: 0
      }
    }]
  },

  // Challenges Section (existing)
  challenges: [{
    title: String,
    description: String,
    icon: String,
    order: {
      type: Number,
      default: 0
    }
  }],

  // Solutions Section (existing)
  solutions: [{
    title: String,
    description: String,
    icon: String,
    solutions: [String],
    order: {
      type: Number,
      default: 0
    }
  }],

  // Technologies Section (existing)
  technologies: [{
    name: String,
    icon: String,
    order: {
      type: Number,
      default: 0
    }
  }],

  // Case Studies Section (existing)
  caseStudies: [{
    title: String,
    description: String,
    image: String,
    link: String,
    order: {
      type: Number,
      default: 0
    }
  }],

  // Benefits Section (existing)
  benefits: [{
    title: String,
    description: String,
    icon: String,
    order: {
      type: Number,
      default: 0
    }
  }],

  // Featured Solutions (existing)
  featuredSolutions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Solution'
  }],

  // Stats Section (existing)
  stats: {
    projects: Number,
    clients: Number,
    experience: String
  },

  // Gallery Section (existing)
  gallery: [{
    imageUrl: String,
    caption: String,
    order: {
      type: Number,
      default: 0
    }
  }],

  // Status and Metadata
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: Date,
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
industryDetailSchema.index({ industryId: 1, slug: 1 });
industryDetailSchema.index({ status: 1, publishedAt: -1 });
industryDetailSchema.index({ title: 'text', 'overview.description': 'text' });

// Pre-save middleware to generate slug if not provided
industryDetailSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

const IndustryDetail = mongoose.model('IndustryDetail', industryDetailSchema);
export default IndustryDetail;