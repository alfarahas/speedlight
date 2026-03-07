import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  CircularProgress,
  Tooltip,
  TablePagination,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  backgroundColor: '#f8fafc',
}));

const CategoryChip = styled(Chip)(({ theme, category }) => {
  const colors = {
    'Workplace Collaboration & Video Conferencing': { bg: '#dbeafe', color: '#2563eb' },
    'Integrated Professional Sound Systems': { bg: '#dcfce7', color: '#16a34a' },
    'Display & Visualization Solutions': { bg: '#fff7ed', color: '#ea580c' },
    'Enterprise Networking & Connectivity': { bg: '#fae8ff', color: '#9333ea' },
    'Intelligent Systems & Control Platforms': { bg: '#fee2e2', color: '#dc2626' },
    'System Lifecycle & Support Solutions': { bg: '#cffafe', color: '#0891b2' },
  };
  const color = colors[category] || { bg: '#dbeafe', color: '#2563eb' };
  return {
    backgroundColor: color.bg,
    color: color.color,
    fontWeight: 600,
  };
});

const SolutionsManager = () => {
  // Initialize all state with proper default values
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSolution, setEditingSolution] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '🔹',
    category: 'Workplace Collaboration & Video Conferencing',
    order: 0,
    isActive: true
  });

  // Fetch solutions on component mount
  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        setSolutions([]);
        return;
      }

      const response = await axios.get(`${API_URL}/api/solutions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Ensure response.data is an array
      const solutionsData = Array.isArray(response.data) ? response.data : 
                           (response.data && response.data.data && Array.isArray(response.data.data)) ? response.data.data :
                           [];
      
      console.log('Fetched solutions:', solutionsData); // Debug log
      setSolutions(solutionsData);
    } catch (error) {
      console.error('Error fetching solutions:', error);
      setSolutions([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const openCreateModal = () => {
    setEditingSolution(null);
    setFormData({
      title: '',
      description: '',
      icon: '🔹',
      category: 'Workplace Collaboration & Video Conferencing',
      order: Array.isArray(solutions) ? solutions.length : 0,
      isActive: true
    });
    setShowModal(true);
  };

  const openEditModal = (solution) => {
    setEditingSolution(solution);
    setFormData({
      title: solution.title || '',
      description: solution.description || '',
      icon: solution.icon || '🔹',
      category: solution.category || 'Workplace Collaboration & Video Conferencing',
      order: solution.order || 0,
      isActive: solution.isActive !== undefined ? solution.isActive : true
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No authentication token found');
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      if (editingSolution) {
        await axios.put(`${API_URL}/api/solutions/${editingSolution._id}`, formData, { headers });
      } else {
        await axios.post(`${API_URL}/api/solutions`, formData, { headers });
      }

      await fetchSolutions();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving solution:', error);
      alert(error.response?.data?.error || 'Error saving solution');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this solution?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No authentication token found');
        return;
      }

      await axios.delete(`${API_URL}/api/solutions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      await fetchSolutions();
    } catch (error) {
      console.error('Error deleting solution:', error);
      alert(error.response?.data?.error || 'Error deleting solution');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const categoryOptions = [
    { value: 'Workplace Collaboration & Video Conferencing', label: 'Workplace Collaboration & Video Conferencing' },
    { value: 'Integrated Professional Sound Systems', label: 'Integrated Professional Sound Systems' },
    { value: 'Display & Visualization Solutions', label: 'Display & Visualization Solutions' },
    { value: 'Enterprise Networking & Connectivity', label: 'Enterprise Networking & Connectivity' },
    { value: 'Intelligent Systems & Control Platforms', label: 'Intelligent Systems & Control Platforms' },
    { value: 'System Lifecycle & Support Solutions', label: 'System Lifecycle & Support Solutions' },
  ];

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress sx={{ color: '#2563eb' }} />
      </Box>
    );
  }

  // Safe array check before rendering
  const safeSolutions = Array.isArray(solutions) ? solutions : [];
  const paginatedSolutions = safeSolutions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a' }}>
          Manage Solutions
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
            px: 3,
            py: 1,
          }}
        >
          Add New Solution
        </Button>
      </Box>

      {/* Solutions Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Icon</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Order</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSolutions.length > 0 ? (
              paginatedSolutions.map((solution) => (
                <TableRow key={solution._id || Math.random()} hover>
                  <TableCell sx={{ fontSize: '1.5rem' }}>{solution.icon || '🔹'}</TableCell>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {solution.title || 'Untitled'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', maxWidth: 300 }}>
                      {solution.description ? solution.description.substring(0, 60) + '...' : 'No description'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <CategoryChip 
                      label={solution.category || 'Workplace Collaboration & Video Conferencing'} 
                      category={solution.category || 'Workplace Collaboration & Video Conferencing'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={solution.isActive ? 'Active' : 'Inactive'}
                      size="small"
                      sx={{
                        bgcolor: solution.isActive ? '#dcfce7' : '#f1f5f9',
                        color: solution.isActive ? '#16a34a' : '#64748b',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>{solution.order || 0}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => openEditModal(solution)}
                        sx={{ color: '#2563eb', mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDelete(solution._id)}
                        sx={{ color: '#ef4444' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No solutions found. Click "Add New Solution" to create one.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={safeSolutions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Create/Edit Modal */}
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '24px',
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a' }}>
            {editingSolution ? 'Edit Solution' : 'Add New Solution'}
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                fullWidth
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />

              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />

              <TextField
                label="Icon (emoji)"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                placeholder="🔹"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />

              <TextField
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Display Order"
                name="order"
                type="number"
                value={formData.order}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />

              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#2563eb',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#2563eb',
                      },
                    }}
                  />
                }
                label="Active"
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button
              onClick={() => setShowModal(false)}
              variant="outlined"
              sx={{
                borderRadius: '10px',
                textTransform: 'none',
                px: 3,
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#2563eb',
                borderRadius: '10px',
                textTransform: 'none',
                px: 3,
                '&:hover': { bgcolor: '#1d4ed8' },
              }}
            >
              {editingSolution ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default SolutionsManager;