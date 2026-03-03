import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Breadcrumbs,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  ArrowForward as ArrowForwardIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const HeroSection = styled(Box)(({ theme }) => ({
  background: '#0f172a',
  color: 'white',
  padding: theme.spacing(8, 0),
  position: 'relative',
  overflow: 'hidden',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
  },
}));

const BenefitCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  textAlign: 'center',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: '#f8fafc',
  },
}));

const SolutionDetail = () => {
  const { id } = useParams();
  const [solution, setSolution] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch main solution
      const solutionRes = await axios.get(`${API_URL}/public/solutions`);
      const foundSolution = solutionRes.data.find(s => s._id === id);
      
      if (!foundSolution) {
        setError('Solution not found');
        return;
      }
      
      setSolution(foundSolution);

      // Fetch solution details
      try {
        const detailsRes = await axios.get(`${API_URL}/public/solution-details/${id}`);
        setDetails(detailsRes.data);
      } catch (err) {
        // If no details found, that's okay - we'll show only basic info
        console.log('No additional details found');
      }

      setError(null);
    } catch (err) {
      setError('Failed to load solution details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#2563eb' }} />
      </Box>
    );
  }

  if (error || !solution) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">{error || 'Solution not found'}</Alert>
      </Container>
    );
  }

  return (
    <Box>
      {/* Breadcrumbs */}
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" style={{ textDecoration: 'none', color: '#64748b' }}>
            <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
            Home
          </Link>
          <Link to="/our-solutions" style={{ textDecoration: 'none', color: '#64748b' }}>
            Solutions
          </Link>
          <Typography color="#2563eb">{solution.title}</Typography>
        </Breadcrumbs>
      </Container>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, color: 'white' }}>
                {solution.icon} {solution.title}
              </Typography>
              <Typography variant="h5" sx={{ color: '#94a3b8', mb: 3 }}>
                {solution.description}
              </Typography>
              <Button
                component={Link}
                to="/get-started"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: '#2563eb',
                  '&:hover': { bgcolor: '#1d4ed8' },
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                }}
              >
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Overview Section */}
      {details?.overview && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Paper elevation={0} sx={{ p: 4, bgcolor: '#f8fafc', borderRadius: '24px' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#0f172a' }}>
              Overview
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#1e293b' }}>
              {details.overview}
            </Typography>
          </Paper>
        </Container>
      )}

      {/* Key Features */}
      {details?.keyFeatures && details.keyFeatures.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 8, bgcolor: '#f8fafc' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', color: '#0f172a' }}>
            Key Features
          </Typography>
          <Grid container spacing={3}>
            {details.keyFeatures.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FeatureCard>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <CheckIcon sx={{ color: '#2563eb', fontSize: 24 }} />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {feature}
                      </Typography>
                    </Box>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* Technologies */}
      {details?.technologies && details.technologies.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', color: '#0f172a' }}>
            Technologies We Use
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {details.technologies.map((tech, index) => (
              <Grid item key={index}>
                <Chip
                  icon={<span style={{ fontSize: '1.2rem' }}>{tech.icon}</span>}
                  label={tech.name}
                  sx={{
                    bgcolor: '#f1f5f9',
                    fontSize: '1rem',
                    py: 2,
                    px: 1,
                    '& .MuiChip-icon': { ml: 1 },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* Benefits */}
      {details?.benefits && details.benefits.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 8, bgcolor: '#f8fafc' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', color: '#0f172a' }}>
            Benefits
          </Typography>
          <Grid container spacing={4}>
            {details.benefits.map((benefit, index) => (
              <Grid item xs={12} md={4} key={index}>
                <BenefitCard elevation={2}>
                  <Typography variant="h2" sx={{ fontSize: '3rem', mb: 2 }}>
                    {benefit.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </BenefitCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* Specifications */}
      {details?.specifications && details.specifications.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', color: '#0f172a' }}>
            Specifications
          </Typography>
          <Paper elevation={0} sx={{ p: 4, bgcolor: '#f8fafc', borderRadius: '16px' }}>
            <Grid container spacing={2}>
              {details.specifications.map((spec, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {spec.name}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {spec.value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      )}

      {/* CTA Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            bgcolor: '#0f172a',
            borderRadius: '32px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: 'white' }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" sx={{ color: '#94a3b8', mb: 4, fontSize: '1.2rem' }}>
            Let us help you implement the perfect {solution.title} solution for your organization
          </Typography>
          <Button
            component={Link}
            to="/get-started"
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#2563eb',
              '&:hover': { bgcolor: '#1d4ed8' },
              borderRadius: '12px',
              px: 6,
              py: 2,
              fontSize: '1.1rem',
            }}
          >
            Contact Us Today
            <ArrowForwardIcon sx={{ ml: 1 }} />
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default SolutionDetail;