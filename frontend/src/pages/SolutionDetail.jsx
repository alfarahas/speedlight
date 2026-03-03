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
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  ArrowForward as ArrowForwardIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { fetchSolutions } from '../services/api';

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

const SolutionDetail = () => {
  const { id } = useParams();
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSolution();
  }, [id]);

  const loadSolution = async () => {
    try {
      setLoading(true);
      const solutions = await fetchSolutions();
      const foundSolution = solutions.find(s => (s._id || s.id) === id);
      
      if (foundSolution) {
        setSolution(foundSolution);
        setError(null);
      } else {
        setError('Solution not found');
      }
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

  // Mock additional details (in real app, these would come from backend)
  const details = {
    overview: `Our ${solution.title} solution provides enterprise-grade technology integration for modern businesses. We deliver seamless collaboration, secure connectivity, and intelligent control systems that transform how your organization operates.`,
    keyFeatures: [
      "Enterprise-grade meeting rooms",
      "Smart collaboration spaces",
      "Hybrid work environments",
      "Large-scale townhall AV systems",
      "Secure connectivity solutions",
      "Intelligent control platforms"
    ],
    technologies: [
      { name: "Poly", icon: "🎥" },
      { name: "Yealink", icon: "📞" },
      { name: "Logitech", icon: "🎮" },
      { name: "Cisco", icon: "🌐" },
      { name: "Microsoft Teams", icon: "💬" },
      { name: "Zoom", icon: "📹" }
    ],
    benefits: [
      {
        icon: "⚡",
        title: "Increased Productivity",
        description: "Streamlined workflows and seamless collaboration tools"
      },
      {
        icon: "🔒",
        title: "Enhanced Security",
        description: "Enterprise-grade security protocols and encrypted communications"
      },
      {
        icon: "📈",
        title: "Scalable Solutions",
        description: "Grow your infrastructure as your business expands"
      }
    ]
  };

  return (
    <Box>
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
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, color: 'white', fontSize: { xs: '2rem', md: '3rem' } }}>
                {solution.icon} {solution.title}
              </Typography>
              <Typography variant="h6" sx={{ color: '#94a3b8', mb: 3 }}>
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
                Get Started with This Solution
              </Button>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Overview Section */}
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

      {/* Key Features */}
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

      {/* Technologies */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', color: '#0f172a' }}>
          Technologies We Use
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
          {details.technologies.map((tech, index) => (
            <Chip
              key={index}
              icon={<span style={{ fontSize: '1.2rem' }}>{tech.icon}</span>}
              label={tech.name}
              sx={{
                bgcolor: '#f1f5f9',
                fontSize: '1rem',
                py: 3,
                px: 2,
                '& .MuiChip-icon': { ml: 1 },
                '&:hover': {
                  bgcolor: '#2563eb',
                  color: 'white',
                },
              }}
            />
          ))}
        </Box>
      </Container>

      {/* Benefits */}
      <Container maxWidth="xl" sx={{ py: 8, bgcolor: '#f8fafc' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', color: '#0f172a' }}>
          Benefits
        </Typography>
        <Grid container spacing={4}>
          {details.benefits.map((benefit, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    bgcolor: '#f8fafc',
                  },
                }}
              >
                <Typography variant="h2" sx={{ fontSize: '3rem', mb: 2 }}>
                  {benefit.icon}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {benefit.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

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
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: 'white', fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
            Ready to Implement {solution.title}?
          </Typography>
          <Typography variant="body1" sx={{ color: '#94a3b8', mb: 4, fontSize: '1.2rem' }}>
            Let us help you transform your organization with our cutting-edge solutions
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