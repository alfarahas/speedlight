import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchSolutions } from '../../services/api';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  backgroundColor: '#f8fafc',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
    '& .view-details': {
      color: '#2563eb',
      transform: 'translateX(8px)',
    },
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: '3rem',
  marginBottom: theme.spacing(2),
}));

const ViewDetailsButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  color: '#64748b',
  transition: 'all 0.2s ease',
  fontWeight: 500,
  '& svg': {
    marginLeft: theme.spacing(0.5),
    transition: 'transform 0.2s ease',
  },
}));

const SolutionsList = ({ limit }) => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSolutions();
  }, []);

  const loadSolutions = async () => {
    try {
      setLoading(true);
      const data = await fetchSolutions();
      console.log('Fetched solutions:', data); // Debug log
      const solutionsData = limit ? data.slice(0, limit) : data;
      setSolutions(solutionsData);
      setError(null);
    } catch (err) {
      setError('Failed to load solutions. Please try again later.');
      console.error('Error loading solutions:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress sx={{ color: '#2563eb' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Alert severity="error" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={loadSolutions}
          sx={{ bgcolor: '#2563eb' }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  if (!solutions || solutions.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="body1" color="text.secondary">
          No solutions available at the moment.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {solutions.map((solution) => (
        <Grid item xs={12} sm={6} md={limit ? 6 : 4} key={solution._id || solution.id}>
          <Link 
            to={`/solution/${solution._id || solution.id}`} 
            style={{ textDecoration: 'none', display: 'block', height: '100%' }}
          >
            <StyledCard elevation={2}>
              <CardContent sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <IconWrapper>{solution.icon || '🔹'}</IconWrapper>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    color: '#0f172a',
                    fontSize: '1.25rem',
                  }}
                >
                  {solution.title || solution.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    mb: 2,
                    flex: 1,
                    lineHeight: 1.6,
                  }}
                >
                  {solution.description}
                </Typography>
                <ViewDetailsButton className="view-details">
                  <span>View Details</span>
                  <ArrowForwardIcon fontSize="small" />
                </ViewDetailsButton>
              </CardContent>
            </StyledCard>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default SolutionsList;