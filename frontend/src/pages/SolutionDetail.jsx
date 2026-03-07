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
  Zoom,
  alpha,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  ArrowForward as ArrowForwardIcon,
  Home as HomeIcon,
  Build as BuildIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingUpIcon,
  RocketLaunch as RocketIcon,
  Business as BusinessIcon,
  School as SchoolIcon,
  MeetingRoom as MeetingRoomIcon,
  MusicNote as MusicNoteIcon,
  Mic as MicIcon,
  Speaker as SpeakerIcon,
  Settings as SettingsIcon,
  EmojiObjects as LightbulbIcon,
  Handshake as HandshakeIcon,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { fetchSolutions, fetchSolutionDetails } from '../services/api';

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

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 20px 30px -10px ${alpha(colors.primary.main, 0.2)}`,
    borderColor: colors.secondary.main,
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

const PartnerCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  textAlign: 'center',
  borderRadius: '20px',
  background: colors.neutral.white,
  border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 15px 30px -10px ${alpha(colors.primary.main, 0.15)}`,
    borderColor: colors.secondary.main,
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

const getApplicationIcon = (iconName) => {
  const icons = {
    'boardroom': <MeetingRoomIcon />,
    'auditorium': <MusicNoteIcon />,
    'classroom': <SchoolIcon />,
    'conference': <BusinessIcon />,
    'performance': <MicIcon />,
    'default': <BusinessIcon />
  };
  return icons[iconName?.toLowerCase()] || icons.default;
};

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

    // Fetch solution details from the PUBLIC endpoint
    try {
      const detailsData = await fetchSolutionDetails(id);
      if (detailsData) {
        console.log('Solution details loaded:', detailsData);
        setDetails(detailsData);
      } else {
        console.log('No details found for this solution');
        setDetails(null);
      }
    } catch (err) {
      console.error('Error fetching solution details:', err);
      setDetails(null);
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
        <CircularProgress sx={{ color: colors.secondary.main }} />
      </Box>
    );
  }

  if (error || !solution) {
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
          {error || 'Solution not found'}
        </Alert>
        <Button
          component={Link}
          to="/our-solutions"
          variant="contained"
          sx={{
            background: colors.secondary.gradient,
            color: colors.primary.main,
            borderRadius: '12px',
            px: 4,
            py: 1.5,
          }}
        >
          Back to Solutions
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
          <Link to="/our-solutions" style={{ textDecoration: 'none', color: alpha(colors.primary.main, 0.7) }}>
            Solutions
          </Link>
          <Typography sx={{ color: colors.secondary.main, fontWeight: 600 }}>
            {solution.title}
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
                  icon={<RocketIcon />}
                  label="Solution Details"
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
                  fontWeight: 800, 
                  mb: 3, 
                  color: colors.neutral.white, 
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Box component="span" sx={{ fontSize: '4rem' }}>
                    {solution.icon || '🔹'}
                  </Box>
                  {solution.title}
                </Typography>
                <Typography variant="h6" sx={{ color: alpha(colors.neutral.white, 0.9), mb: 4, maxWidth: '800px', lineHeight: 1.8 }}>
                  {solution.description}
                </Typography>
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
                  Get Started with This Solution
                </Button>
              </Grid>
              {hasDetails && details.heroImage?.url && (
                <Grid item xs={12} md={4}>
                  <Zoom in={true} timeout={800}>
                    <Box
                      component="img"
                      src={details.heroImage.url}
                      alt={details.heroImage.alt || solution.title}
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
            Detailed information for this solution is being added. Please check back soon or contact us for more details.
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
              <SectionTitle variant="h3">{details.overview.title || 'Overview'}</SectionTitle>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: colors.text.secondary }}>
                {details.overview.description}
              </Typography>
            </Paper>
          </Fade>
        </Container>
      )}

      {/* Key Features Section */}
      {hasDetails && details.keyFeatures?.items && details.keyFeatures.items.length > 0 && (
        <Box sx={{ bgcolor: colors.neutral.white, py: 8 }}>
          <Container maxWidth="xl">
            <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
              {details.keyFeatures.title || 'Key Features'}
            </SectionTitle>
            <Grid container spacing={3}>
              {details.keyFeatures.items.map((feature, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Grow in={true} timeout={500 + index * 100}>
                    <FeatureCard>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <Avatar sx={{ bgcolor: alpha(colors.secondary.main, 0.1), color: colors.secondary.main }}>
                            {feature.icon ? <Box component="span" sx={{ fontSize: '1.2rem' }}>{feature.icon}</Box> : <CheckIcon />}
                          </Avatar>
                          <Typography variant="body1" sx={{ fontWeight: 500, color: colors.text.primary }}>
                            {feature.text}
                          </Typography>
                        </Box>
                      </CardContent>
                    </FeatureCard>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* Business Benefits Section */}
      {hasDetails && details.businessBenefits?.items && details.businessBenefits.items.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            {details.businessBenefits.title || 'Business Benefits'}
          </SectionTitle>
          <Grid container spacing={4}>
            {details.businessBenefits.items.map((benefit, index) => (
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
                      fontSize: '1.5rem',
                    }}>
                      {benefit.icon || <TrendingUpIcon />}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: colors.primary.main }}>
                      {benefit.text}
                    </Typography>
                  </BenefitCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* What We Deliver Section */}
      {hasDetails && details.whatWeDeliver?.items && details.whatWeDeliver.items.length > 0 && (
        <Box sx={{ bgcolor: colors.neutral.white, py: 8 }}>
          <Container maxWidth="xl">
            <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
              {details.whatWeDeliver.title || 'What We Deliver'}
            </SectionTitle>
            <Grid container spacing={3}>
              {details.whatWeDeliver.items.map((item, index) => (
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
                          <CheckIcon />
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
        </Box>
      )}

      {/* Applications Section */}
      {hasDetails && details.applications?.items && details.applications.items.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            {details.applications.title || 'Applications'}
          </SectionTitle>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {details.applications.items.map((app, index) => (
              <Zoom key={index} in={true} timeout={500 + index * 50}>
                <Chip
                  icon={app.icon ? <Box component="span" sx={{ fontSize: '1.2rem' }}>{app.icon}</Box> : getApplicationIcon(app.name)}
                  label={app.name}
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
      )}

      {/* Technology Partners Section */}
      {hasDetails && details.technologyPartners?.partners && details.technologyPartners.partners.length > 0 && (
        <Box sx={{ bgcolor: colors.neutral.white, py: 8 }}>
          <Container maxWidth="xl">
            <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
              {details.technologyPartners.title || 'Technology Partners'}
            </SectionTitle>
            <Grid container spacing={4}>
              {details.technologyPartners.partners.map((partner, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Grow in={true} timeout={500 + index * 100}>
                    <PartnerCard elevation={0}>
                      {partner.logo?.url ? (
                        <Avatar 
                          src={partner.logo.url} 
                          sx={{ width: 80, height: 80, mb: 2, mx: 'auto' }}
                        />
                      ) : (
                        <Avatar sx={{ 
                          width: 80, 
                          height: 80, 
                          mb: 2, 
                          mx: 'auto',
                          bgcolor: alpha(colors.secondary.main, 0.1),
                          color: colors.secondary.main,
                          fontSize: '2rem'
                        }}>
                          <HandshakeIcon />
                        </Avatar>
                      )}
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: colors.primary.main }}>
                        {partner.name}
                      </Typography>
                      {partner.description && (
                        <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 2 }}>
                          {partner.description}
                        </Typography>
                      )}
                      {partner.website && (
                        <Button
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          sx={{ color: colors.secondary.main }}
                        >
                          Visit Website
                        </Button>
                      )}
                    </PartnerCard>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* Why Speedlight Section */}
      {hasDetails && details.whySpeedlight?.features && details.whySpeedlight.features.length > 0 && (
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            {details.whySpeedlight.title || 'Why Speedlight Infosolutions'}
          </SectionTitle>
          <Grid container spacing={3}>
            {details.whySpeedlight.features.map((feature, index) => (
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
              Ready to Implement {solution.title}?
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

export default SolutionDetail;