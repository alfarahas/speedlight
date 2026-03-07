// models/SolutionDetail.js
import mongoose from 'mongoose';

const solutionDetailSchema = new mongoose.Schema({
  // Basic Information
  solutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Solution',
    required: true
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

  // Hero Section with First Ad Image
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
    description: String
  },

  // Key Features Section (NEW)
  keyFeatures: {
    title: {
      type: String,
      default: "Key Features"
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

  // Business Benefits Section (NEW)
  businessBenefits: {
    title: {
      type: String,
      default: "Business Benefits"
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

  // What We Deliver Section
  whatWeDeliver: {
    title: {
      type: String,
      default: "What We Deliver"
    },
    items: [{
      text: String,
      order: {
        type: Number,
        default: 0
      }
    }]
  },

  // Applications Section
  applications: {
    title: {
      type: String,
      default: "Applications"
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

  // Technology Partners Section
  technologyPartners: {
    title: {
      type: String,
      default: "Technology Partners"
    },
    partners: [{
      name: String,
      logo: {
        url: String,
        publicId: String
      },
      description: String,
      website: String,
      order: {
        type: Number,
        default: 0
      }
    }]
  },

  // Why Speedlight Infosolutions Section
  whySpeedlight: {
    title: {
      type: String,
      default: "Why Speedlight Infosolutions"
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

  // Related Solutions
  relatedSolutions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Solution'
  }],

  // SEO Fields
  seo: {
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
    canonicalUrl: String,
    ogImage: String
  },

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
solutionDetailSchema.index({ solutionId: 1, slug: 1 });
solutionDetailSchema.index({ status: 1, publishedAt: -1 });
solutionDetailSchema.index({ title: 'text', 'overview.description': 'text' });

// Pre-save middleware to generate slug if not provided
solutionDetailSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

const SolutionDetail = mongoose.model('SolutionDetail', solutionDetailSchema);
export default SolutionDetail;