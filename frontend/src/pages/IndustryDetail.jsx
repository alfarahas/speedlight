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
  Tab,
  Tabs,
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
  Timeline as TimelineIcon,
  EmojiObjects as IdeaIcon,
  Build as BuildIcon,
  Security as SecurityIcon,
  School as SchoolIcon,
  LocalHospital as LocalHospitalIcon,
  LocationOn as LocationIcon,
  Verified as VerifiedIcon,
  SupportAgent as SupportIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
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

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 ${alpha(colors.secondary.main, 0.4)}; }
  70% { box-shadow: 0 0 0 10px ${alpha(colors.secondary.main, 0)}; }
  100% { box-shadow: 0 0 0 0 ${alpha(colors.secondary.main, 0)}; }
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
  cursor: 'pointer',
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

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: colors.secondary.main,
    height: 3,
    borderRadius: '3px 3px 0 0',
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    color: colors.text.secondary,
    '&.Mui-selected': {
      color: colors.secondary.main,
    },
  },
});

const IndustryDetail = () => {
  const { id } = useParams();
  const [industry, setIndustry] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
            {industry.title || industry.name}
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
                  {industry.title || industry.name}
                </Typography>
                
                {hasDetails && details.tagline && (
                  <Typography variant="h5" sx={{ color: colors.secondary.main, mb: 3, fontWeight: 500 }}>
                    {details.tagline}
                  </Typography>
                )}
                
                {hasDetails && details.description && (
                  <Typography variant="body1" sx={{ color: alpha(colors.neutral.white, 0.9), mb: 4, maxWidth: '800px', fontSize: '1.1rem' }}>
                    {details.description}
                  </Typography>
                )}

                {!hasDetails && (
                  <Typography variant="body1" sx={{ color: alpha(colors.neutral.white, 0.9), mb: 4, maxWidth: '800px', fontSize: '1.1rem' }}>
                    Detailed information for this industry is being added. Please check back soon or contact us for more information.
                  </Typography>
                )}
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component={Link}
                    to={details?.cta?.primaryButton?.link || "/contact-us"}
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
                    {details?.cta?.primaryButton?.text || "Request a consultation"}
                  </Button>
                  <Button
                    component={Link}
                    to={details?.cta?.secondaryButton?.link || "/get-started"}
                    variant="outlined"
                    size="large"
                    sx={{
                      color: colors.neutral.white,
                      borderColor: alpha(colors.neutral.white, 0.3),
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        borderColor: colors.secondary.main,
                        bgcolor: alpha(colors.secondary.main, 0.1),
                      },
                    }}
                  >
                    {details?.cta?.secondaryButton?.text || "Get a project proposal"}
                  </Button>
                </Box>
              </Grid>
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

      {/* Stats Section - Only show if available */}
      {hasDetails && details.stats && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Zoom in={true} timeout={800}>
                <StatCard>
                  <Typography variant="h2" sx={{ 
                    color: colors.secondary.main, 
                    fontWeight: 800, 
                    fontSize: '3rem',
                    mb: 1,
                  }}>
                    {details.stats?.projects || 0}+
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Projects Completed</Typography>
                </StatCard>
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Zoom in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
                <StatCard>
                  <Typography variant="h2" sx={{ 
                    color: colors.secondary.main, 
                    fontWeight: 800, 
                    fontSize: '3rem',
                    mb: 1,
                  }}>
                    {details.stats?.clients || 0}+
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Happy Clients</Typography>
                </StatCard>
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Zoom in={true} timeout={800} style={{ transitionDelay: '400ms' }}>
                <StatCard>
                  <Typography variant="h2" sx={{ 
                    color: colors.secondary.main, 
                    fontWeight: 800, 
                    fontSize: '3rem',
                    mb: 1,
                  }}>
                    {details.stats?.experience || '0'}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Years Experience</Typography>
                </StatCard>
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Zoom in={true} timeout={800} style={{ transitionDelay: '600ms' }}>
                <StatCard>
                  <Typography variant="h2" sx={{ 
                    color: colors.secondary.main, 
                    fontWeight: 800, 
                    fontSize: '3rem',
                    mb: 1,
                  }}>
                    {details.stats?.satisfaction || '0%'}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Client Satisfaction</Typography>
                </StatCard>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      )}

      {/* Tabs Navigation - Only show if there's content */}
      {hasDetails && (
        <Container maxWidth="xl" sx={{ mb: 4 }}>
          <Paper sx={{ 
            borderRadius: '50px', 
            p: 1,
            background: colors.neutral.white,
            border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
          }}>
            <StyledTabs value={tabValue} onChange={handleTabChange} centered>
              {details.overview && <Tab label="Overview" />}
              {details.coreServices && details.coreServices.length > 0 && <Tab label="Core Services" />}
              {details.deliveryApproach && <Tab label="Delivery Approach" />}
              {details.whyChooseUs && details.whyChooseUs.length > 0 && <Tab label="Why Choose Us" />}
            </StyledTabs>
          </Paper>
        </Container>
      )}

      {/* Tab Panels - Only show if there's content */}
      {hasDetails && (
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Overview Panel */}
          {details.overview && (
            <Fade in={tabValue === 0} timeout={500}>
              <Box sx={{ display: tabValue === 0 ? 'block' : 'none' }}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 5, 
                        bgcolor: colors.neutral.white,
                        borderRadius: '32px',
                        border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
                      }}
                    >
                      <SectionTitle variant="h3">Overview</SectionTitle>
                      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: colors.text.secondary }}>
                        {details.overview}
                      </Typography>
                    </Paper>
                  </Grid>
                  
                  {/* Deployment Locations */}
                  {details.deploymentLocations && details.deploymentLocations.length > 0 && (
                    <Grid item xs={12}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 5, 
                          borderRadius: '32px',
                          border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: colors.primary.main }}>
                          Typical Deployment Locations
                        </Typography>
                        <Grid container spacing={2}>
                          {details.deploymentLocations?.map((location, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                              <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 2,
                                p: 2,
                                bgcolor: alpha(colors.secondary.main, 0.05),
                                borderRadius: '12px',
                              }}>
                                <LocationIcon sx={{ color: colors.secondary.main }} />
                                <Typography sx={{ color: colors.text.secondary }}>{location}</Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Fade>
          )}

          {/* Core Services Panel */}
          {details.coreServices && details.coreServices.length > 0 && (
            <Fade in={tabValue === (details.overview ? 1 : 0)} timeout={500}>
              <Box sx={{ display: tabValue === (details.overview ? 1 : 0) ? 'block' : 'none' }}>
                <Grid container spacing={4}>
                  {details.coreServices?.map((service, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Grow in={true} timeout={500 + index * 100}>
                        <ServiceCard>
                          <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                              <Typography 
                                className="service-icon"
                                variant="h2" 
                                sx={{ 
                                  fontSize: '3rem',
                                  transition: 'all 0.3s',
                                }}
                              >
                                {service.icon || '🔹'}
                              </Typography>
                              <Typography variant="h5" sx={{ fontWeight: 700, color: colors.primary.main }}>
                                {service.title}
                              </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ mb: 3, color: colors.text.secondary, lineHeight: 1.7 }}>
                              {service.description}
                            </Typography>
                            {service.details && service.details.length > 0 && (
                              <List dense>
                                {service.details?.map((detail, idx) => (
                                  <ListItem key={idx} sx={{ px: 0 }}>
                                    <ListItemIcon sx={{ minWidth: 30 }}>
                                      <CheckIcon sx={{ color: colors.secondary.main, fontSize: 20 }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                      primary={detail} 
                                      primaryTypographyProps={{ color: colors.text.secondary }}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            )}
                            {service.benefit && (
                              <Box sx={{ 
                                mt: 3, 
                                p: 2, 
                                bgcolor: alpha(colors.secondary.main, 0.1),
                                borderRadius: '12px',
                                borderLeft: `4px solid ${colors.secondary.main}`,
                              }}>
                                <Typography variant="subtitle2" sx={{ color: colors.secondary.main, fontWeight: 700 }}>
                                  Benefit:
                                </Typography>
                                <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                                  {service.benefit}
                                </Typography>
                              </Box>
                            )}
                          </CardContent>
                        </ServiceCard>
                      </Grow>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          )}

          {/* Delivery Approach Panel */}
          {details.deliveryApproach && (
            <Fade in={tabValue === (details.overview ? (details.coreServices?.length > 0 ? 2 : 1) : (details.coreServices?.length > 0 ? 1 : 0))} timeout={500}>
              <Box sx={{ display: 'block' }}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 5, 
                    bgcolor: colors.neutral.white,
                    borderRadius: '32px',
                    border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
                  }}
                >
                  <SectionTitle variant="h3">{details.deliveryApproach?.title || 'Our Delivery Approach'}</SectionTitle>
                  <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', color: colors.text.secondary }}>
                    {details.deliveryApproach?.description || 'We follow clear project governance, staged testing and sign-off milestones to ensure timely delivery and quality outcomes.'}
                  </Typography>
                  <Grid container spacing={3}>
                    {details.deliveryApproach?.steps?.map((step, index) => (
                      <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                        <Paper 
                          elevation={2} 
                          sx={{ 
                            p: 3, 
                            textAlign: 'center', 
                            height: '100%', 
                            borderRadius: '20px',
                            background: colors.neutral.white,
                            border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              borderColor: colors.secondary.main,
                            },
                          }}
                        >
                          <Typography variant="h2" sx={{ fontSize: '2.5rem', mb: 2 }}>
                            {step.icon || '📋'}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: colors.primary.main }}>
                            {step.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                            {step.description}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Box>
            </Fade>
          )}

          {/* Why Choose Us Panel */}
          {details.whyChooseUs && details.whyChooseUs.length > 0 && (
            <Fade in={tabValue === (details.overview ? (details.coreServices?.length > 0 ? (details.deliveryApproach ? 3 : 2) : (details.deliveryApproach ? 2 : 1)) : (details.coreServices?.length > 0 ? (details.deliveryApproach ? 2 : 1) : (details.deliveryApproach ? 1 : 0)))} timeout={500}>
              <Box sx={{ display: 'block' }}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 5, 
                        borderRadius: '32px',
                        border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
                      }}
                    >
                      <SectionTitle variant="h3">Why Clients Choose Speedlight</SectionTitle>
                      <Grid container spacing={3}>
                        {details.whyChooseUs?.map((item, index) => (
                          <Grid item xs={12} md={6} key={index}>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'flex-start', 
                              gap: 2, 
                              p: 2,
                              bgcolor: alpha(colors.secondary.main, 0.05),
                              borderRadius: '16px',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateX(8px)',
                                bgcolor: alpha(colors.secondary.main, 0.1),
                              },
                            }}>
                              <Avatar sx={{ 
                                bgcolor: colors.secondary.main, 
                                color: colors.primary.main,
                                width: 40,
                                height: 40,
                              }}>
                                {item.icon || <StarIcon />}
                              </Avatar>
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary.main }}>
                                  {item.point || item}
                                </Typography>
                                {item.description && (
                                  <Typography variant="body2" sx={{ color: colors.text.secondary, mt: 0.5 }}>
                                    {item.description}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  </Grid>

                  {/* Key Benefits */}
                  <Grid item xs={12}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: colors.primary.main }}>
                      Key Benefits
                    </Typography>
                    <Grid container spacing={3}>
                      {[
                        { icon: <VerifiedIcon />, title: 'Single-vendor accountability', desc: 'From design through support' },
                        { icon: <PeopleIcon />, title: 'Experienced engineers', desc: 'Enterprise deployment discipline' },
                        { icon: <SecurityIcon />, title: 'Tailored solutions', desc: 'Customized to your workflows' },
                        { icon: <SupportIcon />, title: 'Fast support', desc: 'Documented processes and SLA' },
                      ].map((benefit, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                          <BenefitCard elevation={0}>
                            <Avatar sx={{ 
                              bgcolor: colors.secondary.main, 
                              color: colors.primary.main,
                              width: 56, 
                              height: 56, 
                              mb: 2, 
                              mx: 'auto',
                            }}>
                              {benefit.icon}
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: colors.primary.main }}>
                              {benefit.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                              {benefit.desc}
                            </Typography>
                          </BenefitCard>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          )}
        </Container>
      )}

      {/* Next Steps CTA */}
      <Box sx={{ bgcolor: colors.primary.main, py: { xs: 6, md: 10 }, mt: 4 }}>
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
                {details?.cta?.title || `Ready to Transform Your ${industry.title || industry.name} Operations?`}
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
                {details?.cta?.description || "To discuss a site assessment, feasibility study or project proposal, contact Speedlight Infosolutions Pvt Ltd"}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to={details?.cta?.primaryButton?.link || "/contact-us"}
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
                  {details?.cta?.primaryButton?.text || "Request a consultation"}
                </Button>
                <Button
                  component={Link}
                  to={details?.cta?.secondaryButton?.link || "/get-started"}
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
                  {details?.cta?.secondaryButton?.text || "Get a project proposal"}
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default IndustryDetail;