import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Button,
  Avatar,
  Fade,
  Zoom,
  Grow,
  alpha,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { fetchIndustries } from '../services/api';
import IndustriesList from '../components/dynamic/IndustriesList';

// Professional Color Palette
const colors = {
  primary: {
    main: '#0A2647',
    light: '#1B3A5C',
    dark: '#051A30',
    gradient: 'linear-gradient(135deg, #0A2647 0%, #1B3A5C 100%)',
  },
  secondary: {
    main: '#C4A484',
    light: '#D4B59E',
    dark: '#A8896B',
    gradient: 'linear-gradient(135deg, #C4A484 0%, #B89A7A 100%)',
  },
  accent: {
    main: '#8B5A2B',
    light: '#A6743C',
    dark: '#6E451F',
    gradient: 'linear-gradient(135deg, #8B5A2B 0%, #6E451F 100%)',
  },
  neutral: {
    white: '#FFFFFF',
    offWhite: '#F8F9FA',
    lightGray: '#E9ECEF',
    mediumGray: '#ADB5BD',
    darkGray: '#495057',
    charcoal: '#212529',
    black: '#000000',
  },
  text: {
    primary: '#212529',
    secondary: '#495057',
    disabled: '#ADB5BD',
    inverse: '#FFFFFF',
  },
};

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  background: colors.primary.gradient,
  color: colors.neutral.white,
  padding: theme.spacing(12, 0),
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
}));

const AnimatedBackground = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `radial-gradient(circle at 20% 50%, ${alpha(colors.secondary.main, 0.1)} 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, ${alpha(colors.accent.main, 0.1)} 0%, transparent 50%)`,
  animation: `${gradientFlow} 15s ease infinite`,
  zIndex: 1,
});

const FloatingOrb = styled(Box)(({ size, position, delay }) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${alpha(colors.secondary.main, 0.1)} 0%, ${alpha(colors.accent.main, 0.05)} 100%)`,
  filter: 'blur(60px)',
  animation: `${floatAnimation} ${delay}s infinite ease-in-out`,
  ...position,
  zIndex: 0,
}));

const FeaturedCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '24px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 30px -10px ${alpha(colors.primary.main, 0.2)}`,
    '& .featured-icon': {
      color: colors.secondary.main,
      transform: 'scale(1.1)',
    },
  },
}));

const SolutionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  borderRadius: '24px',
  background: colors.neutral.white,
  border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 30px -10px ${alpha(colors.primary.main, 0.2)}`,
    borderColor: colors.secondary.main,
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  background: colors.primary.gradient,
  color: colors.neutral.white,
  borderRadius: '24px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const IndustriesWeServe = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      icon: <BusinessIcon />,
      title: 'Corporate',
      color: colors.primary.main,
      bgColor: alpha(colors.primary.main, 0.1),
      solutions: [
        'Boardroom AV Integration',
        'Video Conferencing',
        'Digital Signage',
        'Townhall Systems',
      ],
    },
    {
      icon: <SchoolIcon />,
      title: 'Education',
      color: '#10b981',
      bgColor: alpha('#10b981', 0.1),
      solutions: [
        'Smart Classrooms',
        'Lecture Capture',
        'Interactive Displays',
        'Campus AV Network',
      ],
    },
    {
      icon: <LocalHospitalIcon />,
      title: 'Healthcare',
      color: '#ef4444',
      bgColor: alpha('#ef4444', 0.1),
      solutions: [
        'Telemedicine Solutions',
        'Patient Entertainment',
        'Digital Directories',
        'Surgical AV Systems',
      ],
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: colors.secondary.main }} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', bgcolor: colors.neutral.offWhite }}>
      {/* Breadcrumbs */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Breadcrumbs 
          separator={<Typography variant="body2" sx={{ color: alpha(colors.primary.main, 0.5) }}>/</Typography>}
        >
          <Link to="/" style={{ 
            textDecoration: 'none', 
            color: alpha(colors.primary.main, 0.7),
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}>
            <HomeIcon sx={{ fontSize: 18 }} />
            Home
          </Link>
          <Typography sx={{ color: colors.secondary.main, fontWeight: 600 }}>Industries We Serve</Typography>
        </Breadcrumbs>
      </Container>

      {/* Hero Section */}
      <HeroSection>
        <AnimatedBackground />
        <FloatingOrb size="400px" delay="6" position={{ top: '-100px', right: '-100px' }} />
        <FloatingOrb size="300px" delay="8" position={{ bottom: '-50px', left: '-50px' }} />
        
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Fade in={true} timeout={1000}>
            <Box sx={{ maxWidth: '900px' }}>
              <Chip
                icon={<BusinessIcon />}
                label="Industry Expertise"
                sx={{
                  mb: 3,
                  background: alpha(colors.secondary.main, 0.15),
                  color: colors.secondary.main,
                  border: `1px solid ${alpha(colors.secondary.main, 0.3)}`,
                  borderRadius: '30px',
                  fontWeight: 600,
                  '& .MuiChip-icon': { color: colors.secondary.main },
                }}
              />
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 3, 
                  color: colors.neutral.white,
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  lineHeight: 1.2,
                }}
              >
                Industries We Serve
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: alpha(colors.neutral.white, 0.9),
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  lineHeight: 1.8,
                  maxWidth: '800px',
                }}
              >
                Delivering intelligent AV & IT solutions across diverse sectors, 
                tailored to meet the unique challenges of each industry.
              </Typography>
            </Box>
          </Fade>
        </Container>
      </HeroSection>

      {/* Featured Industries */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        {error ? (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4, 
              borderRadius: '12px',
              bgcolor: alpha('#ef4444', 0.1),
              color: colors.text.primary,
            }}
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
              {featuredIndustries.map((industry, index) => (
                <Grid item xs={12} sm={6} md={3} key={industry._id || industry.id}>
                  <Grow in={true} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                    <Link to={`/industry/${industry._id || industry.id}`} style={{ textDecoration: 'none' }}>
                      <FeaturedCard>
                        <CardContent sx={{ p: 4, textAlign: 'center' }}>
                          <Typography 
                            className="featured-icon"
                            variant="h2" 
                            sx={{ 
                              fontSize: '4rem', 
                              mb: 2,
                              transition: 'all 0.3s ease',
                            }}
                          >
                            {industry.icon || '🏢'}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary.main, mb: 1 }}>
                            {industry.title || industry.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 2 }}>
                            {industry.description || 'Specialized solutions available'}
                          </Typography>
                          <Chip
                            label="Explore Solutions"
                            size="small"
                            icon={<ArrowForwardIcon />}
                            sx={{
                              bgcolor: alpha(colors.secondary.main, 0.1),
                              color: colors.secondary.main,
                              '&:hover': { 
                                bgcolor: colors.secondary.main, 
                                color: colors.primary.main 
                              },
                            }}
                          />
                        </CardContent>
                      </FeaturedCard>
                    </Link>
                  </Grow>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 6 }}>
              <Chip 
                label="ALL INDUSTRIES" 
                sx={{ 
                  bgcolor: colors.secondary.main, 
                  color: colors.primary.main,
                  fontWeight: 700,
                  px: 3,
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
      <Box sx={{ bgcolor: colors.neutral.white, py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <SectionTitle variant="h2">Industry-Specific Solutions</SectionTitle>
          <SectionSubtitle>
            Tailored technology solutions designed for your industry's unique requirements
          </SectionSubtitle>

          <Grid container spacing={4}>
            {industrySolutions.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Zoom in={true} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                  <SolutionCard elevation={0}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2, 
                      mb: 3,
                      p: 2,
                      bgcolor: item.bgColor,
                      borderRadius: '16px',
                    }}>
                      <Avatar sx={{ 
                        bgcolor: colors.neutral.white, 
                        color: item.color,
                        width: 56,
                        height: 56,
                      }}>
                        {item.icon}
                      </Avatar>
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
                          <CheckCircleIcon sx={{ color: item.color, fontSize: 18 }} />
                          <Typography variant="body1" sx={{ color: colors.text.secondary }}>
                            {solution}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${alpha(colors.primary.main, 0.1)}` }}>
                      <Button
                        component={Link}
                        to={`/industries-we-serve#${item.title.toLowerCase()}`}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          color: item.color,
                          fontWeight: 600,
                          '&:hover': { gap: 1 },
                        }}
                      >
                        Learn more about {item.title} solutions
                      </Button>
                    </Box>
                  </SolutionCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={800}>
              <StatCard>
                <Typography variant="h2" sx={{ 
                  fontSize: '3rem', 
                  fontWeight: 800, 
                  color: colors.secondary.main,
                  mb: 2,
                }}>
                  {industries.length}+
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Industries Served
                </Typography>
                <Typography variant="body2" sx={{ color: alpha(colors.neutral.white, 0.7) }}>
                  {industries.map(i => i.title || i.name).slice(0, 5).join(', ')}...
                </Typography>
              </StatCard>
            </Fade>
          </Grid>
          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
              <StatCard>
                <Typography variant="h2" sx={{ 
                  fontSize: '3rem', 
                  fontWeight: 800, 
                  color: colors.secondary.main,
                  mb: 2,
                }}>
                  500+
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Projects Delivered
                </Typography>
                <Typography variant="body2" sx={{ color: alpha(colors.neutral.white, 0.7) }}>
                  Across all industry verticals
                </Typography>
              </StatCard>
            </Fade>
          </Grid>
          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={800} style={{ transitionDelay: '400ms' }}>
              <StatCard>
                <Typography variant="h2" sx={{ 
                  fontSize: '3rem', 
                  fontWeight: 800, 
                  color: colors.secondary.main,
                  mb: 2,
                }}>
                  98%
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Client Satisfaction
                </Typography>
                <Typography variant="body2" sx={{ color: alpha(colors.neutral.white, 0.7) }}>
                  Industry-leading satisfaction rate
                </Typography>
              </StatCard>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: colors.primary.main, py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <Fade in={true} timeout={1000}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 8 },
                bgcolor: 'transparent',
                textAlign: 'center',
                border: `1px solid ${alpha(colors.secondary.main, 0.2)}`,
                borderRadius: '48px',
              }}
            >
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 3, 
                  color: colors.neutral.white,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                }}
              >
                Ready to Transform Your Industry?
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: alpha(colors.neutral.white, 0.8), 
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
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: colors.secondary.gradient,
                    color: colors.primary.main,
                    borderRadius: '16px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
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
                    color: colors.neutral.white,
                    borderColor: alpha(colors.neutral.white, 0.3),
                    borderRadius: '16px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: colors.secondary.main,
                      bgcolor: alpha(colors.secondary.main, 0.1),
                    },
                  }}
                >
                  Explore Solutions
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

// Helper components for styling
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  color: colors.primary.main,
  fontSize: '2rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -12,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 80,
    height: 4,
    background: colors.secondary.gradient,
    borderRadius: 2,
  },
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  maxWidth: '800px',
  marginLeft: 'auto',
  marginRight: 'auto',
  color: colors.text.secondary,
  fontSize: '1.1rem',
}));

export default IndustriesWeServe;