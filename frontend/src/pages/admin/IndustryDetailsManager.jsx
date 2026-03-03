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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

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

const IndustryDetailsManager = () => {
  const [industries, setIndustries] = useState([]);
  const [industryDetails, setIndustryDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDetail, setEditingDetail] = useState(null);
  const [formData, setFormData] = useState({
    industryId: '',
    overview: '',
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
    isActive: true
  });

  const [newChallenge, setNewChallenge] = useState({ title: '', description: '', icon: '' });
  const [newSolution, setNewSolution] = useState({ title: '', description: '', icon: '', solutions: [] });
  const [newSolutionItem, setNewSolutionItem] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [industriesRes, detailsRes] = await Promise.all([
        axios.get(`${API_URL}/industries`, { headers }),
        axios.get(`${API_URL}/industry-details`, { headers })
      ]);

      setIndustries(industriesRes.data);
      setIndustryDetails(detailsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('stats.')) {
      const statName = name.split('.')[1];
      setFormData({
        ...formData,
        stats: { ...formData.stats, [statName]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addChallenge = () => {
    if (newChallenge.title) {
      setFormData({
        ...formData,
        challenges: [...formData.challenges, newChallenge]
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

  const addSolution = () => {
    if (newSolution.title) {
      setFormData({
        ...formData,
        solutions: [...formData.solutions, newSolution]
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

  const openCreateModal = () => {
    setEditingDetail(null);
    setFormData({
      industryId: '',
      overview: '',
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
      isActive: true
    });
    setShowModal(true);
  };

  const openEditModal = (detail) => {
    setEditingDetail(detail);
    setFormData({
      industryId: detail.industryId._id,
      overview: detail.overview,
      challenges: detail.challenges || [],
      solutions: detail.solutions || [],
      technologies: detail.technologies || [],
      benefits: detail.benefits || [],
      featuredSolutions: detail.featuredSolutions || [],
      stats: detail.stats || { projects: 0, clients: 0, experience: '' },
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
        await axios.put(`${API_URL}/industry-details/${editingDetail._id}`, formData, { headers });
      } else {
        await axios.post(`${API_URL}/industry-details`, formData, { headers });
      }

      fetchData();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving industry details:', error);
      alert(error.response?.data?.error || 'Error saving industry details');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete these industry details?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/industry-details/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting industry details:', error);
      alert('Error deleting industry details');
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
          Manage Industry Details
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
                  <Avatar sx={{ bgcolor: '#2563eb' }}>
                    {detail.industryId?.icon || '🏢'}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {detail.industryId?.name}
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
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {detail.overview.substring(0, 100)}...
                </Typography>

                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Challenges: {detail.challenges?.length || 0} | 
                  Solutions: {detail.solutions?.length || 0}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
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

      {/* Create/Edit Modal - Similar to SolutionDetailsManager but for industries */}
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        maxWidth="lg"
        fullWidth
        scroll="paper"
      >
        <DialogTitle>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {editingDetail ? 'Edit Industry Details' : 'Add Industry Details'}
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Select Industry</InputLabel>
                <Select
                  name="industryId"
                  value={formData.industryId}
                  onChange={handleInputChange}
                  required
                  disabled={editingDetail}
                >
                  {industries.map((industry) => (
                    <MenuItem key={industry._id} value={industry._id}>
                      {industry.icon} {industry.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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

              <Typography variant="h6">Statistics</Typography>
              <Grid container spacing={2}>
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
              </Grid>

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
          </DialogContent>
          <DialogActions>
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