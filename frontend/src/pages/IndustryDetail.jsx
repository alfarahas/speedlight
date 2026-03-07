import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Grow,
  Zoom,
  alpha,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  Home as HomeIcon,
  Business as BusinessIcon,
  CheckCircle as CheckIcon,
  ArrowForward as ArrowForwardIcon,
  Speed as SpeedIcon,
  People as PeopleIcon,
  LocationOn as LocationIcon,
  Verified as VerifiedIcon,
  SupportAgent as SupportIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
  Handshake as HandshakeIcon,
  Lightbulb as LightbulbIcon,
  RocketLaunch as RocketIcon,
} from '@mui/icons-material';
import { fetchIndustries, fetchIndustryDetails } from '../services/api';

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

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: '20px',
  background: colors.primary.gradient,
  color: colors.neutral.white,
  transition: 'all 0.3s ease',
  border: `1px solid ${alpha(colors.secondary.main, 0.2)}`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 20px 30px -10px ${alpha(colors.primary.main, 0.3)}`,
  },
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '24px',
  transition: 'all 0.3s ease',
  border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 30px -10px ${alpha(colors.primary.main, 0.2)}`,
    borderColor: colors.secondary.main,
    '& .service-icon': {
      color: colors.secondary.main,
      transform: 'scale(1.1)',
    },
  },
}));

const BenefitCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  textAlign: 'center',
  borderRadius: '20px',
  background: colors.neutral.white,
  border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    borderColor: colors.secondary.main,
    boxShadow: `0 10px 20px -5px ${alpha(colors.secondary.main, 0.2)}`,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(4),
  color: colors.primary.main,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 60,
    height: 4,
    background: colors.secondary.gradient,
    borderRadius: 2,
  },
}));

const IndustryDetail = () => {
  const { id } = useParams();
  const [industry, setIndustry] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch main industry
      const industriesData = await fetchIndustries();
      const foundIndustry = industriesData.find(i => (i._id || i.id) === id);
      
      if (!foundIndustry) {
        setError('Industry not found');
        return;
      }
      
      setIndustry(foundIndustry);

      // Fetch industry details from backend
      try {
        const detailsData = await fetchIndustryDetails(id);
        if (detailsData) {
          console.log('Industry details loaded:', detailsData);
          setDetails(detailsData);
        } else {
          setDetails(null);
        }
      } catch (err) {
        console.error('Error fetching industry details:', err);
        setDetails(null);
      }

      setError(null);
    } catch (err) {
      setError('Failed to load industry details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: colors.secondary.main }} />
      </Box>
    );
  }

  if (error || !industry) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert 
          severity="error" 
          sx={{ 
            borderRadius: '12px',
            bgcolor: alpha('#ef4444', 0.1),
            color: colors.text.primary,
            mb: 3,
          }}
        >
          {error || 'Industry not found'}
        </Alert>
        <Button
          component={Link}
          to="/industries-we-serve"
          variant="contained"
          sx={{
            background: colors.secondary.gradient,
            color: colors.primary.main,
            borderRadius: '12px',
            px: 4,
            py: 1.5,
          }}
        >
          Back to Industries
        </Button>
      </Container>
    );
  }

  const hasDetails = details && Object.keys(details).length > 0;

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
          <Link to="/industries-we-serve" style={{ textDecoration: 'none', color: alpha(colors.primary.main, 0.7) }}>
            Industries
          </Link>
          <Typography sx={{ color: colors.secondary.main, fontWeight: 600 }}>
            {details?.title || industry?.name}
          </Typography>
        </Breadcrumbs>
      </Container>

      {/* Hero Section */}
      <HeroSection>
        <AnimatedBackground />
        <FloatingOrb size="400px" delay="6" position={{ top: '-100px', right: '-100px' }} />
        <FloatingOrb size="300px" delay="8" position={{ bottom: '-50px', left: '-50px' }} />
        
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Fade in={true} timeout={1000}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={8}>
                <Chip
                  icon={<BusinessIcon />}
                  label="Industry Solutions"
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
                <Typography variant="h1" sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800, 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  color: colors.neutral.white,
                }}>
                  <Box component="span" sx={{ fontSize: '4rem' }}>
                    {industry.icon || '🏢'}
                  </Box>
                  {details?.title || industry?.name}
                </Typography>
                
                {hasDetails && (
                  <Typography variant="h6" sx={{ color: alpha(colors.neutral.white, 0.9), mb: 4, maxWidth: '800px', lineHeight: 1.8 }}>
                    {details.overview?.description || `Comprehensive technology solutions for the ${industry.name} industry`}
                  </Typography>
                )}

                {!hasDetails && (
                  <Typography variant="h6" sx={{ color: alpha(colors.neutral.white, 0.9), mb: 4, maxWidth: '800px', lineHeight: 1.8 }}>
                    Detailed information for this industry is being added. Please check back soon or contact us for more information.
                  </Typography>
                )}
                
                <Button
                  component={Link}
                  to="/get-started"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: colors.secondary.gradient,
                    color: colors.primary.main,
                    borderRadius: '12px',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  Get Started with This Industry
                </Button>
              </Grid>
              {hasDetails && details.heroImage?.url && (
                <Grid item xs={12} md={4}>
                  <Zoom in={true} timeout={800}>
                    <Box
                      component="img"
                      src={details.heroImage.url}
                      alt={details.heroImage.alt || industry.name}
                      sx={{
                        width: '100%',
                        maxHeight: 400,
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))',
                      }}
                    />
                  </Zoom>
                </Grid>
              )}
            </Grid>
          </Fade>
        </Container>
      </HeroSection>

      {/* Show message if no details available */}
      {!hasDetails && (
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Alert 
            severity="info" 
            sx={{ 
              borderRadius: '16px',
              bgcolor: alpha(colors.secondary.main, 0.1),
              color: colors.primary.main,
              '& .MuiAlert-icon': { color: colors.secondary.main },
            }}
          >
            Detailed information for this industry is being added. Please check back soon or contact us for more details.
          </Alert>
        </Container>
      )}

      {/* Overview Section */}
      {hasDetails && details.overview?.description && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Fade in={true} timeout={800}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 3, md: 5 }, 
                bgcolor: colors.neutral.white,
                borderRadius: '32px',
                border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
              }}
            >
              <SectionTitle variant="h3">{details.overview?.title || 'Overview'}</SectionTitle>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: colors.text.secondary }}>
                {details.overview.description}
              </Typography>
            </Paper>
          </Fade>
        </Container>
      )}

      {/* Stats Section */}
      {hasDetails && details.stats && (details.stats.projects || details.stats.clients || details.stats.experience) && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Grid container spacing={3}>
            {details.stats.projects && (
              <Grid item xs={12} sm={6} md={4}>
                <Zoom in={true} timeout={800}>
                  <StatCard>
                    <Typography variant="h2" sx={{ 
                      color: colors.secondary.main, 
                      fontWeight: 800, 
                      fontSize: '3rem',
                      mb: 1,
                    }}>
                      {details.stats.projects}+
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Projects Completed</Typography>
                  </StatCard>
                </Zoom>
              </Grid>
            )}
            {details.stats.clients && (
              <Grid item xs={12} sm={6} md={4}>
                <Zoom in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
                  <StatCard>
                    <Typography variant="h2" sx={{ 
                      color: colors.secondary.main, 
                      fontWeight: 800, 
                      fontSize: '3rem',
                      mb: 1,
                    }}>
                      {details.stats.clients}+
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Happy Clients</Typography>
                  </StatCard>
                </Zoom>
              </Grid>
            )}
            {details.stats.experience && (
              <Grid item xs={12} sm={6} md={4}>
                <Zoom in={true} timeout={800} style={{ transitionDelay: '400ms' }}>
                  <StatCard>
                    <Typography variant="h2" sx={{ 
                      color: colors.secondary.main, 
                      fontWeight: 800, 
                      fontSize: '3rem',
                      mb: 1,
                    }}>
                      {details.stats.experience}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Years Experience</Typography>
                  </StatCard>
                </Zoom>
              </Grid>
            )}
          </Grid>
        </Container>
      )}

      {/* Core Services Section */}
      {hasDetails && details.coreServices?.items && details.coreServices.items.length > 0 && (
        <Box sx={{ bgcolor: colors.neutral.white, py: 8 }}>
          <Container maxWidth="xl">
            <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
              {details.coreServices.title || 'Core Services'}
            </SectionTitle>
            <Grid container spacing={3}>
              {details.coreServices.items.map((service, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Grow in={true} timeout={500 + index * 100}>
                    <ServiceCard>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <Avatar sx={{ bgcolor: alpha(colors.secondary.main, 0.1), color: colors.secondary.main }}>
                            {service.icon ? <Box component="span" sx={{ fontSize: '1.2rem' }}>{service.icon}</Box> : <CheckIcon />}
                          </Avatar>
                          <Typography variant="body1" sx={{ fontWeight: 500, color: colors.text.primary }}>
                            {service.text}
                          </Typography>
                        </Box>
                      </CardContent>
                    </ServiceCard>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* Delivery Approach Section */}
      {hasDetails && details.deliveryApproach?.items && details.deliveryApproach.items.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            {details.deliveryApproach.title || 'Our Delivery Approach'}
          </SectionTitle>
          <Grid container spacing={3}>
            {details.deliveryApproach.items.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Grow in={true} timeout={500 + index * 100}>
                  <Paper sx={{ 
                    p: 3, 
                    bgcolor: alpha(colors.primary.main, 0.02),
                    borderRadius: '16px',
                    border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: colors.secondary.main, color: colors.primary.main }}>
                        {item.icon || <CheckIcon />}
                      </Avatar>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {item.text}
                      </Typography>
                    </Box>
                  </Paper>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* Deployment Locations Section */}
      {hasDetails && details.deploymentLocations?.items && details.deploymentLocations.items.length > 0 && (
        <Box sx={{ bgcolor: colors.neutral.white, py: 8 }}>
          <Container maxWidth="xl">
            <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
              {details.deploymentLocations.title || 'Typical Deployment Locations'}
            </SectionTitle>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              {details.deploymentLocations.items.map((location, index) => (
                <Zoom key={index} in={true} timeout={500 + index * 50}>
                  <Chip
                    icon={location.icon ? <Box component="span" sx={{ fontSize: '1.2rem' }}>{location.icon}</Box> : <LocationIcon />}
                    label={location.name}
                    sx={{
                      bgcolor: alpha(colors.primary.main, 0.05),
                      color: colors.primary.main,
                      fontSize: '1rem',
                      py: 2.5,
                      px: 1,
                      '& .MuiChip-icon': { color: colors.secondary.main },
                      '&:hover': {
                        bgcolor: colors.secondary.main,
                        color: colors.primary.main,
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  />
                </Zoom>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* Why Choose Us Section */}
      {hasDetails && details.whyChooseUs?.features && details.whyChooseUs.features.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            {details.whyChooseUs.title || 'Why Clients Choose Speedlight'}
          </SectionTitle>
          <Grid container spacing={3}>
            {details.whyChooseUs.features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Zoom in={true} timeout={500 + index * 100}>
                  <Paper sx={{ 
                    p: 4,
                    textAlign: 'center',
                    borderRadius: '20px',
                    background: `linear-gradient(135deg, ${alpha(colors.primary.main, 0.02)} 0%, ${alpha(colors.secondary.main, 0.05)} 100%)`,
                    border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
                  }}>
                    <Avatar sx={{ 
                      width: 80, 
                      height: 80, 
                      mb: 3, 
                      mx: 'auto',
                      bgcolor: colors.secondary.main,
                      color: colors.primary.main,
                      fontSize: '2rem'
                    }}>
                      {feature.icon || <LightbulbIcon />}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: colors.primary.main }}>
                      {feature.text}
                    </Typography>
                  </Paper>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* Challenges Section */}
      {hasDetails && details.challenges && details.challenges.length > 0 && (
        <Box sx={{ bgcolor: colors.neutral.white, py: 8 }}>
          <Container maxWidth="xl">
            <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
              Industry Challenges
            </SectionTitle>
            <Grid container spacing={4}>
              {details.challenges.map((challenge, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Grow in={true} timeout={500 + index * 100}>
                    <Paper sx={{ 
                      p: 4,
                      height: '100%',
                      borderRadius: '20px',
                      border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 15px 30px -10px ${alpha(colors.primary.main, 0.2)}`,
                      },
                    }}>
                      <Typography variant="h2" sx={{ fontSize: '3rem', mb: 2, textAlign: 'center' }}>
                        {challenge.icon || '⚠️'}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: colors.primary.main, textAlign: 'center' }}>
                        {challenge.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.secondary, textAlign: 'center' }}>
                        {challenge.description}
                      </Typography>
                    </Paper>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* Solutions Section */}
      {hasDetails && details.solutions && details.solutions.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            Our Solutions
          </SectionTitle>
          <Grid container spacing={4}>
            {details.solutions.map((solution, index) => (
              <Grid item xs={12} key={index}>
                <Grow in={true} timeout={500 + index * 100}>
                  <Paper sx={{ 
                    p: 4,
                    borderRadius: '20px',
                    border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Avatar sx={{ bgcolor: colors.secondary.main, color: colors.primary.main, width: 56, height: 56 }}>
                        {solution.icon || <RocketIcon />}
                      </Avatar>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: colors.primary.main }}>
                          {solution.title}
                        </Typography>
                        <Typography variant="body1" sx={{ color: colors.text.secondary, mt: 1 }}>
                          {solution.description}
                        </Typography>
                      </Box>
                    </Box>
                    {solution.solutions && solution.solutions.length > 0 && (
                      <>
                        <Divider sx={{ my: 2 }} />
                        <List>
                          {solution.solutions.map((item, idx) => (
                            <ListItem key={idx}>
                              <ListItemIcon>
                                <CheckIcon sx={{ color: colors.secondary.main }} />
                              </ListItemIcon>
                              <ListItemText primary={item} />
                            </ListItem>
                          ))}
                        </List>
                      </>
                    )}
                  </Paper>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* Technologies Section */}
      {hasDetails && details.technologies && details.technologies.length > 0 && (
        <Box sx={{ bgcolor: colors.neutral.white, py: 8 }}>
          <Container maxWidth="xl">
            <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
              Technologies We Use
            </SectionTitle>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              {details.technologies.map((tech, index) => (
                <Zoom key={index} in={true} timeout={500 + index * 50}>
                  <Chip
                    icon={tech.icon ? <Box component="span" sx={{ fontSize: '1.2rem' }}>{tech.icon}</Box> : undefined}
                    label={tech.name}
                    sx={{
                      bgcolor: alpha(colors.primary.main, 0.05),
                      color: colors.primary.main,
                      fontSize: '1rem',
                      py: 2.5,
                      px: 1,
                      '&:hover': {
                        bgcolor: colors.secondary.main,
                        color: colors.primary.main,
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  />
                </Zoom>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* Benefits Section */}
      {hasDetails && details.benefits && details.benefits.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            Key Benefits
          </SectionTitle>
          <Grid container spacing={4}>
            {details.benefits.map((benefit, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Zoom in={true} timeout={500 + index * 100}>
                  <BenefitCard elevation={0}>
                    <Avatar sx={{ 
                      bgcolor: alpha(colors.secondary.main, 0.1), 
                      color: colors.secondary.main,
                      width: 64, 
                      height: 64, 
                      mb: 2, 
                      mx: 'auto',
                    }}>
                      {benefit.icon || <TrendingUpIcon />}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: colors.primary.main }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                      {benefit.description}
                    </Typography>
                  </BenefitCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* Gallery Section */}
      {hasDetails && details.gallery && details.gallery.length > 0 && (
        <Box sx={{ bgcolor: colors.neutral.white, py: 8 }}>
          <Container maxWidth="xl">
            <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
              Project Gallery
            </SectionTitle>
            <Grid container spacing={3}>
              {details.gallery.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Grow in={true} timeout={500 + index * 100}>
                    <Paper
                      sx={{
                        position: 'relative',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        '&:hover .gallery-overlay': {
                          opacity: 1,
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={item.imageUrl}
                        alt={item.caption || 'Gallery image'}
                        sx={{
                          width: '100%',
                          height: 250,
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                      <Box
                        className="gallery-overlay"
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          bgcolor: alpha(colors.primary.main, 0.8),
                          color: colors.neutral.white,
                          p: 2,
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        }}
                      >
                        <Typography variant="body2">{item.caption}</Typography>
                      </Box>
                    </Paper>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* CTA Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Fade in={true} timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 8 },
              background: colors.primary.gradient,
              borderRadius: '48px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h3" sx={{ 
              fontWeight: 800, 
              mb: 3, 
              color: colors.neutral.white, 
              fontSize: { xs: '1.75rem', md: '2.5rem' } 
            }}>
              Ready to Transform Your {industry.name} Operations?
            </Typography>
            <Typography variant="body1" sx={{ color: alpha(colors.neutral.white, 0.9), mb: 4, fontSize: '1.2rem', maxWidth: '800px', mx: 'auto' }}>
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
                Contact Us Today
              </Button>
              <Button
                component={Link}
                to="/get-started"
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
                Get Started
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default IndustryDetail;