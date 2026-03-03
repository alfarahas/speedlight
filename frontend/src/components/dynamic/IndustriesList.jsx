import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchIndustries } from '../../services/api';

const IndustryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateX(8px)',
    backgroundColor: '#f1f5f9',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  },
}));

const IndustriesList = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    loadIndustries();
  }, []);

  const loadIndustries = async () => {
    try {
      setLoading(true);
      const data = await fetchIndustries();
      console.log('Fetched industries:', data); // Debug log
      setIndustries(data);
      setError(null);
    } catch (err) {
      setError('Failed to load industries. Please try again later.');
      console.error('Error loading industries:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress sx={{ color: '#2563eb' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={loadIndustries} sx={{ bgcolor: '#2563eb' }}>
          Try Again
        </Button>
      </Box>
    );
  }

  if (!industries || industries.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          No industries available at the moment.
        </Typography>
      </Box>
    );
  }

  // Split industries into two columns for better display
  const midPoint = Math.ceil(industries.length / 2);
  const firstColumn = industries.slice(0, midPoint);
  const secondColumn = industries.slice(midPoint);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {firstColumn.map((industry) => (
            <Link 
              key={industry._id || industry.id} 
              to={`/industry/${industry._id || industry.id}`}
              style={{ textDecoration: 'none' }}
            >
              <IndustryCard elevation={1}>
                <Typography variant="h3" sx={{ fontSize: '2rem' }}>
                  {industry.icon || '🏢'}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#0f172a' }}>
                  {industry.title || industry.name}
                </Typography>
              </IndustryCard>
            </Link>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {secondColumn.map((industry) => (
            <Link 
              key={industry._id || industry.id} 
              to={`/industry/${industry._id || industry.id}`}
              style={{ textDecoration: 'none' }}
            >
              <IndustryCard elevation={1}>
                <Typography variant="h3" sx={{ fontSize: '2rem' }}>
                  {industry.icon || '🏢'}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#0f172a' }}>
                  {industry.title || industry.name}
                </Typography>
              </IndustryCard>
            </Link>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default IndustriesList;