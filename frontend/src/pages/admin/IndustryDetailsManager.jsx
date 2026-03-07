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
  Avatar,
  Tab,
  Tabs,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
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
const SortableItem = ({ id, children }) => {
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
          }}
        >
          ⋮⋮
        </Box>
      </Box>
      {children}
    </ListItem>
  );
};

const IndustryDetailsManager = () => {
  const [industries, setIndustries] = useState([]);
  const [industryDetails, setIndustryDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDetail, setEditingDetail] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Form Data State with all new sections
  const [formData, setFormData] = useState({
    industryId: '',
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
    coreServices: {
      title: 'Core Services',
      items: []
    },
    deliveryApproach: {
      title: 'Our Delivery Approach',
      items: []
    },
    deploymentLocations: {
      title: 'Typical Deployment Locations',
      items: []
    },
    whyChooseUs: {
      title: 'Why Clients Choose Speedlight',
      features: []
    },
    challenges: [],
    solutions: [],
    technologies: [],
    benefits: [],
    featuredSolutions: [],
    stats: {
      projects: 0,
      clients: 0,
      experience: ''
    },
    gallery: [],
    status: 'draft'
  });

  // Temporary input states
  const [newCoreService, setNewCoreService] = useState({ text: '', icon: '' });
  const [newDeliveryItem, setNewDeliveryItem] = useState({ text: '', icon: '' });
  const [newLocation, setNewLocation] = useState({ name: '', icon: '' });
  const [newWhyFeature, setNewWhyFeature] = useState({ text: '', icon: '' });
  const [newChallenge, setNewChallenge] = useState({ title: '', description: '', icon: '' });
  const [newSolution, setNewSolution] = useState({ title: '', description: '', icon: '', solutions: [] });
  const [newSolutionItem, setNewSolutionItem] = useState('');
  const [newTechnology, setNewTechnology] = useState({ name: '', icon: '' });
  const [newBenefit, setNewBenefit] = useState({ title: '', description: '', icon: '' });
  const [newGalleryItem, setNewGalleryItem] = useState({ imageUrl: '', caption: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [industriesRes, detailsRes] = await Promise.all([
        axios.get(`${API_URL}/api/industries`, { headers }),
        axios.get(`${API_URL}/api/industry-details/admin/all`, { headers })
      ]);

      setIndustries(industriesRes.data.data || industriesRes.data);
      setIndustryDetails(detailsRes.data.data || detailsRes.data);
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
    } else if (name.startsWith('stats.')) {
      const statName = name.split('.')[1];
      setFormData({
        ...formData,
        stats: { ...formData.stats, [statName]: value }
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

    const previewUrl = URL.createObjectURL(file);
    
    setFormData(prev => ({
      ...prev,
      heroImage: {
        url: previewUrl,
        file: file,
        alt: prev.title || 'Hero image',
        publicId: ''
      }
    }));
  };

  // Core Services
  const addCoreService = () => {
    if (newCoreService.text) {
      const newItem = {
        id: `core-${Date.now()}-${Math.random()}`,
        text: newCoreService.text,
        icon: newCoreService.icon,
        order: formData.coreServices.items.length
      };
      setFormData({
        ...formData,
        coreServices: {
          ...formData.coreServices,
          items: [...formData.coreServices.items, newItem]
        }
      });
      setNewCoreService({ text: '', icon: '' });
    }
  };

  const removeCoreService = (index) => {
    setFormData({
      ...formData,
      coreServices: {
        ...formData.coreServices,
        items: formData.coreServices.items.filter((_, i) => i !== index)
      }
    });
  };

  // Delivery Approach
  const addDeliveryItem = () => {
    if (newDeliveryItem.text) {
      const newItem = {
        id: `delivery-${Date.now()}-${Math.random()}`,
        text: newDeliveryItem.text,
        icon: newDeliveryItem.icon,
        order: formData.deliveryApproach.items.length
      };
      setFormData({
        ...formData,
        deliveryApproach: {
          ...formData.deliveryApproach,
          items: [...formData.deliveryApproach.items, newItem]
        }
      });
      setNewDeliveryItem({ text: '', icon: '' });
    }
  };

  const removeDeliveryItem = (index) => {
    setFormData({
      ...formData,
      deliveryApproach: {
        ...formData.deliveryApproach,
        items: formData.deliveryApproach.items.filter((_, i) => i !== index)
      }
    });
  };

  // Deployment Locations
  const addLocation = () => {
    if (newLocation.name) {
      const newItem = {
        id: `location-${Date.now()}-${Math.random()}`,
        name: newLocation.name,
        icon: newLocation.icon,
        order: formData.deploymentLocations.items.length
      };
      setFormData({
        ...formData,
        deploymentLocations: {
          ...formData.deploymentLocations,
          items: [...formData.deploymentLocations.items, newItem]
        }
      });
      setNewLocation({ name: '', icon: '' });
    }
  };

  const removeLocation = (index) => {
    setFormData({
      ...formData,
      deploymentLocations: {
        ...formData.deploymentLocations,
        items: formData.deploymentLocations.items.filter((_, i) => i !== index)
      }
    });
  };

  // Why Choose Us
  const addWhyFeature = () => {
    if (newWhyFeature.text) {
      const newItem = {
        id: `why-${Date.now()}-${Math.random()}`,
        text: newWhyFeature.text,
        icon: newWhyFeature.icon,
        order: formData.whyChooseUs.features.length
      };
      setFormData({
        ...formData,
        whyChooseUs: {
          ...formData.whyChooseUs,
          features: [...formData.whyChooseUs.features, newItem]
        }
      });
      setNewWhyFeature({ text: '', icon: '' });
    }
  };

  const removeWhyFeature = (index) => {
    setFormData({
      ...formData,
      whyChooseUs: {
        ...formData.whyChooseUs,
        features: formData.whyChooseUs.features.filter((_, i) => i !== index)
      }
    });
  };

  // Challenges
  const addChallenge = () => {
    if (newChallenge.title) {
      const newItem = {
        id: `challenge-${Date.now()}-${Math.random()}`,
        ...newChallenge,
        order: formData.challenges.length
      };
      setFormData({
        ...formData,
        challenges: [...formData.challenges, newItem]
      });
      setNewChallenge({ title: '', description: '', icon: '' });
    }
  };

  const removeChallenge = (index) => {
    setFormData({
      ...formData,
      challenges: formData.challenges.filter((_, i) => i !== index)
    });
  };

  // Solutions
  const addSolution = () => {
    if (newSolution.title) {
      const newItem = {
        id: `solution-${Date.now()}-${Math.random()}`,
        ...newSolution,
        order: formData.solutions.length
      };
      setFormData({
        ...formData,
        solutions: [...formData.solutions, newItem]
      });
      setNewSolution({ title: '', description: '', icon: '', solutions: [] });
    }
  };

  const removeSolution = (index) => {
    setFormData({
      ...formData,
      solutions: formData.solutions.filter((_, i) => i !== index)
    });
  };

  const addSolutionItem = (solutionIndex) => {
    if (newSolutionItem) {
      const updatedSolutions = [...formData.solutions];
      if (!updatedSolutions[solutionIndex].solutions) {
        updatedSolutions[solutionIndex].solutions = [];
      }
      updatedSolutions[solutionIndex].solutions.push(newSolutionItem);
      setFormData({ ...formData, solutions: updatedSolutions });
      setNewSolutionItem('');
    }
  };

  const removeSolutionItem = (solutionIndex, itemIndex) => {
    const updatedSolutions = [...formData.solutions];
    updatedSolutions[solutionIndex].solutions = 
      updatedSolutions[solutionIndex].solutions.filter((_, i) => i !== itemIndex);
    setFormData({ ...formData, solutions: updatedSolutions });
  };

  // Technologies
  const addTechnology = () => {
    if (newTechnology.name) {
      const newItem = {
        id: `tech-${Date.now()}-${Math.random()}`,
        ...newTechnology,
        order: formData.technologies.length
      };
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newItem]
      });
      setNewTechnology({ name: '', icon: '' });
    }
  };

  const removeTechnology = (index) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index)
    });
  };

  // Benefits
  const addBenefit = () => {
    if (newBenefit.title) {
      const newItem = {
        id: `benefit-${Date.now()}-${Math.random()}`,
        ...newBenefit,
        order: formData.benefits.length
      };
      setFormData({
        ...formData,
        benefits: [...formData.benefits, newItem]
      });
      setNewBenefit({ title: '', description: '', icon: '' });
    }
  };

  const removeBenefit = (index) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index)
    });
  };

  // Gallery
  const addGalleryItem = () => {
    if (newGalleryItem.imageUrl) {
      const newItem = {
        id: `gallery-${Date.now()}-${Math.random()}`,
        ...newGalleryItem,
        order: formData.gallery.length
      };
      setFormData({
        ...formData,
        gallery: [...formData.gallery, newItem]
      });
      setNewGalleryItem({ imageUrl: '', caption: '' });
    }
  };

  const removeGalleryItem = (index) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_, i) => i !== index)
    });
  };

  // Drag and Drop handlers
  const handleCoreServiceDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = formData.coreServices.items.findIndex(item => item.id === active.id);
      const newIndex = formData.coreServices.items.findIndex(item => item.id === over.id);
      const newItems = arrayMove(formData.coreServices.items, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index
      }));
      setFormData({
        ...formData,
        coreServices: { ...formData.coreServices, items: newItems }
      });
    }
  };

  const handleDeliveryDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = formData.deliveryApproach.items.findIndex(item => item.id === active.id);
      const newIndex = formData.deliveryApproach.items.findIndex(item => item.id === over.id);
      const newItems = arrayMove(formData.deliveryApproach.items, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index
      }));
      setFormData({
        ...formData,
        deliveryApproach: { ...formData.deliveryApproach, items: newItems }
      });
    }
  };

  const handleLocationDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = formData.deploymentLocations.items.findIndex(item => item.id === active.id);
      const newIndex = formData.deploymentLocations.items.findIndex(item => item.id === over.id);
      const newItems = arrayMove(formData.deploymentLocations.items, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index
      }));
      setFormData({
        ...formData,
        deploymentLocations: { ...formData.deploymentLocations, items: newItems }
      });
    }
  };

  const handleWhyFeatureDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = formData.whyChooseUs.features.findIndex(item => item.id === active.id);
      const newIndex = formData.whyChooseUs.features.findIndex(item => item.id === over.id);
      const newItems = arrayMove(formData.whyChooseUs.features, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index
      }));
      setFormData({
        ...formData,
        whyChooseUs: { ...formData.whyChooseUs, features: newItems }
      });
    }
  };

  const openCreateModal = () => {
    setEditingDetail(null);
    setFormData({
      industryId: '',
      title: '',
      heroImage: { url: '', alt: '', publicId: '' },
      overview: { title: 'Overview', description: '' },
      coreServices: { title: 'Core Services', items: [] },
      deliveryApproach: { title: 'Our Delivery Approach', items: [] },
      deploymentLocations: { title: 'Typical Deployment Locations', items: [] },
      whyChooseUs: { title: 'Why Clients Choose Speedlight', features: [] },
      challenges: [],
      solutions: [],
      technologies: [],
      benefits: [],
      featuredSolutions: [],
      stats: { projects: 0, clients: 0, experience: '' },
      gallery: [],
      status: 'draft'
    });
    setTabValue(0);
    setShowModal(true);
  };

  const openEditModal = (detail) => {
    // Add IDs to items if they don't have them
    const addIdsToItems = (items, prefix) => 
      (items || []).map((item, index) => ({
        id: item.id || `${prefix}-${Date.now()}-${index}-${Math.random()}`,
        ...item,
        order: item.order || index
      }));

    setEditingDetail(detail);
    setFormData({
      industryId: detail.industryId?._id || '',
      title: detail.title || '',
      heroImage: detail.heroImage || { url: '', alt: '', publicId: '' },
      overview: detail.overview || { title: 'Overview', description: '' },
      coreServices: {
        title: detail.coreServices?.title || 'Core Services',
        items: addIdsToItems(detail.coreServices?.items, 'core')
      },
      deliveryApproach: {
        title: detail.deliveryApproach?.title || 'Our Delivery Approach',
        items: addIdsToItems(detail.deliveryApproach?.items, 'delivery')
      },
      deploymentLocations: {
        title: detail.deploymentLocations?.title || 'Typical Deployment Locations',
        items: addIdsToItems(detail.deploymentLocations?.items, 'location')
      },
      whyChooseUs: {
        title: detail.whyChooseUs?.title || 'Why Clients Choose Speedlight',
        features: addIdsToItems(detail.whyChooseUs?.features, 'why')
      },
      challenges: addIdsToItems(detail.challenges, 'challenge'),
      solutions: (detail.solutions || []).map((sol, idx) => ({
        id: sol.id || `solution-${Date.now()}-${idx}-${Math.random()}`,
        ...sol,
        order: sol.order || idx
      })),
      technologies: addIdsToItems(detail.technologies, 'tech'),
      benefits: addIdsToItems(detail.benefits, 'benefit'),
      featuredSolutions: detail.featuredSolutions?.map(s => s._id) || [],
      stats: detail.stats || { projects: 0, clients: 0, experience: '' },
      gallery: addIdsToItems(detail.gallery, 'gallery'),
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
      
      // First upload hero image if there's a new file
      let heroImageData = formData.heroImage;
      
      if (formData.heroImage?.file) {
        const imageFormData = new FormData();
        imageFormData.append('heroImage', formData.heroImage.file);
        
        const uploadResponse = await axios.post(`${API_URL}/api/upload/hero-image`, imageFormData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        
        heroImageData = {
          url: uploadResponse.data.url,
          publicId: uploadResponse.data.filename,
          alt: formData.title || 'Hero image'
        };
      }

      // Prepare data for submission
      const submitData = {
        industryId: formData.industryId,
        title: formData.title,
        heroImage: heroImageData,
        overview: formData.overview,
        coreServices: {
          title: formData.coreServices.title,
          items: formData.coreServices.items.map(({ id, file, ...item }) => item)
        },
        deliveryApproach: {
          title: formData.deliveryApproach.title,
          items: formData.deliveryApproach.items.map(({ id, file, ...item }) => item)
        },
        deploymentLocations: {
          title: formData.deploymentLocations.title,
          items: formData.deploymentLocations.items.map(({ id, file, ...item }) => item)
        },
        whyChooseUs: {
          title: formData.whyChooseUs.title,
          features: formData.whyChooseUs.features.map(({ id, file, ...item }) => item)
        },
        challenges: formData.challenges.map(({ id, file, ...item }) => item),
        solutions: formData.solutions.map(({ id, file, ...item }) => item),
        technologies: formData.technologies.map(({ id, file, ...item }) => item),
        benefits: formData.benefits.map(({ id, file, ...item }) => item),
        featuredSolutions: formData.featuredSolutions,
        stats: formData.stats,
        gallery: formData.gallery.map(({ id, file, ...item }) => item),
        status: formData.status
      };

      const headers = { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      if (editingDetail) {
        await axios.put(`${API_URL}/api/industry-details/${editingDetail._id}`, submitData, { headers });
      } else {
        await axios.post(`${API_URL}/api/industry-details`, submitData, { headers });
      }

      fetchData();
      setShowModal(false);
      alert('Industry details saved successfully!');
    } catch (error) {
      console.error('Error saving industry details:', error);
      alert(error.response?.data?.error || 'Error saving industry details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete these industry details?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/industry-details/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting industry details:', error);
      alert('Error deleting industry details');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_URL}/api/industry-details/${id}/status`, 
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
          Industry Details Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreateModal}
          sx={{
            bgcolor: '#2563eb',
            '&:hover': { bgcolor: '#1d4ed8' },
            borderRadius: '12px',
          }}
        >
          Add Industry Details
        </Button>
      </Box>

      <Grid container spacing={3}>
        {industryDetails.map((detail) => (
          <Grid item xs={12} md={6} key={detail._id}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                  {detail.heroImage?.url ? (
                    <Avatar 
                      src={detail.heroImage.url} 
                      variant="rounded"
                      sx={{ width: 60, height: 60 }}
                    />
                  ) : (
                    <Avatar sx={{ bgcolor: '#2563eb', width: 60, height: 60 }}>
                      {detail.industryId?.icon || '🏢'}
                    </Avatar>
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {detail.title || detail.industryId?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {detail.industryId?.name}
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
                      Core Services
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {detail.coreServices?.items?.length || 0} items
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Delivery Approach
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {detail.deliveryApproach?.items?.length || 0} items
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Locations
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {detail.deploymentLocations?.items?.length || 0} items
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Why Choose Us
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {detail.whyChooseUs?.features?.length || 0} features
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
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
        PaperProps={{ sx: { borderRadius: '24px', maxHeight: '90vh' } }}
      >
        <DialogTitle>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {editingDetail ? 'Edit Industry Details' : 'Add Industry Details'}
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Basic Info" />
                <Tab label="Core Services" />
                <Tab label="Delivery Approach" />
                <Tab label="Locations" />
                <Tab label="Why Choose Us" />
                <Tab label="Challenges" />
                <Tab label="Solutions" />
                <Tab label="Technologies" />
                <Tab label="Benefits" />
                <Tab label="Stats & Gallery" />
              </Tabs>
            </Box>

            {/* Basic Info Tab */}
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Select Industry</InputLabel>
                    <Select
                      name="industryId"
                      value={formData.industryId}
                      onChange={handleInputChange}
                      disabled={editingDetail}
                    >
                      {industries.map((industry) => (
                        <MenuItem key={industry._id} value={industry._id}>
                          {industry.icon} {industry.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Page Title"
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
                    >
                      <MenuItem value="draft">Draft</MenuItem>
                      <MenuItem value="published">Published</MenuItem>
                      <MenuItem value="archived">Archived</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Core Services Tab */}
            <TabPanel value={tabValue} index={1}>
              <Box>
                <TextField
                  label="Section Title"
                  name="coreServices.title"
                  value={formData.coreServices.title}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 3 }}
                />

                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Core Services
                </Typography>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      size="small"
                      value={newCoreService.text}
                      onChange={(e) => setNewCoreService({ ...newCoreService, text: e.target.value })}
                      placeholder="Service text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      size="small"
                      value={newCoreService.icon}
                      onChange={(e) => setNewCoreService({ ...newCoreService, icon: e.target.value })}
                      placeholder="Icon (emoji)"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" onClick={addCoreService} fullWidth>
                      Add
                    </Button>
                  </Grid>
                </Grid>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleCoreServiceDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={formData.coreServices.items.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <List>
                      {formData.coreServices.items.map((item, index) => (
                        <SortableItem key={item.id} id={item.id}>
                          <ListItemText primary={`${item.icon} ${item.text}`} />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => removeCoreService(index)}>
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

            {/* Delivery Approach Tab */}
            <TabPanel value={tabValue} index={2}>
              <Box>
                <TextField
                  label="Section Title"
                  name="deliveryApproach.title"
                  value={formData.deliveryApproach.title}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 3 }}
                />

                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Delivery Approach
                </Typography>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      size="small"
                      value={newDeliveryItem.text}
                      onChange={(e) => setNewDeliveryItem({ ...newDeliveryItem, text: e.target.value })}
                      placeholder="Item text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      size="small"
                      value={newDeliveryItem.icon}
                      onChange={(e) => setNewDeliveryItem({ ...newDeliveryItem, icon: e.target.value })}
                      placeholder="Icon (emoji)"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" onClick={addDeliveryItem} fullWidth>
                      Add
                    </Button>
                  </Grid>
                </Grid>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDeliveryDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={formData.deliveryApproach.items.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <List>
                      {formData.deliveryApproach.items.map((item, index) => (
                        <SortableItem key={item.id} id={item.id}>
                          <ListItemText primary={`${item.icon} ${item.text}`} />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => removeDeliveryItem(index)}>
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

            {/* Deployment Locations Tab */}
            <TabPanel value={tabValue} index={3}>
              <Box>
                <TextField
                  label="Section Title"
                  name="deploymentLocations.title"
                  value={formData.deploymentLocations.title}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 3 }}
                />

                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Deployment Locations
                </Typography>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      size="small"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                      placeholder="Location name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      size="small"
                      value={newLocation.icon}
                      onChange={(e) => setNewLocation({ ...newLocation, icon: e.target.value })}
                      placeholder="Icon (emoji)"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" onClick={addLocation} fullWidth>
                      Add
                    </Button>
                  </Grid>
                </Grid>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleLocationDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={formData.deploymentLocations.items.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <List>
                      {formData.deploymentLocations.items.map((item, index) => (
                        <SortableItem key={item.id} id={item.id}>
                          <ListItemText primary={`${item.icon} ${item.name}`} />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => removeLocation(index)}>
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

            {/* Why Choose Us Tab */}
            <TabPanel value={tabValue} index={4}>
              <Box>
                <TextField
                  label="Section Title"
                  name="whyChooseUs.title"
                  value={formData.whyChooseUs.title}
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
                      value={newWhyFeature.text}
                      onChange={(e) => setNewWhyFeature({ ...newWhyFeature, text: e.target.value })}
                      placeholder="Feature text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      size="small"
                      value={newWhyFeature.icon}
                      onChange={(e) => setNewWhyFeature({ ...newWhyFeature, icon: e.target.value })}
                      placeholder="Icon (emoji)"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" onClick={addWhyFeature} fullWidth>
                      Add
                    </Button>
                  </Grid>
                </Grid>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleWhyFeatureDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={formData.whyChooseUs.features.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <List>
                      {formData.whyChooseUs.features.map((item, index) => (
                        <SortableItem key={item.id} id={item.id}>
                          <ListItemText primary={`${item.icon} ${item.text}`} />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => removeWhyFeature(index)}>
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

            {/* Challenges Tab */}
            <TabPanel value={tabValue} index={5}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Add Challenge
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    value={newChallenge.title}
                    onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                    placeholder="Title"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    size="small"
                    value={newChallenge.icon}
                    onChange={(e) => setNewChallenge({ ...newChallenge, icon: e.target.value })}
                    placeholder="Icon"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    size="small"
                    value={newChallenge.description}
                    onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                    placeholder="Description"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button variant="outlined" onClick={addChallenge} fullWidth>
                    Add
                  </Button>
                </Grid>
              </Grid>
              <List>
                {formData.challenges.map((item, index) => (
                  <ListItem key={item.id || index}>
                    <ListItemText 
                      primary={`${item.icon} ${item.title}`}
                      secondary={item.description}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => removeChallenge(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </TabPanel>

            {/* Solutions Tab */}
            <TabPanel value={tabValue} index={6}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Add Solution Category
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={3}>
                  <TextField
                    size="small"
                    value={newSolution.title}
                    onChange={(e) => setNewSolution({ ...newSolution, title: e.target.value })}
                    placeholder="Title"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    size="small"
                    value={newSolution.icon}
                    onChange={(e) => setNewSolution({ ...newSolution, icon: e.target.value })}
                    placeholder="Icon"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    size="small"
                    value={newSolution.description}
                    onChange={(e) => setNewSolution({ ...newSolution, description: e.target.value })}
                    placeholder="Description"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button variant="outlined" onClick={addSolution} fullWidth>
                    Add
                  </Button>
                </Grid>
              </Grid>
              <List>
                {formData.solutions.map((solution, solIndex) => (
                  <Paper key={solution.id || solIndex} sx={{ p: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1">
                        {solution.icon} {solution.title}
                      </Typography>
                      <IconButton size="small" onClick={() => removeSolution(solIndex)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {solution.description}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <TextField
                        size="small"
                        value={newSolutionItem}
                        onChange={(e) => setNewSolutionItem(e.target.value)}
                        placeholder="Add specific solution"
                        fullWidth
                      />
                      <Button variant="outlined" onClick={() => addSolutionItem(solIndex)}>
                        Add
                      </Button>
                    </Box>
                    <List dense>
                      {(solution.solutions || []).map((item, itemIndex) => (
                        <ListItem key={itemIndex}>
                          <ListItemText primary={item} />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => removeSolutionItem(solIndex, itemIndex)}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                ))}
              </List>
            </TabPanel>

            {/* Technologies Tab */}
            <TabPanel value={tabValue} index={7}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Add Technology
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    size="small"
                    value={newTechnology.name}
                    onChange={(e) => setNewTechnology({ ...newTechnology, name: e.target.value })}
                    placeholder="Technology name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    value={newTechnology.icon}
                    onChange={(e) => setNewTechnology({ ...newTechnology, icon: e.target.value })}
                    placeholder="Icon"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button variant="outlined" onClick={addTechnology} fullWidth>
                    Add
                  </Button>
                </Grid>
              </Grid>
              <List>
                {formData.technologies.map((item, index) => (
                  <ListItem key={item.id || index}>
                    <ListItemText primary={`${item.icon} ${item.name}`} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => removeTechnology(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </TabPanel>

            {/* Benefits Tab */}
            <TabPanel value={tabValue} index={8}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Add Benefit
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    value={newBenefit.title}
                    onChange={(e) => setNewBenefit({ ...newBenefit, title: e.target.value })}
                    placeholder="Title"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    size="small"
                    value={newBenefit.icon}
                    onChange={(e) => setNewBenefit({ ...newBenefit, icon: e.target.value })}
                    placeholder="Icon"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    value={newBenefit.description}
                    onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value })}
                    placeholder="Description"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button variant="outlined" onClick={addBenefit} fullWidth>
                    Add
                  </Button>
                </Grid>
              </Grid>
              <List>
                {formData.benefits.map((item, index) => (
                  <ListItem key={item.id || index}>
                    <ListItemText 
                      primary={`${item.icon} ${item.title}`}
                      secondary={item.description}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => removeBenefit(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </TabPanel>

            {/* Stats & Gallery Tab */}
            <TabPanel value={tabValue} index={9}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Statistics</Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Projects"
                    name="stats.projects"
                    type="number"
                    value={formData.stats.projects}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Clients"
                    name="stats.clients"
                    type="number"
                    value={formData.stats.clients}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Experience"
                    name="stats.experience"
                    value={formData.stats.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 15+ Years"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Gallery</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                      <TextField
                        size="small"
                        value={newGalleryItem.imageUrl}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, imageUrl: e.target.value })}
                        placeholder="Image URL"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        size="small"
                        value={newGalleryItem.caption}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, caption: e.target.value })}
                        placeholder="Caption"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button variant="outlined" onClick={addGalleryItem} fullWidth>
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                  <List>
                    {formData.gallery.map((item, index) => (
                      <ListItem key={item.id || index}>
                        <ListItemText 
                          primary={item.caption || 'No caption'}
                          secondary={item.imageUrl}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" onClick={() => removeGalleryItem(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </TabPanel>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#2563eb' }}>
              {editingDetail ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default IndustryDetailsManager;