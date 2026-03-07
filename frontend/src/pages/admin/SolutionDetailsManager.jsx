import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  MenuItem,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControlLabel,  
  Switch,
  Tab,
  Tabs,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Visibility as ViewIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
  },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

// Sortable Item Component
const SortableItem = ({ id, children, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? 'rgba(37, 99, 235, 0.05)' : 'transparent',
    borderRadius: '8px',
    marginBottom: '4px',
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      sx={{ 
        cursor: 'grab',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
        },
      }}
    >
      <Box {...listeners} sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
        <Box
          sx={{
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          ⋮⋮
        </Box>
      </Box>
      {children}
    </ListItem>
  );
};

const SolutionDetailsManager = () => {
  const [solutions, setSolutions] = useState([]);
  const [solutionDetails, setSolutionDetails] = useState([]);
  const [heroImageFile, setHeroImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDetail, setEditingDetail] = useState(null);
  const [selectedSolution, setSelectedSolution] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Form Data State - ADDED keyFeatures and businessBenefits
  const [formData, setFormData] = useState({
    solutionId: '',
    title: '',
    heroImage: {
      url: '',
      alt: '',
      publicId: ''
    },
    overview: {
      title: 'Overview',
      description: ''
    },
    keyFeatures: {  // NEW
      title: 'Key Features',
      items: []
    },
    businessBenefits: {  // NEW
      title: 'Business Benefits',
      items: []
    },
    whatWeDeliver: {
      title: 'What We Deliver',
      items: []
    },
    applications: {
      title: 'Applications',
      items: []
    },
    technologyPartners: {
      title: 'Technology Partners',
      partners: []
    },
    whySpeedlight: {
      title: 'Why Speedlight Infosolutions',
      features: []
    },
    relatedSolutions: [],
    seo: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: [],
      canonicalUrl: '',
      ogImage: ''
    },
    status: 'draft'
  });

  // Temporary input states - ADDED newKeyFeature and newBusinessBenefit
  const [newKeyFeature, setNewKeyFeature] = useState({ text: '', icon: '' });
  const [newBusinessBenefit, setNewBusinessBenefit] = useState({ text: '', icon: '' });
  const [newDeliverable, setNewDeliverable] = useState('');
  const [newApplication, setNewApplication] = useState({ name: '', icon: '' });
  const [newPartner, setNewPartner] = useState({
    name: '',
    description: '',
    website: ''
  });
  const [newFeature, setNewFeature] = useState({ text: '', icon: '' });
  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [solutionsRes, detailsRes] = await Promise.all([
        axios.get(`${API_URL}/api/solutions`, { headers }),
        axios.get(`${API_URL}/api/solution-details/admin/all`, { headers })
      ]);

      setSolutions(solutionsRes.data.data || solutionsRes.data);
      setSolutionDetails(detailsRes.data.data || detailsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Hero Image Upload
  const handleHeroImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Create a local preview URL
  const previewUrl = URL.createObjectURL(file);
  
  // Store the file for later upload
  setFormData(prev => ({
    ...prev,
    heroImage: {
      url: previewUrl,
      file: file,
      alt: prev.title || 'Hero image',
      publicId: ''
    }
  }));

  console.log('Image selected:', file.name);
};

  // Key Features (NEW)
  const addKeyFeature = () => {
    if (newKeyFeature.text) {
      const newItem = {
        id: `keyFeature-${Date.now()}-${Math.random()}`,
        text: newKeyFeature.text,
        icon: newKeyFeature.icon,
        order: formData.keyFeatures.items.length
      };
      
      setFormData({
        ...formData,
        keyFeatures: {
          ...formData.keyFeatures,
          items: [...formData.keyFeatures.items, newItem]
        }
      });
      setNewKeyFeature({ text: '', icon: '' });
    }
  };

  const removeKeyFeature = (index) => {
    setFormData({
      ...formData,
      keyFeatures: {
        ...formData.keyFeatures,
        items: formData.keyFeatures.items.filter((_, i) => i !== index)
      }
    });
  };

  // Business Benefits (NEW)
  const addBusinessBenefit = () => {
    if (newBusinessBenefit.text) {
      const newItem = {
        id: `benefit-${Date.now()}-${Math.random()}`,
        text: newBusinessBenefit.text,
        icon: newBusinessBenefit.icon,
        order: formData.businessBenefits.items.length
      };
      
      setFormData({
        ...formData,
        businessBenefits: {
          ...formData.businessBenefits,
          items: [...formData.businessBenefits.items, newItem]
        }
      });
      setNewBusinessBenefit({ text: '', icon: '' });
    }
  };

  const removeBusinessBenefit = (index) => {
    setFormData({
      ...formData,
      businessBenefits: {
        ...formData.businessBenefits,
        items: formData.businessBenefits.items.filter((_, i) => i !== index)
      }
    });
  };

  // What We Deliver
  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      const newItem = {
        id: `deliverable-${Date.now()}-${Math.random()}`,
        text: newDeliverable.trim(),
        order: formData.whatWeDeliver.items.length
      };
      
      setFormData({
        ...formData,
        whatWeDeliver: {
          ...formData.whatWeDeliver,
          items: [...formData.whatWeDeliver.items, newItem]
        }
      });
      setNewDeliverable('');
    }
  };

  const removeDeliverable = (index) => {
    setFormData({
      ...formData,
      whatWeDeliver: {
        ...formData.whatWeDeliver,
        items: formData.whatWeDeliver.items.filter((_, i) => i !== index)
      }
    });
  };

  // Applications
  const addApplication = () => {
    if (newApplication.name) {
      const newItem = {
        id: `application-${Date.now()}-${Math.random()}`,
        name: newApplication.name,
        icon: newApplication.icon,
        order: formData.applications.items.length
      };
      
      setFormData({
        ...formData,
        applications: {
          ...formData.applications,
          items: [...formData.applications.items, newItem]
        }
      });
      setNewApplication({ name: '', icon: '' });
    }
  };

  const removeApplication = (index) => {
    setFormData({
      ...formData,
      applications: {
        ...formData.applications,
        items: formData.applications.items.filter((_, i) => i !== index)
      }
    });
  };

  // Technology Partners
  const addPartner = () => {
    if (newPartner.name) {
      const partnerData = {
        id: `partner-${Date.now()}-${Math.random()}`,
        name: newPartner.name,
        description: newPartner.description,
        website: newPartner.website,
        order: formData.technologyPartners.partners.length
      };

      setFormData({
        ...formData,
        technologyPartners: {
          ...formData.technologyPartners,
          partners: [...formData.technologyPartners.partners, partnerData]
        }
      });

      setNewPartner({
        name: '',
        description: '',
        website: ''
      });
    }
  };

  const removePartner = (index) => {
    setFormData({
      ...formData,
      technologyPartners: {
        ...formData.technologyPartners,
        partners: formData.technologyPartners.partners.filter((_, i) => i !== index)
      }
    });
  };

  // Why Speedlight Features
  const addFeature = () => {
    if (newFeature.text) {
      const newItem = {
        id: `feature-${Date.now()}-${Math.random()}`,
        text: newFeature.text,
        icon: newFeature.icon,
        order: formData.whySpeedlight.features.length
      };
      
      setFormData({
        ...formData,
        whySpeedlight: {
          ...formData.whySpeedlight,
          features: [...formData.whySpeedlight.features, newItem]
        }
      });
      setNewFeature({ text: '', icon: '' });
    }
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      whySpeedlight: {
        ...formData.whySpeedlight,
        features: formData.whySpeedlight.features.filter((_, i) => i !== index)
      }
    });
  };

  // SEO Keywords
  const addKeyword = () => {
    if (newKeyword.trim()) {
      setFormData({
        ...formData,
        seo: {
          ...formData.seo,
          metaKeywords: [...(formData.seo.metaKeywords || []), newKeyword.trim()]
        }
      });
      setNewKeyword('');
    }
  };

  const removeKeyword = (index) => {
    setFormData({
      ...formData,
      seo: {
        ...formData.seo,
        metaKeywords: formData.seo.metaKeywords.filter((_, i) => i !== index)
      }
    });
  };

  // Drag and Drop handlers - ADDED for keyFeatures and businessBenefits
  const handleKeyFeatureDragEnd = (event) => {
    const { active, over } = event;
    
    if (active && over && active.id !== over.id) {
      const oldIndex = formData.keyFeatures.items.findIndex(item => item.id === active.id);
      const newIndex = formData.keyFeatures.items.findIndex(item => item.id === over.id);
      
      const newItems = arrayMove(formData.keyFeatures.items, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index
      }));
      
      setFormData({
        ...formData,
        keyFeatures: {
          ...formData.keyFeatures,
          items: newItems
        }
      });
    }
  };

  const handleBusinessBenefitDragEnd = (event) => {
    const { active, over } = event;
    
    if (active && over && active.id !== over.id) {
      const oldIndex = formData.businessBenefits.items.findIndex(item => item.id === active.id);
      const newIndex = formData.businessBenefits.items.findIndex(item => item.id === over.id);
      
      const newItems = arrayMove(formData.businessBenefits.items, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index
      }));
      
      setFormData({
        ...formData,
        businessBenefits: {
          ...formData.businessBenefits,
          items: newItems
        }
      });
    }
  };

  const handleDeliverableDragEnd = (event) => {
    const { active, over } = event;
    
    if (active && over && active.id !== over.id) {
      const oldIndex = formData.whatWeDeliver.items.findIndex(item => item.id === active.id);
      const newIndex = formData.whatWeDeliver.items.findIndex(item => item.id === over.id);
      
      const newItems = arrayMove(formData.whatWeDeliver.items, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index
      }));
      
      setFormData({
        ...formData,
        whatWeDeliver: {
          ...formData.whatWeDeliver,
          items: newItems
        }
      });
    }
  };

  const handleApplicationDragEnd = (event) => {
    const { active, over } = event;
    
    if (active && over && active.id !== over.id) {
      const oldIndex = formData.applications.items.findIndex(item => item.id === active.id);
      const newIndex = formData.applications.items.findIndex(item => item.id === over.id);
      
      const newItems = arrayMove(formData.applications.items, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index
      }));
      
      setFormData({
        ...formData,
        applications: {
          ...formData.applications,
          items: newItems
        }
      });
    }
  };

  const handleFeatureDragEnd = (event) => {
    const { active, over } = event;
    
    if (active && over && active.id !== over.id) {
      const oldIndex = formData.whySpeedlight.features.findIndex(item => item.id === active.id);
      const newIndex = formData.whySpeedlight.features.findIndex(item => item.id === over.id);
      
      const newItems = arrayMove(formData.whySpeedlight.features, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index
      }));
      
      setFormData({
        ...formData,
        whySpeedlight: {
          ...formData.whySpeedlight,
          features: newItems
        }
      });
    }
  };

  const openCreateModal = () => {
    setEditingDetail(null);
    setFormData({
      solutionId: '',
      title: '',
      heroImage: { url: '', alt: '', publicId: '' },
      overview: { title: 'Overview', description: '' },
      keyFeatures: { title: 'Key Features', items: [] },
      businessBenefits: { title: 'Business Benefits', items: [] },
      whatWeDeliver: { title: 'What We Deliver', items: [] },
      applications: { title: 'Applications', items: [] },
      technologyPartners: { title: 'Technology Partners', partners: [] },
      whySpeedlight: { title: 'Why Speedlight Infosolutions', features: [] },
      relatedSolutions: [],
      seo: {
        metaTitle: '',
        metaDescription: '',
        metaKeywords: [],
        canonicalUrl: '',
        ogImage: ''
      },
      status: 'draft'
    });
    setTabValue(0);
    setShowModal(true);
  };

  const openEditModal = (detail) => {
    // Add unique IDs to items if they don't have them
    const keyFeaturesItems = (detail.keyFeatures?.items || []).map((item, index) => ({
      id: item.id || `keyFeature-${Date.now()}-${index}-${Math.random()}`,
      text: item.text || item,
      icon: item.icon || '',
      order: item.order || index
    }));

    const businessBenefitsItems = (detail.businessBenefits?.items || []).map((item, index) => ({
      id: item.id || `benefit-${Date.now()}-${index}-${Math.random()}`,
      text: item.text || item,
      icon: item.icon || '',
      order: item.order || index
    }));

    const whatWeDeliverItems = (detail.whatWeDeliver?.items || []).map((item, index) => ({
      id: item.id || `deliverable-${Date.now()}-${index}-${Math.random()}`,
      text: item.text || item,
      order: item.order || index
    }));

    const applicationItems = (detail.applications?.items || []).map((item, index) => ({
      id: item.id || `application-${Date.now()}-${index}-${Math.random()}`,
      name: item.name || item,
      icon: item.icon || '',
      order: item.order || index
    }));

    const featureItems = (detail.whySpeedlight?.features || []).map((item, index) => ({
      id: item.id || `feature-${Date.now()}-${index}-${Math.random()}`,
      text: item.text || item,
      icon: item.icon || '',
      order: item.order || index
    }));

    setEditingDetail(detail);
    setFormData({
      solutionId: detail.solutionId?._id || '',
      title: detail.title || '',
      heroImage: detail.heroImage || { url: '', alt: '', publicId: '' },
      overview: detail.overview || { title: 'Overview', description: '' },
      keyFeatures: {
        title: detail.keyFeatures?.title || 'Key Features',
        items: keyFeaturesItems
      },
      businessBenefits: {
        title: detail.businessBenefits?.title || 'Business Benefits',
        items: businessBenefitsItems
      },
      whatWeDeliver: {
        title: detail.whatWeDeliver?.title || 'What We Deliver',
        items: whatWeDeliverItems
      },
      applications: {
        title: detail.applications?.title || 'Applications',
        items: applicationItems
      },
      technologyPartners: detail.technologyPartners || { title: 'Technology Partners', partners: [] },
      whySpeedlight: {
        title: detail.whySpeedlight?.title || 'Why Speedlight Infosolutions',
        features: featureItems
      },
      relatedSolutions: detail.relatedSolutions?.map(s => s._id) || [],
      seo: detail.seo || {
        metaTitle: '',
        metaDescription: '',
        metaKeywords: [],
        canonicalUrl: '',
        ogImage: ''
      },
      status: detail.status || 'draft'
    });
    setTabValue(0);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    let heroImageData = formData.heroImage;
    
    // Upload image first if there's a new file
    if (formData.heroImage?.file) {
      const imageFormData = new FormData();
      imageFormData.append('heroImage', formData.heroImage.file);
      
      console.log('Uploading image...');
      const uploadResponse = await axios.post(`${API_URL}/api/upload/hero-image`, imageFormData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Upload response:', uploadResponse.data);
      
      heroImageData = {
        url: uploadResponse.data.url,
        publicId: uploadResponse.data.filename,
        alt: formData.title || 'Hero image'
      };
    }

    // Prepare the data for submission
    const submitData = {
      solutionId: formData.solutionId,
      title: formData.title,
      status: formData.status,
      heroImage: heroImageData,
      overview: {
        title: formData.overview.title,
        description: formData.overview.description
      },
      keyFeatures: {
        title: formData.keyFeatures.title,
        items: formData.keyFeatures.items.map(({ id, file, ...item }) => item)
      },
      businessBenefits: {
        title: formData.businessBenefits.title,
        items: formData.businessBenefits.items.map(({ id, file, ...item }) => item)
      },
      whatWeDeliver: {
        title: formData.whatWeDeliver.title,
        items: formData.whatWeDeliver.items.map(({ id, file, ...item }) => item)
      },
      applications: {
        title: formData.applications.title,
        items: formData.applications.items.map(({ id, file, ...item }) => item)
      },
      technologyPartners: {
        title: formData.technologyPartners.title,
        partners: formData.technologyPartners.partners.map(({ id, file, ...item }) => item)
      },
      whySpeedlight: {
        title: formData.whySpeedlight.title,
        features: formData.whySpeedlight.features.map(({ id, file, ...item }) => item)
      },
      relatedSolutions: formData.relatedSolutions,
      seo: formData.seo
    };

    console.log('Submitting solution details:', submitData);

    const headers = { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    if (editingDetail) {
      await axios.put(`${API_URL}/api/solution-details/${editingDetail._id}`, submitData, { headers });
    } else {
      await axios.post(`${API_URL}/api/solution-details`, submitData, { headers });
    }

    fetchData();
    setShowModal(false);
    alert('Solution details saved successfully!');
  } catch (error) {
    console.error('Error saving solution details:', error);
    alert(error.response?.data?.error || 'Error saving solution details');
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete these solution details?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/solution-details/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting solution details:', error);
      alert('Error deleting solution details');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_URL}/solution-details/${id}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'published': return '#10b981';
      case 'draft': return '#f59e0b';
      case 'archived': return '#6b7280';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress sx={{ color: '#2563eb' }} />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a' }}>
          Solution Details Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreateModal}
          sx={{
            bgcolor: '#2563eb',
            '&:hover': { bgcolor: '#1d4ed8' },
            borderRadius: '12px',
            textTransform: 'none',
          }}
        >
          Add Solution Details
        </Button>
      </Box>

      <Grid container spacing={3}>
        {solutionDetails.map((detail) => (
          <Grid item xs={12} md={6} key={detail._id}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {detail.heroImage?.url && (
                    <Avatar 
                      src={detail.heroImage.url} 
                      variant="rounded"
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {detail.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {detail.solutionId?.name || 'No solution linked'}
                    </Typography>
                  </Box>
                  <Chip
                    label={detail.status}
                    size="small"
                    sx={{
                      bgcolor: `${getStatusColor(detail.status)}20`,
                      color: getStatusColor(detail.status),
                      fontWeight: 600,
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {detail.overview?.description?.substring(0, 100)}...
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Key Features
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {detail.keyFeatures?.items?.length || 0} items
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Business Benefits
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {detail.businessBenefits?.items?.length || 0} items
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      What We Deliver
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {detail.whatWeDeliver?.items?.length || 0} items
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Applications
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {detail.applications?.items?.length || 0} items
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Partners
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {detail.technologyPartners?.partners?.length || 0} partners
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Features
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {detail.whySpeedlight?.features?.length || 0} features
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                <Tooltip title="Edit">
                  <IconButton onClick={() => openEditModal(detail)} sx={{ color: '#2563eb' }}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(detail._id)} sx={{ color: '#ef4444' }}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Select
                  size="small"
                  value={detail.status}
                  onChange={(e) => handleStatusChange(detail._id, e.target.value)}
                  sx={{ minWidth: 100, ml: 1 }}
                >
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Create/Edit Modal */}
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        maxWidth="lg"
        fullWidth
        scroll="paper"
        PaperProps={{
          sx: {
            borderRadius: '24px',
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a' }}>
            {editingDetail ? 'Edit Solution Details' : 'Add New Solution Details'}
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Basic Info" />
                <Tab label="Key Features" />
                <Tab label="Business Benefits" />
                <Tab label="What We Deliver" />
                <Tab label="Applications" />
                <Tab label="Partners" />
                <Tab label="Why Speedlight" />
                <Tab label="SEO" />
              </Tabs>
            </Box>

            {/* Basic Info Tab */}
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Select Solution</InputLabel>
                    <Select
                      name="solutionId"
                      value={formData.solutionId}
                      onChange={handleInputChange}
                      label="Select Solution"
                      disabled={editingDetail}
                    >
                      {solutions.map((solution) => (
                        <MenuItem key={solution._id} value={solution._id}>
                          {solution.name || solution.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Detail Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    helperText="This will be used for the page title and URL slug"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    Hero Image
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {formData.heroImage?.url && (
                      <Avatar 
                        src={formData.heroImage.url} 
                        variant="rounded"
                        sx={{ width: 100, height: 100 }}
                      />
                    )}
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? 'Uploading...' : 'Upload Hero Image'}
                      <VisuallyHiddenInput 
                        type="file" 
                        accept="image/*"
                        onChange={handleHeroImageUpload}
                      />
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Overview Title"
                    name="overview.title"
                    value={formData.overview.title}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Overview Description"
                    name="overview.description"
                    value={formData.overview.description}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      label="Status"
                    >
                      <MenuItem value="draft">Draft</MenuItem>
                      <MenuItem value="published">Published</MenuItem>
                      <MenuItem value="archived">Archived</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Key Features Tab (NEW) */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Section Title"
                  name="keyFeatures.title"
                  value={formData.keyFeatures.title}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 3 }}
                />

                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Key Features
                </Typography>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      size="small"
                      value={newKeyFeature.text}
                      onChange={(e) => setNewKeyFeature({ ...newKeyFeature, text: e.target.value })}
                      placeholder="Feature text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      size="small"
                      value={newKeyFeature.icon}
                      onChange={(e) => setNewKeyFeature({ ...newKeyFeature, icon: e.target.value })}
                      placeholder="Icon (emoji)"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" onClick={addKeyFeature} fullWidth>
                      Add
                    </Button>
                  </Grid>
                </Grid>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleKeyFeatureDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={formData.keyFeatures.items.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <List>
                      {formData.keyFeatures.items.map((item, index) => (
                        <SortableItem 
                          key={item.id} 
                          id={item.id}
                        >
                          <ListItemText 
                            primary={`${item.icon} ${item.text}`} 
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => removeKeyFeature(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </SortableItem>
                      ))}
                    </List>
                  </SortableContext>
                </DndContext>
              </Box>
            </TabPanel>

            {/* Business Benefits Tab (NEW) */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Section Title"
                  name="businessBenefits.title"
                  value={formData.businessBenefits.title}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 3 }}
                />

                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Business Benefits
                </Typography>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      size="small"
                      value={newBusinessBenefit.text}
                      onChange={(e) => setNewBusinessBenefit({ ...newBusinessBenefit, text: e.target.value })}
                      placeholder="Benefit text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      size="small"
                      value={newBusinessBenefit.icon}
                      onChange={(e) => setNewBusinessBenefit({ ...newBusinessBenefit, icon: e.target.value })}
                      placeholder="Icon (emoji)"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" onClick={addBusinessBenefit} fullWidth>
                      Add
                    </Button>
                  </Grid>
                </Grid>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleBusinessBenefitDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={formData.businessBenefits.items.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <List>
                      {formData.businessBenefits.items.map((item, index) => (
                        <SortableItem 
                          key={item.id} 
                          id={item.id}
                        >
                          <ListItemText 
                            primary={`${item.icon} ${item.text}`} 
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => removeBusinessBenefit(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </SortableItem>
                      ))}
                    </List>
                  </SortableContext>
                </DndContext>
              </Box>
            </TabPanel>

            {/* What We Deliver Tab */}
            <TabPanel value={tabValue} index={3}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Section Title"
                  name="whatWeDeliver.title"
                  value={formData.whatWeDeliver.title}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 3 }}
                />

                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Deliverables
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    size="small"
                    value={newDeliverable}
                    onChange={(e) => setNewDeliverable(e.target.value)}
                    placeholder="Enter deliverable item"
                    fullWidth
                    onKeyPress={(e) => e.key === 'Enter' && addDeliverable()}
                  />
                  <Button variant="outlined" onClick={addDeliverable}>
                    Add
                  </Button>
                </Box>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDeliverableDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={formData.whatWeDeliver.items.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <List>
                      {formData.whatWeDeliver.items.map((item, index) => (
                        <SortableItem 
                          key={item.id} 
                          id={item.id}
                        >
                          <ListItemText primary={item.text} />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => removeDeliverable(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </SortableItem>
                      ))}
                    </List>
                  </SortableContext>
                </DndContext>
              </Box>
            </TabPanel>

            {/* Applications Tab */}
            <TabPanel value={tabValue} index={4}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Section Title"
                  name="applications.title"
                  value={formData.applications.title}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 3 }}
                />

                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Applications
                </Typography>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      size="small"
                      value={newApplication.name}
                      onChange={(e) => setNewApplication({ ...newApplication, name: e.target.value })}
                      placeholder="Application name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      size="small"
                      value={newApplication.icon}
                      onChange={(e) => setNewApplication({ ...newApplication, icon: e.target.value })}
                      placeholder="Icon"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" onClick={addApplication} fullWidth>
                      Add
                    </Button>
                  </Grid>
                </Grid>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleApplicationDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={formData.applications.items.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <List>
                      {formData.applications.items.map((item, index) => (
                        <SortableItem 
                          key={item.id} 
                          id={item.id}
                        >
                          <ListItemText 
                            primary={`${item.icon} ${item.name}`} 
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => removeApplication(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </SortableItem>
                      ))}
                    </List>
                  </SortableContext>
                </DndContext>
              </Box>
            </TabPanel>

            {/* Technology Partners Tab */}
            <TabPanel value={tabValue} index={5}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Section Title"
                  name="technologyPartners.title"
                  value={formData.technologyPartners.title}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 3 }}
                />

                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Add Partner
                </Typography>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      value={newPartner.name}
                      onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                      placeholder="Partner name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      value={newPartner.description}
                      onChange={(e) => setNewPartner({ ...newPartner, description: e.target.value })}
                      placeholder="Description"
                      multiline
                      rows={2}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      size="small"
                      value={newPartner.website}
                      onChange={(e) => setNewPartner({ ...newPartner, website: e.target.value })}
                      placeholder="Website URL"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" onClick={addPartner} fullWidth>
                      Add
                    </Button>
                  </Grid>
                </Grid>

                <List>
                  {formData.technologyPartners.partners.map((partner, index) => (
                    <ListItem key={partner.id || index}>
                      <ListItemText 
                        primary={partner.name}
                        secondary={partner.description}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => removePartner(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </TabPanel>

            {/* Why Speedlight Tab */}
            <TabPanel value={tabValue} index={6}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Section Title"
                  name="whySpeedlight.title"
                  value={formData.whySpeedlight.title}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 3 }}
                />

                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Features
                </Typography>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      size="small"
                      value={newFeature.text}
                      onChange={(e) => setNewFeature({ ...newFeature, text: e.target.value })}
                      placeholder="Feature text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      size="small"
                      value={newFeature.icon}
                      onChange={(e) => setNewFeature({ ...newFeature, icon: e.target.value })}
                      placeholder="Icon"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" onClick={addFeature} fullWidth>
                      Add
                    </Button>
                  </Grid>
                </Grid>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleFeatureDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={formData.whySpeedlight.features.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <List>
                      {formData.whySpeedlight.features.map((item, index) => (
                        <SortableItem 
                          key={item.id} 
                          id={item.id}
                        >
                          <ListItemText 
                            primary={`${item.icon} ${item.text}`} 
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => removeFeature(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </SortableItem>
                      ))}
                    </List>
                  </SortableContext>
                </DndContext>
              </Box>
            </TabPanel>

            {/* SEO Tab */}
            <TabPanel value={tabValue} index={7}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Meta Title"
                    name="seo.metaTitle"
                    value={formData.seo.metaTitle}
                    onChange={handleInputChange}
                    fullWidth
                    helperText="Recommended: 50-60 characters"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Meta Description"
                    name="seo.metaDescription"
                    value={formData.seo.metaDescription}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    fullWidth
                    helperText="Recommended: 150-160 characters"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    Meta Keywords
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <TextField
                      size="small"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      placeholder="Enter keyword"
                      fullWidth
                      onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                    />
                    <Button variant="outlined" onClick={addKeyword}>
                      Add
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.seo.metaKeywords?.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword}
                        onDelete={() => removeKeyword(index)}
                        size="small"
                      />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Canonical URL"
                    name="seo.canonicalUrl"
                    value={formData.seo.canonicalUrl}
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="https://example.com/page"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="OG Image URL"
                    name="seo.ogImage"
                    value={formData.seo.ogImage}
                    onChange={handleInputChange}
                    fullWidth
                    helperText="URL for social media sharing image"
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setShowModal(false)} variant="outlined">
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ bgcolor: '#2563eb' }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : (editingDetail ? 'Update' : 'Create')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default SolutionDetailsManager;