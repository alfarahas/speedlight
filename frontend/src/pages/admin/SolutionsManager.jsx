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
  Alert,
  Tooltip,
  TablePagination,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
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
    collaboration: { bg: '#dbeafe', color: '#2563eb' },
    audio: { bg: '#dcfce7', color: '#16a34a' },
    display: { bg: '#fff7ed', color: '#ea580c' },
    networking: { bg: '#fae8ff', color: '#9333ea' },
    control: { bg: '#fee2e2', color: '#dc2626' },
    support: { bg: '#cffafe', color: '#0891b2' },
  };
  const color = colors[category] || colors.collaboration;
  return {
    backgroundColor: color.bg,
    color: color.color,
    fontWeight: 600,
  };
});

const SolutionsManager = () => {
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
    category: 'collaboration',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/solutions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSolutions(response.data);
    } catch (error) {
      console.error('Error fetching solutions:', error);
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
      category: 'collaboration',
      order: solutions.length,
      isActive: true
    });
    setShowModal(true);
  };

  const openEditModal = (solution) => {
    setEditingSolution(solution);
    setFormData({
      title: solution.title,
      description: solution.description,
      icon: solution.icon,
      category: solution.category,
      order: solution.order,
      isActive: solution.isActive
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      if (editingSolution) {
        await axios.put(`${API_URL}/solutions/${editingSolution._id}`, formData, { headers });
      } else {
        await axios.post(`${API_URL}/solutions`, formData, { headers });
      }

      fetchSolutions();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving solution:', error);
      alert('Error saving solution');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this solution?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/solutions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSolutions();
    } catch (error) {
      console.error('Error deleting solution:', error);
      alert('Error deleting solution');
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress sx={{ color: '#2563eb' }} />
      </Box>
    );
  }

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
            {solutions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((solution) => (
                <TableRow key={solution._id} hover>
                  <TableCell sx={{ fontSize: '1.5rem' }}>{solution.icon}</TableCell>
                  <TableCell>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {solution.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', maxWidth: 300 }}>
                      {solution.description.substring(0, 60)}...
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <CategoryChip 
                      label={solution.category} 
                      category={solution.category}
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
                  <TableCell>{solution.order}</TableCell>
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
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={solutions.length}
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