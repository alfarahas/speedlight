import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Breadcrumbs,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { fetchIndustries } from '../services/api';
import IndustriesList from '../components/dynamic/IndustriesList';

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

const FeaturedCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
  },
}));

const SolutionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  color: '#0f172a',
  fontSize: '2rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  maxWidth: '800px',
  marginLeft: 'auto',
  marginRight: 'auto',
  color: theme.palette.text.secondary,
  fontSize: '1.1rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '1.25rem',
  },
}));

const IndustriesWeServe = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    loadIndustries();
  }, []);

  const loadIndustries = async () => {
    try {
      setLoading(true);
      const data = await fetchIndustries();
      setIndustries(data);
      setError(null);
    } catch (error) {
      console.error('Error loading industries:', error);
      setError('Failed to load industries');
    } finally {
      setLoading(false);
    }
  };

  // Industry highlights for featured section
  const featuredIndustries = industries.slice(0, 4);

  // Industry-specific solutions
  const industrySolutions = [
    {
      icon: <BusinessIcon sx={{ fontSize: 40, color: '#2563eb' }} />,
      title: 'Corporate',
      solutions: [
        'Boardroom AV Integration',
        'Video Conferencing',
        'Digital Signage',
        'Townhall Systems',
      ],
      color: '#2563eb',
      bgColor: '#dbeafe',
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: '#10b981' }} />,
      title: 'Education',
      solutions: [
        'Smart Classrooms',
        'Lecture Capture',
        'Interactive Displays',
        'Campus AV Network',
      ],
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      icon: <LocalHospitalIcon sx={{ fontSize: 40, color: '#ef4444' }} />,
      title: 'Healthcare',
      solutions: [
        'Telemedicine Solutions',
        'Patient Entertainment',
        'Digital Directories',
        'Surgical AV Systems',
      ],
      color: '#ef4444',
      bgColor: '#fee2e2',
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#2563eb' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Breadcrumbs */}
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" style={{ textDecoration: 'none', color: '#64748b', display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
            Home
          </Link>
          <Typography color="#2563eb">Industries We Serve</Typography>
        </Breadcrumbs>
      </Container>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="xl">
          <Box sx={{ maxWidth: '800px' }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 700, 
                mb: 2, 
                color: 'white',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Industries We Serve
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#94a3b8',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.6,
              }}
            >
              Delivering intelligent AV & IT solutions across diverse sectors, 
              tailored to meet the unique challenges of each industry.
            </Typography>
          </Box>
        </Container>
      </HeroSection>

      {/* Featured Industries */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        {error ? (
          <Alert 
            severity="error" 
            sx={{ mb: 4 }}
            action={
              <Button color="inherit" size="small" onClick={loadIndustries}>
                Try Again
              </Button>
            }
          >
            {error}
          </Alert>
        ) : (
          <>
            <SectionTitle variant="h2">Featured Industries</SectionTitle>
            <SectionSubtitle>
              We provide specialized solutions for these key sectors
            </SectionSubtitle>

            <Grid container spacing={3} sx={{ mb: 8 }}>
              {featuredIndustries.map((industry) => (
                <Grid item xs={12} sm={6} md={3} key={industry._id || industry.id}>
                  <Link to={`/industry/${industry._id || industry.id}`} style={{ textDecoration: 'none' }}>
                    <FeaturedCard>
                      <CardContent sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h2" sx={{ fontSize: '4rem', mb: 2 }}>
                          {industry.icon || '🏢'}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a' }}>
                          {industry.title || industry.name} {/* Use title instead of name */}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {industry.description || 'Specialized solutions available'}
                        </Typography>
                        <Chip
                          label="Explore Solutions"
                          size="small"
                          sx={{
                            mt: 2,
                            bgcolor: '#f1f5f9',
                            '&:hover': { bgcolor: '#2563eb', color: 'white' },
                          }}
                        />
                      </CardContent>
                    </FeaturedCard>
                  </Link>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 6 }}>
              <Chip 
                label="ALL INDUSTRIES" 
                sx={{ 
                  bgcolor: '#2563eb', 
                  color: 'white',
                  fontWeight: 600,
                  px: 2,
                }} 
              />
            </Divider>

            {/* All Industries List */}
            <Box sx={{ mt: 6 }}>
              <IndustriesList />
            </Box>
          </>
        )}
      </Container>

      {/* Industry-Specific Solutions */}
      <Box sx={{ bgcolor: '#f8fafc', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <SectionTitle variant="h2">Industry-Specific Solutions</SectionTitle>
          <SectionSubtitle>
            Tailored technology solutions designed for your industry's unique requirements
          </SectionSubtitle>

          <Grid container spacing={4}>
            {industrySolutions.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <SolutionCard elevation={2}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    mb: 3,
                    p: 2,
                    bgcolor: item.bgColor,
                    borderRadius: '12px',
                  }}>
                    <Box sx={{ 
                      bgcolor: 'white', 
                      p: 1.5, 
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: item.color }}>
                      {item.title}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ pl: 2 }}>
                    {item.solutions.map((solution, idx) => (
                      <Box 
                        key={idx} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 2, 
                          mb: 2,
                          '&:hover': {
                            transform: 'translateX(8px)',
                            transition: 'transform 0.2s',
                          },
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: item.color,
                          }} 
                        />
                        <Typography variant="body1" color="text.secondary">
                          {solution}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e2e8f0' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: item.color,
                        fontWeight: 600,
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Learn more about {item.title} solutions →
                    </Typography>
                  </Box>
                </SolutionCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Statistics Section */}
<Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
  <Grid container spacing={4}>
    <Grid item xs={12} md={4}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          bgcolor: '#0f172a',
          color: 'white',
          borderRadius: '16px',
        }}
      >
        <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 700, color: '#2563eb' }}>
          {industries.length}+
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Industries Served
        </Typography>
        <Typography variant="body2" sx={{ color: '#94a3b8', mt: 2 }}>
          {industries.map(i => i.title || i.name).join(', ')}
        </Typography>
      </Paper>
    </Grid>
    {/* ... rest of the statistics cards ... */}
  </Grid>
</Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: '#0f172a', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 8 },
              bgcolor: 'transparent',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '32px',
            }}
          >
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700, 
                mb: 3, 
                color: 'white',
                fontSize: { xs: '1.75rem', md: '2.5rem' },
              }}
            >
              Ready to Transform Your Industry?
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#94a3b8', 
                mb: 4, 
                fontSize: '1.2rem',
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Let's discuss how our industry-specific solutions can address your unique challenges
              and help you achieve your business goals.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/contact-us"
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
                Schedule a Consultation
              </Button>
              <Button
                component={Link}
                to="/our-solutions"
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
                Explore Solutions
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default IndustriesWeServe;