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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const SolutionDetailsManager = () => {
  const [solutions, setSolutions] = useState([]);
  const [solutionDetails, setSolutionDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDetail, setEditingDetail] = useState(null);
  const [selectedSolution, setSelectedSolution] = useState('');
  const [formData, setFormData] = useState({
    solutionId: '',
    overview: '',
    keyFeatures: [],
    technologies: [],
    benefits: [],
    useCases: [],
    relatedSolutions: [],
    gallery: [],
    specifications: [],
    isActive: true
  });
  const [newFeature, setNewFeature] = useState('');
  const [newTechnology, setNewTechnology] = useState({ name: '', icon: '' });
  const [newBenefit, setNewBenefit] = useState({ title: '', description: '', icon: '' });
  const [newSpec, setNewSpec] = useState({ name: '', value: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [solutionsRes, detailsRes] = await Promise.all([
        axios.get(`${API_URL}/solutions`, { headers }),
        axios.get(`${API_URL}/solution-details`, { headers })
      ]);

      setSolutions(solutionsRes.data);
      setSolutionDetails(detailsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addKeyFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        keyFeatures: [...formData.keyFeatures, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const removeKeyFeature = (index) => {
    setFormData({
      ...formData,
      keyFeatures: formData.keyFeatures.filter((_, i) => i !== index)
    });
  };

  const addTechnology = () => {
    if (newTechnology.name) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTechnology]
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

  const addBenefit = () => {
    if (newBenefit.title) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, newBenefit]
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

  const addSpecification = () => {
    if (newSpec.name && newSpec.value) {
      setFormData({
        ...formData,
        specifications: [...formData.specifications, newSpec]
      });
      setNewSpec({ name: '', value: '' });
    }
  };

  const removeSpecification = (index) => {
    setFormData({
      ...formData,
      specifications: formData.specifications.filter((_, i) => i !== index)
    });
  };

  const openCreateModal = () => {
    setEditingDetail(null);
    setFormData({
      solutionId: '',
      overview: '',
      keyFeatures: [],
      technologies: [],
      benefits: [],
      useCases: [],
      relatedSolutions: [],
      gallery: [],
      specifications: [],
      isActive: true
    });
    setShowModal(true);
  };

  const openEditModal = (detail) => {
    setEditingDetail(detail);
    setFormData({
      solutionId: detail.solutionId._id,
      overview: detail.overview,
      keyFeatures: detail.keyFeatures || [],
      technologies: detail.technologies || [],
      benefits: detail.benefits || [],
      useCases: detail.useCases || [],
      relatedSolutions: detail.relatedSolutions.map(s => s._id),
      gallery: detail.gallery || [],
      specifications: detail.specifications || [],
      isActive: detail.isActive
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      if (editingDetail) {
        await axios.put(`${API_URL}/solution-details/${editingDetail._id}`, formData, { headers });
      } else {
        await axios.post(`${API_URL}/solution-details`, formData, { headers });
      }

      fetchData();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving solution details:', error);
      alert(error.response?.data?.error || 'Error saving solution details');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete these solution details?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/solution-details/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting solution details:', error);
      alert('Error deleting solution details');
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
          Manage Solution Details
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
                  <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                    {detail.solutionId?.title}
                  </Typography>
                  <Chip
                    label={detail.isActive ? 'Active' : 'Inactive'}
                    size="small"
                    sx={{
                      bgcolor: detail.isActive ? '#dcfce7' : '#f1f5f9',
                      color: detail.isActive ? '#16a34a' : '#64748b',
                    }}
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {detail.overview.substring(0, 100)}...
                </Typography>

                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Key Features: {detail.keyFeatures?.length || 0}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Technologies: {detail.technologies?.length || 0}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Benefits: {detail.benefits?.length || 0}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                <IconButton onClick={() => openEditModal(detail)} sx={{ color: '#2563eb' }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(detail._id)} sx={{ color: '#ef4444' }}>
                  <DeleteIcon />
                </IconButton>
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
            {editingDetail ? 'Edit Solution Details' : 'Add Solution Details'}
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Solution Selection */}
              <FormControl fullWidth>
                <InputLabel>Select Solution</InputLabel>
                <Select
                  name="solutionId"
                  value={formData.solutionId}
                  onChange={handleInputChange}
                  required
                  label="Select Solution"
                  disabled={editingDetail}
                >
                  {solutions.map((solution) => (
                    <MenuItem key={solution._id} value={solution._id}>
                      {solution.icon} {solution.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Overview */}
              <TextField
                label="Overview"
                name="overview"
                value={formData.overview}
                onChange={handleInputChange}
                required
                multiline
                rows={4}
                fullWidth
              />

              {/* Key Features */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Key Features
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    size="small"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Enter feature"
                    fullWidth
                    onKeyPress={(e) => e.key === 'Enter' && addKeyFeature()}
                  />
                  <Button variant="outlined" onClick={addKeyFeature}>
                    Add
                  </Button>
                </Box>
                <List>
                  {formData.keyFeatures.map((feature, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={feature} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => removeKeyFeature(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Technologies */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Technologies
                </Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={5}>
                    <TextField
                      size="small"
                      value={newTechnology.name}
                      onChange={(e) => setNewTechnology({ ...newTechnology, name: e.target.value })}
                      placeholder="Technology name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      size="small"
                      value={newTechnology.icon}
                      onChange={(e) => setNewTechnology({ ...newTechnology, icon: e.target.value })}
                      placeholder="Icon (emoji)"
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
                  {formData.technologies.map((tech, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`${tech.icon} ${tech.name}`} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => removeTechnology(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Benefits */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Benefits
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
                    <TextField
                      size="small"
                      value={newBenefit.icon}
                      onChange={(e) => setNewBenefit({ ...newBenefit, icon: e.target.value })}
                      placeholder="Icon"
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
                  {formData.benefits.map((benefit, index) => (
                    <ListItem key={index}>
                      <ListItemText 
                        primary={`${benefit.icon} ${benefit.title}`}
                        secondary={benefit.description}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => removeBenefit(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Specifications */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Specifications
                </Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={5}>
                    <TextField
                      size="small"
                      value={newSpec.name}
                      onChange={(e) => setNewSpec({ ...newSpec, name: e.target.value })}
                      placeholder="Specification name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      size="small"
                      value={newSpec.value}
                      onChange={(e) => setNewSpec({ ...newSpec, value: e.target.value })}
                      placeholder="Value"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" onClick={addSpecification} fullWidth>
                      Add
                    </Button>
                  </Grid>
                </Grid>
                <List>
                  {formData.specifications.map((spec, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={`${spec.name}: ${spec.value}`} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => removeSpecification(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Active Status */}
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                  }
                  label="Active"
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setShowModal(false)} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: '#2563eb' }}>
              {editingDetail ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default SolutionDetailsManager;