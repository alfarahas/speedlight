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
  Paper,
  Breadcrumbs,
  Button,
  CircularProgress,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fade,
  Grow,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  ArrowForward as ArrowForwardIcon,
  Home as HomeIcon,
  Build as BuildIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { fetchSolutions, fetchSolutionDetails } from '../services/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const HeroSection = styled(Box)(({ theme }) => ({
  background: '#0f172a',
  color: 'white',
  padding: theme.spacing(8, 0),
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, transparent 100%)',
    zIndex: 1,
  },
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
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  color: '#0f172a',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 60,
    height: 4,
    backgroundColor: '#2563eb',
    borderRadius: 2,
  },
}));

const SolutionDetail = () => {
  const { id } = useParams();
  const [solution, setSolution] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Fetch main solution
      const solutions = await fetchSolutions();
      const foundSolution = solutions.find(s => (s._id || s.id) === id);
      
      if (!foundSolution) {
        setError('Solution not found');
        return;
      }
      
      setSolution(foundSolution);

      // Fetch solution details from backend
      try {
        const detailsData = await fetchSolutionDetails(id);
        if (detailsData) {
          setDetails(detailsData);
          console.log('Solution details loaded:', detailsData);
        } else {
          console.log('No details found for this solution');
        }
      } catch (err) {
        console.error('Error fetching solution details:', err);
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
        <Button
          component={Link}
          to="/our-solutions"
          variant="contained"
          sx={{ mt: 3, bgcolor: '#2563eb' }}
        >
          Back to Solutions
        </Button>
      </Container>
    );
  }

  // Use details from backend if available, otherwise show message
  const hasDetails = details && Object.keys(details).length > 0;

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Breadcrumbs */}
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" style={{ textDecoration: 'none', color: '#64748b', display: 'flex', alignItems: 'center' }}>
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
              <Typography variant="h1" sx={{ 
                fontWeight: 700, 
                mb: 2, 
                color: 'white', 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}>
                <span style={{ fontSize: '4rem' }}>{solution.icon || '🔹'}</span>
                {solution.title}
              </Typography>
              <Typography variant="h6" sx={{ color: '#94a3b8', mb: 3, maxWidth: '800px' }}>
                {solution.description}
              </Typography>
              <Button
                component={Link}
                to="/get-started"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: '#2563eb',
                  '&:hover': { bgcolor: '#1d4ed8' },
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                }}
              >
                Get Started with This Solution
              </Button>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Show message if no details available */}
      {!hasDetails && (
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Alert severity="info" sx={{ borderRadius: '12px' }}>
            Detailed information for this solution is being added. Please check back soon or contact us for more details.
          </Alert>
        </Container>
      )}

      {/* Overview Section - Only show if available */}
      {hasDetails && details.overview && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, bgcolor: '#f8fafc', borderRadius: '24px' }}>
            <SectionTitle variant="h3">Overview</SectionTitle>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#1e293b' }}>
              {details.overview}
            </Typography>
          </Paper>
        </Container>
      )}

      {/* Key Features - Only show if available */}
      {hasDetails && details.keyFeatures && details.keyFeatures.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 8, bgcolor: '#f8fafc' }}>
          <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            Key Features
          </SectionTitle>
          <Grid container spacing={3}>
            {details.keyFeatures.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Grow in={true} timeout={500 + index * 100}>
                  <FeatureCard>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <CheckIcon sx={{ color: '#2563eb', fontSize: 24 }} />
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {typeof feature === 'string' ? feature : feature.title || feature}
                        </Typography>
                      </Box>
                    </CardContent>
                  </FeatureCard>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* Technologies - Only show if available */}
      {hasDetails && details.technologies && details.technologies.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            Technologies We Use
          </SectionTitle>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mt: 4 }}>
            {details.technologies.map((tech, index) => (
              <Chip
                key={index}
                icon={<span style={{ fontSize: '1.2rem' }}>{tech.icon || '🔹'}</span>}
                label={tech.name || tech}
                sx={{
                  bgcolor: '#f1f5f9',
                  fontSize: '1rem',
                  py: 3,
                  px: 2,
                  '& .MuiChip-icon': { ml: 1 },
                  '&:hover': {
                    bgcolor: '#2563eb',
                    color: 'white',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </Box>
        </Container>
      )}

      {/* Benefits - Only show if available */}
      {hasDetails && details.benefits && details.benefits.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 8, bgcolor: '#f8fafc' }}>
          <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            Benefits
          </SectionTitle>
          <Grid container spacing={4}>
            {details.benefits.map((benefit, index) => (
              <Grid item xs={12} md={4} key={index}>
                <BenefitCard elevation={2}>
                  <Avatar sx={{ bgcolor: '#2563eb', width: 64, height: 64, mb: 2, mx: 'auto' }}>
                    <Typography variant="h4">{benefit.icon || '✨'}</Typography>
                  </Avatar>
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

      {/* Specifications - Only show if available */}
      {hasDetails && details.specifications && details.specifications.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <SectionTitle variant="h3">Specifications</SectionTitle>
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
            p: { xs: 4, md: 8 },
            bgcolor: '#0f172a',
            borderRadius: '32px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            mb: 3, 
            color: 'white', 
            fontSize: { xs: '1.75rem', md: '2.5rem' } 
          }}>
            Ready to Implement {solution.title}?
          </Typography>
          <Typography variant="body1" sx={{ color: '#94a3b8', mb: 4, fontSize: '1.2rem', maxWidth: '800px', mx: 'auto' }}>
            Let us help you transform your organization with our cutting-edge solutions
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/contact-us"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: '#2563eb',
                '&:hover': { bgcolor: '#1d4ed8' },
                borderRadius: '12px',
                px: 4,
                py: 1.5,
              }}
            >
              Contact Us Today
            </Button>
            <Button
              component={Link}
              to="/get-started"
              variant="outlined"
              size="large"
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: '#2563eb',
                  bgcolor: 'rgba(37,99,235,0.1)',
                },
                borderRadius: '12px',
                px: 4,
                py: 1.5,
              }}
            >
              Get Started
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SolutionDetail;