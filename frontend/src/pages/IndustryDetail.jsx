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
} from '@mui/material';
import {
  Home as HomeIcon,
  Business as BusinessIcon,
  CheckCircle as CheckIcon,
  ArrowForward as ArrowForwardIcon,
  Speed as SpeedIcon,
  People as PeopleIcon,
  Timeline as TimelineIcon,
  EmojiObjects as IdeaIcon,
  Warning as WarningIcon,
  Build as BuildIcon,
  Security as SecurityIcon,
  School as SchoolIcon,
  LocalHospital as LocalHospitalIcon,
  LocationOn as LocationIcon,
  Verified as VerifiedIcon,
  SupportAgent as SupportIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { fetchIndustries, fetchIndustryDetails } from '../services/api';

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

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  color: 'white',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
    '& .service-icon': {
      color: '#2563eb',
      transform: 'scale(1.1)',
    },
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

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#2563eb',
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    '&.Mui-selected': {
      color: '#2563eb',
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
          console.log('Industry details loaded:', detailsData);
        } else {
          console.log('No details found for this industry');
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
        <CircularProgress sx={{ color: '#2563eb' }} />
      </Box>
    );
  }

  if (error || !industry) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">{error || 'Industry not found'}</Alert>
        <Button
          component={Link}
          to="/industries-we-serve"
          variant="contained"
          sx={{ mt: 3, bgcolor: '#2563eb' }}
        >
          Back to Industries
        </Button>
      </Container>
    );
  }

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
          <Link to="/industries-we-serve" style={{ textDecoration: 'none', color: '#64748b' }}>
            Industries
          </Link>
          <Typography color="#2563eb">{industry.title || industry.name}</Typography>
        </Breadcrumbs>
      </Container>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h1" sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700, 
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}>
                <span style={{ fontSize: '4rem' }}>{industry.icon || '🏢'}</span>
                {industry.title || industry.name}
              </Typography>
              
              {hasDetails && details.tagline && (
                <Typography variant="h5" sx={{ color: '#94a3b8', mb: 3, fontWeight: 500 }}>
                  {details.tagline}
                </Typography>
              )}
              
              {hasDetails && details.description && (
                <Typography variant="body1" sx={{ color: '#cbd5e1', mb: 4, maxWidth: '800px', fontSize: '1.1rem' }}>
                  {details.description}
                </Typography>
              )}

              {!hasDetails && (
                <Typography variant="body1" sx={{ color: '#cbd5e1', mb: 4, maxWidth: '800px', fontSize: '1.1rem' }}>
                  Detailed information for this industry is being added. Please check back soon or contact us for more information.
                </Typography>
              )}
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to={details?.cta?.primaryButton?.link || "/contact-us"}
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
                  {details?.cta?.primaryButton?.text || "Request a consultation"}
                </Button>
                <Button
                  component={Link}
                  to={details?.cta?.secondaryButton?.link || "/get-started"}
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
                  {details?.cta?.secondaryButton?.text || "Get a project proposal"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Show message if no details available */}
      {!hasDetails && (
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Alert severity="info" sx={{ borderRadius: '12px' }}>
            Detailed information for this industry is being added. Please check back soon or contact us for more details.
          </Alert>
        </Container>
      )}

      {/* Stats Section - Only show if available */}
      {hasDetails && details.stats && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <Typography variant="h2" sx={{ color: '#2563eb', fontWeight: 700, fontSize: '3rem' }}>
                  {details.stats?.projects || 0}+
                </Typography>
                <Typography variant="h6">Projects Completed</Typography>
              </StatCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <Typography variant="h2" sx={{ color: '#10b981', fontWeight: 700, fontSize: '3rem' }}>
                  {details.stats?.clients || 0}+
                </Typography>
                <Typography variant="h6">Happy Clients</Typography>
              </StatCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <Typography variant="h2" sx={{ color: '#f59e0b', fontWeight: 700, fontSize: '3rem' }}>
                  {details.stats?.experience || '0'}
                </Typography>
                <Typography variant="h6">Years Experience</Typography>
              </StatCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard>
                <Typography variant="h2" sx={{ color: '#ef4444', fontWeight: 700, fontSize: '3rem' }}>
                  {details.stats?.satisfaction || '0%'}
                </Typography>
                <Typography variant="h6">Client Satisfaction</Typography>
              </StatCard>
            </Grid>
          </Grid>
        </Container>
      )}

      {/* Tabs Navigation - Only show if there's content */}
      {hasDetails && (
        <Container maxWidth="xl" sx={{ mb: 4 }}>
          <Paper sx={{ borderRadius: '50px', p: 1 }}>
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
                    <Paper elevation={0} sx={{ p: 5, bgcolor: '#f8fafc', borderRadius: '24px' }}>
                      <SectionTitle variant="h3">Overview</SectionTitle>
                      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#1e293b' }}>
                        {details.overview}
                      </Typography>
                    </Paper>
                  </Grid>
                  
                  {/* Deployment Locations */}
                  {details.deploymentLocations && details.deploymentLocations.length > 0 && (
                    <Grid item xs={12}>
                      <Paper elevation={0} sx={{ p: 5, borderRadius: '24px' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#0f172a' }}>
                          Typical Deployment Locations
                        </Typography>
                        <Grid container spacing={2}>
                          {details.deploymentLocations?.map((location, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <LocationIcon sx={{ color: '#2563eb' }} />
                                <Typography>{location}</Typography>
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
                              <Typography variant="h2" className="service-icon" sx={{ fontSize: '3rem', transition: 'all 0.3s' }}>
                                {service.icon || '🔹'}
                              </Typography>
                              <Typography variant="h5" sx={{ fontWeight: 600 }}>{service.title}</Typography>
                            </Box>
                            <Typography variant="body1" sx={{ mb: 3, color: '#475569' }}>
                              {service.description}
                            </Typography>
                            {service.details && service.details.length > 0 && (
                              <List dense>
                                {service.details?.map((detail, idx) => (
                                  <ListItem key={idx} sx={{ px: 0 }}>
                                    <ListItemIcon sx={{ minWidth: 30 }}>
                                      <CheckIcon sx={{ color: '#2563eb', fontSize: 20 }} />
                                    </ListItemIcon>
                                    <ListItemText primary={detail} />
                                  </ListItem>
                                ))}
                              </List>
                            )}
                            {service.benefit && (
                              <Box sx={{ mt: 3, p: 2, bgcolor: '#dbeafe', borderRadius: '12px' }}>
                                <Typography variant="subtitle2" sx={{ color: '#2563eb', fontWeight: 600 }}>
                                  Benefit:
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
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
                <Paper elevation={0} sx={{ p: 5, bgcolor: '#f8fafc', borderRadius: '24px' }}>
                  <SectionTitle variant="h3">{details.deliveryApproach?.title || 'Our Delivery Approach'}</SectionTitle>
                  <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', color: '#1e293b' }}>
                    We follow clear project governance, staged testing and sign-off milestones to ensure timely delivery and quality outcomes.
                  </Typography>
                  <Grid container spacing={3}>
                    {details.deliveryApproach?.steps?.map((step, index) => (
                      <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                        <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: '16px' }}>
                          <Typography variant="h2" sx={{ fontSize: '2.5rem', mb: 2 }}>{step.icon || '📋'}</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{step.title}</Typography>
                          <Typography variant="body2" color="text.secondary">{step.description}</Typography>
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
                    <Paper elevation={0} sx={{ p: 5, borderRadius: '24px' }}>
                      <SectionTitle variant="h3">Why Clients Choose Speedlight</SectionTitle>
                      <Grid container spacing={3}>
                        {details.whyChooseUs?.map((item, index) => (
                          <Grid item xs={12} md={6} key={index}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2 }}>
                              <Avatar sx={{ bgcolor: '#dbeafe', color: '#2563eb' }}>{item.icon || '✓'}</Avatar>
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>{item.point || item}</Typography>
                                {item.description && (
                                  <Typography variant="body2" color="text.secondary">{item.description}</Typography>
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
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: '#0f172a' }}>
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
                          <BenefitCard elevation={2}>
                            <Avatar sx={{ bgcolor: '#2563eb', width: 56, height: 56, mb: 2, mx: 'auto' }}>
                              {benefit.icon}
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{benefit.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{benefit.desc}</Typography>
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
      <Box sx={{ bgcolor: '#0f172a', py: { xs: 6, md: 10 }, mt: 4 }}>
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
              {details?.cta?.title || "Ready to Transform Your Industry?"}
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
                  bgcolor: '#2563eb',
                  '&:hover': { bgcolor: '#1d4ed8' },
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
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
                {details?.cta?.secondaryButton?.text || "Get a project proposal"}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default IndustryDetail;