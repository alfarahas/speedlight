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

// PUBLIC ENDPOINTS (no auth required)
export const fetchSolutions = async () => {
  try {
    const response = await api.get('/api/public/solutions');
    return ensureArray(response.data, getMockSolutions());
  } catch (error) {
    console.error('Error fetching solutions:', error);
    return getMockSolutions();
  }
};

export const fetchIndustries = async () => {
  try {
    const response = await api.get('/api/public/industries');
    return ensureArray(response.data, getMockIndustries());
  } catch (error) {
    console.error('Error fetching industries:', error);
    return getMockIndustries();
  }
};

// ADMIN ENDPOINTS (require token) - FIXED with array validation
export const fetchAdminSolutions = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/api/solutions', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return ensureArray(response.data, []);
  } catch (error) {
    console.error('Error fetching admin solutions:', error);
    return [];
  }
};

export const fetchAdminIndustries = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/api/industries', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return ensureArray(response.data, []);
  } catch (error) {
    console.error('Error fetching admin industries:', error);
    return [];
  }
};

// Mock data for development when backend is not available
const getMockSolutions = () => {
  return [
    {
      id: '1',
      title: "Workplace Collaboration & Video Conferencing",
      description: "Enterprise-grade meeting rooms, smart collaboration spaces, hybrid work environments, and large-scale townhall AV systems.",
      icon: "1️⃣",
      category: "collaboration",
      isActive: true
    },
    {
      id: '2',
      title: "Integrated Professional Sound Systems",
      description: "Commercial audio, conferencing systems, PA solutions, background music, live sound, and acoustic optimization.",
      icon: "2️⃣",
      category: "audio",
      isActive: true
    },
    {
      id: '3',
      title: "Display & Visualization Solutions",
      description: "Commercial displays, video walls, interactive panels, digital signage, and projection systems.",
      icon: "3️⃣",
      category: "display",
      isActive: true
    },
    {
      id: '4',
      title: "Enterprise Networking & Connectivity",
      description: "Structured cabling, LAN/WAN infrastructure, wireless networks, AV over IP, and data center environments.",
      icon: "4️⃣",
      category: "networking",
      isActive: true
    },
    {
      id: '5',
      title: "Intelligent Systems & Control Platforms",
      description: "Centralized AV control, room automation, multi-room management, and customized control programming.",
      icon: "5️⃣",
      category: "control",
      isActive: true
    },
    {
      id: '6',
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
    { id: '1', name: "Corporate & Enterprise Offices", icon: "🏢", isActive: true, order: 1 },
    { id: '2', name: "Education & Digital Classrooms", icon: "📚", isActive: true, order: 2 },
    { id: '3', name: "Healthcare Facilities", icon: "🏥", isActive: true, order: 3 },
    { id: '4', name: "Manufacturing & Industrial Facilities", icon: "🏭", isActive: true, order: 4 },
    { id: '5', name: "Government & Public Sector", icon: "⚖️", isActive: true, order: 5 },
    { id: '6', name: "Hospitality & Convention Centers", icon: "🏨", isActive: true, order: 6 },
    { id: '7', name: "Banking & Financial Institution", icon: "💰", isActive: true, order: 7 },
    { id: '8', name: "Training Centers & Skill Development Institutes", icon: "🎓", isActive: true, order: 8 },
    { id: '9', name: "Retail & Commercial Spaces", icon: "🛍️", isActive: true, order: 9 },
    { id: '10', name: "Live Events & Corporate Events", icon: "🎪", isActive: true, order: 10 }
  ];
};

// Keep your existing CRUD operations but add array validation
export const createSolution = async (solutionData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.post('/api/solutions', solutionData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
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
    return response.data;
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
    return response.data;
  } catch (error) {
    console.error('Error deleting solution:', error);
    throw error;
  }
};

export const createIndustry = async (industryData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.post('/api/industries', industryData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
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
    return response.data;
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
    return response.data;
  } catch (error) {
    console.error('Error deleting industry:', error);
    throw error;
  }
};

// Solution Details endpoints - PUBLIC
export const fetchSolutionDetails = async (solutionId) => {
  try {
    const response = await api.get(`/api/public/solution-details/${solutionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching solution details:', error);
    return null;
  }
};

// Solution Details endpoints - ADMIN
export const fetchAdminSolutionDetails = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/api/solution-details', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return ensureArray(response.data, []);
  } catch (error) {
    console.error('Error fetching admin solution details:', error);
    return [];
  }
};

export const createSolutionDetails = async (detailsData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.post('/api/solution-details', detailsData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating solution details:', error);
    throw error;
  }
};

export const updateSolutionDetails = async (id, detailsData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.put(`/api/solution-details/${id}`, detailsData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating solution details:', error);
    throw error;
  }
};

export const deleteSolutionDetails = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.delete(`/api/solution-details/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting solution details:', error);
    throw error;
  }
};

// Industry Details endpoints - PUBLIC
export const fetchIndustryDetails = async (industryId) => {
  try {
    const response = await api.get(`/api/public/industry-details/${industryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching industry details:', error);
    return null;
  }
};

// Industry Details endpoints - ADMIN
export const fetchAdminIndustryDetails = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/api/industry-details', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return ensureArray(response.data, []);
  } catch (error) {
    console.error('Error fetching admin industry details:', error);
    return [];
  }
};

export const createIndustryDetails = async (detailsData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.post('/api/industry-details', detailsData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating industry details:', error);
    throw error;
  }
};

export const updateIndustryDetails = async (id, detailsData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.put(`/api/industry-details/${id}`, detailsData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating industry details:', error);
    throw error;
  }
};

export const deleteIndustryDetails = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.delete(`/api/industry-details/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting industry details:', error);
    throw error;
  }
};

export default api;