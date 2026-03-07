import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to ensure array response
const ensureArray = (data, mockData = []) => {
  if (Array.isArray(data)) {
    return data;
  }
  if (data === null || data === undefined) {
    console.warn('Received null/undefined data, using mock/empty array');
    return mockData;
  }
  if (typeof data === 'object') {
    // Check if it's an object with a data property that's an array
    if (data.data && Array.isArray(data.data)) {
      return data.data;
    }
    // Check if it's an object with items property that's an array
    if (data.items && Array.isArray(data.items)) {
      return data.items;
    }
    // If it's a single object, wrap in array
    console.warn('Received single object, wrapping in array:', data);
    return [data];
  }
  return mockData;
};

// Helper to extract data from response (handles your API response structure)
const extractData = (response) => {
  // If response has success flag and data property
  if (response.data && response.data.success === true && response.data.data) {
    return response.data.data;
  }
  // If response has data property directly
  if (response.data && response.data.data) {
    return response.data.data;
  }
  // Otherwise return the whole response data
  return response.data;
};

// PUBLIC ENDPOINTS (no auth required)
export const fetchSolutions = async () => {
  try {
    const response = await api.get('/api/public/solutions');
    return ensureArray(extractData(response), getMockSolutions());
  } catch (error) {
    console.error('Error fetching solutions:', error);
    return getMockSolutions();
  }
};

export const fetchIndustries = async () => {
  try {
    const response = await api.get('/api/public/industries');
    return ensureArray(extractData(response), getMockIndustries());
  } catch (error) {
    console.error('Error fetching industries:', error);
    return getMockIndustries();
  }
};

// ADMIN ENDPOINTS (require token)
export const fetchAdminSolutions = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found for admin solutions');
      return [];
    }
    const response = await api.get('/api/solutions', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return ensureArray(extractData(response), []);
  } catch (error) {
    console.error('Error fetching admin solutions:', error);
    return [];
  }
};

export const fetchAdminIndustries = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found for admin industries');
      return [];
    }
    const response = await api.get('/api/industries', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return ensureArray(extractData(response), []);
  } catch (error) {
    console.error('Error fetching admin industries:', error);
    return [];
  }
};

// Mock data for development when backend is not available
const getMockSolutions = () => {
  return [
    {
      _id: '1',
      title: "Workplace Collaboration & Video Conferencing",
      description: "Enterprise-grade meeting rooms, smart collaboration spaces, hybrid work environments, and large-scale townhall AV systems.",
      icon: "1️⃣",
      category: "collaboration",
      isActive: true
    },
    {
      _id: '2',
      title: "Integrated Professional Sound Systems",
      description: "Commercial audio, conferencing systems, PA solutions, background music, live sound, and acoustic optimization.",
      icon: "2️⃣",
      category: "audio",
      isActive: true
    },
    {
      _id: '3',
      title: "Display & Visualization Solutions",
      description: "Commercial displays, video walls, interactive panels, digital signage, and projection systems.",
      icon: "3️⃣",
      category: "display",
      isActive: true
    },
    {
      _id: '4',
      title: "Enterprise Networking & Connectivity",
      description: "Structured cabling, LAN/WAN infrastructure, wireless networks, AV over IP, and data center environments.",
      icon: "4️⃣",
      category: "networking",
      isActive: true
    },
    {
      _id: '5',
      title: "Intelligent Systems & Control Platforms",
      description: "Centralized AV control, room automation, multi-room management, and customized control programming.",
      icon: "5️⃣",
      category: "control",
      isActive: true
    },
    {
      _id: '6',
      title: "System Lifecycle & Support Solutions",
      description: "Upgrades, AMC programs, optimization, relocation services, and emergency support.",
      icon: "6️⃣",
      category: "support",
      isActive: true
    }
  ];
};

const getMockIndustries = () => {
  return [
    { _id: '1', name: "Corporate & Enterprise Offices", icon: "🏢", isActive: true, order: 1 },
    { _id: '2', name: "Education & Digital Classrooms", icon: "📚", isActive: true, order: 2 },
    { _id: '3', name: "Healthcare Facilities", icon: "🏥", isActive: true, order: 3 },
    { _id: '4', name: "Manufacturing & Industrial Facilities", icon: "🏭", isActive: true, order: 4 },
    { _id: '5', name: "Government & Public Sector", icon: "⚖️", isActive: true, order: 5 },
    { _id: '6', name: "Hospitality & Convention Centers", icon: "🏨", isActive: true, order: 6 },
    { _id: '7', name: "Banking & Financial Institution", icon: "💰", isActive: true, order: 7 },
    { _id: '8', name: "Training Centers & Skill Development Institutes", icon: "🎓", isActive: true, order: 8 },
    { _id: '9', name: "Retail & Commercial Spaces", icon: "🛍️", isActive: true, order: 9 },
    { _id: '10', name: "Live Events & Corporate Events", icon: "🎪", isActive: true, order: 10 }
  ];
};

// Mock solution details for development
const getMockSolutionDetails = (solutionId) => {
  return {
    _id: `details-${solutionId}`,
    solutionId: solutionId,
    title: `Details for Solution ${solutionId}`,
    overview: {
      title: "Overview",
      description: "This is a comprehensive solution designed to meet your business needs with cutting-edge technology and expert implementation."
    },
    keyFeatures: {
      title: "Key Features",
      items: [
        { text: "Feature 1 with advanced capabilities", icon: "✨" },
        { text: "Feature 2 with seamless integration", icon: "🔧" },
        { text: "Feature 3 with scalable architecture", icon: "📈" }
      ]
    },
    businessBenefits: {
      title: "Business Benefits",
      items: [
        { text: "Increased productivity by up to 40%", icon: "📊" },
        { text: "Reduced operational costs", icon: "💰" },
        { text: "Enhanced collaboration and communication", icon: "🤝" }
      ]
    },
    whatWeDeliver: {
      title: "What We Deliver",
      items: [
        { text: "Comprehensive site survey and analysis" },
        { text: "Custom design and engineering" },
        { text: "Professional installation and integration" },
        { text: "Training and handover" },
        { text: "24/7 support and maintenance" }
      ]
    },
    applications: {
      title: "Applications",
      items: [
        { name: "Boardrooms", icon: "🏢" },
        { name: "Auditoriums", icon: "🎭" },
        { name: "Classrooms", icon: "📚" },
        { name: "Conference Centers", icon: "🏛️" },
        { name: "Performance Venues", icon: "🎪" }
      ]
    },
    technologyPartners: {
      title: "Technology Partners",
      partners: [
        { name: "Partner 1", description: "Leading technology provider", website: "https://example.com" },
        { name: "Partner 2", description: "Innovative solutions partner", website: "https://example.com" }
      ]
    },
    whySpeedlight: {
      title: "Why Speedlight Infosolutions",
      features: [
        { text: "Science-based acoustic optimization", icon: "🔬" },
        { text: "Measurable performance enhancement", icon: "📊" },
        { text: "Environment-specific tuning approach", icon: "🎯" }
      ]
    },
    status: "published"
  };
};

// CRUD Operations for Solutions
export const createSolution = async (solutionData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.post('/api/solutions', solutionData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return extractData(response);
  } catch (error) {
    console.error('Error creating solution:', error);
    throw error;
  }
};

export const updateSolution = async (id, solutionData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.put(`/api/solutions/${id}`, solutionData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return extractData(response);
  } catch (error) {
    console.error('Error updating solution:', error);
    throw error;
  }
};

export const deleteSolution = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.delete(`/api/solutions/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return extractData(response);
  } catch (error) {
    console.error('Error deleting solution:', error);
    throw error;
  }
};

// CRUD Operations for Industries
export const createIndustry = async (industryData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.post('/api/industries', industryData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return extractData(response);
  } catch (error) {
    console.error('Error creating industry:', error);
    throw error;
  }
};

export const updateIndustry = async (id, industryData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.put(`/api/industries/${id}`, industryData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return extractData(response);
  } catch (error) {
    console.error('Error updating industry:', error);
    throw error;
  }
};

export const deleteIndustry = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.delete(`/api/industries/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return extractData(response);
  } catch (error) {
    console.error('Error deleting industry:', error);
    throw error;
  }
};

// SOLUTION DETAILS ENDPOINTS

// PUBLIC - Get solution details by solution ID (no auth required)
export const fetchSolutionDetails = async (solutionId) => {
  try {
    console.log('Fetching solution details for ID:', solutionId);
    
    // Use the correct public endpoint from your backend
    const response = await api.get(`/api/public/solution-details/solution/${solutionId}`);
    console.log('Solution details response:', response.data);
    
    // Extract the data based on your response structure
    if (response.data && response.data.success === true && response.data.data) {
      return response.data.data;
    }
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching solution details:', error);
    
    // If the solution ID endpoint fails, try the slug approach as fallback
    try {
      // First, get the solution to find its slug
      const solutions = await fetchSolutions();
      const solution = solutions.find(s => (s._id || s.id) === solutionId);
      
      if (solution) {
        // Create slug from title if slug doesn't exist
        const slug = solution.slug || solution.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        
        console.log('Trying fallback with slug:', slug);
        const slugResponse = await api.get(`/api/solution-details/${slug}`);
        
        if (slugResponse.data) {
          if (slugResponse.data.success === true && slugResponse.data.data) {
            return slugResponse.data.data;
          }
          if (slugResponse.data.data) {
            return slugResponse.data.data;
          }
          return slugResponse.data;
        }
      }
    } catch (slugError) {
      console.log('Slug fallback also failed:', slugError.message);
    }
    
    // Return mock data for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Returning mock solution details for development');
      return getMockSolutionDetails(solutionId);
    }
    
    return null;
  }
};

// ADMIN - Get all solution details (requires token)
export const fetchAdminSolutionDetails = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found for admin solution details');
      return [];
    }
    const response = await api.get('/api/solution-details/admin/all', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return ensureArray(extractData(response), []);
  } catch (error) {
    console.error('Error fetching admin solution details:', error);
    return [];
  }
};

// ADMIN - Create solution details (requires token)
export const createSolutionDetails = async (detailsData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    // Handle FormData for file uploads
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    // If it's FormData, don't set Content-Type (browser will set it with boundary)
    if (detailsData instanceof FormData) {
      // Let browser set Content-Type with boundary
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    
    const response = await api.post('/api/solution-details', detailsData, config);
    return extractData(response);
  } catch (error) {
    console.error('Error creating solution details:', error);
    throw error;
  }
};

// ADMIN - Update solution details (requires token)
export const updateSolutionDetails = async (id, detailsData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    // If it's FormData, don't set Content-Type (browser will set it with boundary)
    if (detailsData instanceof FormData) {
      // Let browser set Content-Type with boundary
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    
    const response = await api.put(`/api/solution-details/${id}`, detailsData, config);
    return extractData(response);
  } catch (error) {
    console.error('Error updating solution details:', error);
    throw error;
  }
};

// ADMIN - Delete solution details (requires token)
export const deleteSolutionDetails = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.delete(`/api/solution-details/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return extractData(response);
  } catch (error) {
    console.error('Error deleting solution details:', error);
    throw error;
  }
};

// ADMIN - Update solution details status (requires token)
export const updateSolutionDetailsStatus = async (id, status) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.patch(`/api/solution-details/${id}/status`, 
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return extractData(response);
  } catch (error) {
    console.error('Error updating solution details status:', error);
    throw error;
  }
};

// INDUSTRY DETAILS ENDPOINTS

// PUBLIC - Get industry details by industry ID (no auth required)
export const fetchIndustryDetails = async (industryId) => {
  try {
    const response = await api.get(`/api/public/industry-details/industry/${industryId}`);
    
    if (response.data && response.data.success === true && response.data.data) {
      return response.data.data;
    }
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching industry details:', error);
    return null;
  }
};

// ADMIN - Get all industry details (requires token)
export const fetchAdminIndustryDetails = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found for admin industry details');
      return [];
    }
    const response = await api.get('/api/industry-details/admin/all', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return ensureArray(extractData(response), []);
  } catch (error) {
    console.error('Error fetching admin industry details:', error);
    return [];
  }
};

// ADMIN - Create industry details (requires token)
export const createIndustryDetails = async (detailsData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    if (detailsData instanceof FormData) {
      // Let browser set Content-Type
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    
    const response = await api.post('/api/industry-details', detailsData, config);
    return extractData(response);
  } catch (error) {
    console.error('Error creating industry details:', error);
    throw error;
  }
};

// ADMIN - Update industry details (requires token)
export const updateIndustryDetails = async (id, detailsData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    if (detailsData instanceof FormData) {
      // Let browser set Content-Type
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    
    const response = await api.put(`/api/industry-details/${id}`, detailsData, config);
    return extractData(response);
  } catch (error) {
    console.error('Error updating industry details:', error);
    throw error;
  }
};

// ADMIN - Delete industry details (requires token)
export const deleteIndustryDetails = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.delete(`/api/industry-details/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return extractData(response);
  } catch (error) {
    console.error('Error deleting industry details:', error);
    throw error;
  }
};

// ADMIN - Update industry details status (requires token)
export const updateIndustryDetailsStatus = async (id, status) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.patch(`/api/industry-details/${id}/status`, 
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return extractData(response);
  } catch (error) {
    console.error('Error updating industry details status:', error);
    throw error;
  }
};

export default api;