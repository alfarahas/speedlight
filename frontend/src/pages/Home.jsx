import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  Avatar,
  Fade,
  Zoom,
  Grow,
  alpha,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import SolutionsList from '../components/dynamic/SolutionsList';
import IndustriesList from '../components/dynamic/IndustriesList';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SecurityIcon from '@mui/icons-material/Security';
import DevicesIcon from '@mui/icons-material/Devices';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 ${alpha(colors.secondary.main, 0.4)}; }
  70% { box-shadow: 0 0 0 20px ${alpha(colors.secondary.main, 0)}; }
  100% { box-shadow: 0 0 0 0 ${alpha(colors.secondary.main, 0)}; }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInRight = keyframes`
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  width: '100%',
  background: colors.primary.gradient,
  color: colors.neutral.white,
  position: 'relative',
  overflow: 'hidden',
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
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

const FloatingCard = styled(Paper)(({ theme, delay }) => ({
  position: 'absolute',
  padding: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(12px)',
  border: `1px solid ${alpha(colors.secondary.main, 0.2)}`,
  borderRadius: '20px',
  color: colors.neutral.white,
  animation: `${floatAnimation} 8s infinite ease-in-out`,
  animationDelay: delay,
  zIndex: 3,
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.12)',
    borderColor: colors.secondary.main,
    transform: 'scale(1.05)',
  },
  transition: 'all 0.3s ease',
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  width: '100%',
  padding: theme.spacing(8, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 4),
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '1400px',
  margin: '0 auto',
  width: '100%',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 4),
  },
}));

const SectionTitle = styled(Typography)(({ theme, light }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  color: light ? colors.neutral.white : colors.primary.main,
  fontSize: '2rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
  position: 'relative',
  display: 'inline-block',
  width: '100%',
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

const SectionSubtitle = styled(Typography)(({ theme, light }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  maxWidth: '800px',
  marginLeft: 'auto',
  marginRight: 'auto',
  color: light ? alpha(colors.neutral.white, 0.8) : colors.text.secondary,
  fontSize: '1.1rem',
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: '20px',
  background: colors.neutral.white,
  border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 30px -10px ${alpha(colors.primary.main, 0.2)}`,
    borderColor: colors.secondary.main,
    '& .feature-icon': {
      background: colors.secondary.gradient,
      color: colors.primary.main,
    },
  },
}));

const FeatureIcon = styled(Avatar)(({ theme }) => ({
  width: 64,
  height: 64,
  background: alpha(colors.primary.main, 0.05),
  color: colors.primary.main,
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
}));

const ApproachCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  borderRadius: '24px',
  background: colors.neutral.white,
  border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 30px -10px ${alpha(colors.primary.main, 0.2)}`,
    '& .approach-number': {
      color: colors.secondary.main,
      transform: 'scale(1.1)',
    },
  },
}));

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const whyChooseUs = [
    {
      icon: <SecurityIcon />,
      title: "Enterprise-Focused Design",
      description: "Tailored solutions for complex business requirements with scalable architecture"
    },
    {
      icon: <BusinessIcon />,
      title: "Vendor-Neutral Advisory",
      description: "Unbiased recommendations for optimal technology solutions and ROI"
    },
    {
      icon: <DevicesIcon />,
      title: "Certified Engineering Teams",
      description: "Industry-certified professionals for flawless execution and support"
    },
    {
      icon: <SpeedIcon />,
      title: "Scalable Architecture",
      description: "Future-ready infrastructure that grows with your business"
    },
    {
      icon: <SupportAgentIcon />,
      title: "Lifecycle Support",
      description: "End-to-end support from design to ongoing maintenance"
    },
    {
      icon: <LocationOnIcon />,
      title: "PAN India Presence",
      description: "Nationwide service delivery with local expertise"
    }
  ];

  const approachSteps = [
    { number: "01", title: "Consult", description: "Requirement analysis and environment assessment.", icon: "📋" },
    { number: "02", title: "Design", description: "Custom architecture and system planning.", icon: "✏️" },
    { number: "03", title: "Integrate", description: "Professional installation and system configuration.", icon: "🔧" },
    { number: "04", title: "Optimize", description: "Testing, calibration, and performance validation.", icon: "⚡" },
    { number: "05", title: "Support", description: "Lifecycle management and technical assistance.", icon: "🛠️" }
  ];

  const stats = [
    { value: '500+', label: 'Projects Delivered', icon: '🚀' },
    { value: '98%', label: 'Client Retention', icon: '⭐' },
    { value: '50+', label: 'Certified Experts', icon: '👥' },
    { value: '24/7', label: 'Support Available', icon: '🔄' },
  ];

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', bgcolor: colors.neutral.offWhite }}>
      {/* Hero Section */}
      <HeroSection>
        <AnimatedBackground />
        <FloatingOrb size="500px" delay="0" position={{ top: '-200px', right: '-100px' }} />
        <FloatingOrb size="400px" delay="3" position={{ bottom: '-150px', left: '-50px' }} />
        <FloatingOrb size="300px" delay="6" position={{ top: '40%', right: '20%' }} />

        {/* Floating Cards */}
        <FloatingCard delay="0s" sx={{ top: '20%', right: '5%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon sx={{ color: colors.secondary.main }} />
            <Typography variant="body2">ISO 27001 Certified</Typography>
          </Box>
        </FloatingCard>

        <FloatingCard delay="2s" sx={{ bottom: '30%', left: '3%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon sx={{ color: colors.secondary.main }} />
            <Typography variant="body2">Microsoft Gold Partner</Typography>
          </Box>
        </FloatingCard>

        <HeroContent>
          <ContentWrapper>
            <Fade in={isVisible} timeout={1000}>
              <Box>
                <Chip
                  icon={<RocketLaunchIcon />}
                  label="Trusted Since 2010"
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
              </Box>
            </Fade>

            <Fade in={isVisible} timeout={1500}>
              <Typography 
                variant="h1" 
                sx={{ 
                  color: colors.neutral.white,
                  mb: 3,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 800,
                  maxWidth: '1000px',
                  lineHeight: 1.2,
                }}
              >
                Engineering Intelligent{' '}
                <Box 
                  component="span" 
                  sx={{ 
                    background: colors.secondary.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}
                >
                  AV & IT Ecosystems
                </Box>{' '}
                for Modern Enterprises
              </Typography>
            </Fade>
            
            <Fade in={isVisible} timeout={2000}>
              <Typography 
                sx={{ 
                  color: alpha(colors.neutral.white, 0.9),
                  mb: 3,
                  maxWidth: '800px',
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  lineHeight: 1.8,
                }}
              >
                We design, integrate, and support advanced Audio-Visual and Enterprise IT infrastructures 
                that enable seamless collaboration, secure connectivity, and intelligent control across 
                corporate, institutional, and premium environments.
              </Typography>
            </Fade>
            
            <Fade in={isVisible} timeout={2500}>
              <Typography 
                sx={{ 
                  color: alpha(colors.neutral.white, 0.8),
                  mb: 4,
                  maxWidth: '700px',
                  fontSize: '1rem',
                }}
              >
                From boardrooms to control rooms, from enterprise campuses to smart residences — we deliver 
                performance-driven, future-ready technology ecosystems.
              </Typography>
            </Fade>
            
            <Fade in={isVisible} timeout={3000}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Button
                  component={Link}
                  to="/our-solutions"
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
                      boxShadow: `0 10px 20px -5px ${alpha(colors.secondary.main, 0.3)}`,
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Explore Solutions
                </Button>
                <Button
                  component={Link}
                  to="/contact-us"
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
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Contact Us
                </Button>
              </Box>
            </Fade>
            
            <Fade in={isVisible} timeout={3500}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  color: colors.secondary.main, 
                  fontSize: '1.5rem',
                  animation: `${pulseGlow} 2s infinite`,
                }}>
                  ◆
                </Box>
                <Typography sx={{ color: alpha(colors.neutral.white, 0.7) }}>
                  Design. Integrate. Optimize. Support.
                </Typography>
              </Box>
            </Fade>
          </ContentWrapper>
        </HeroContent>
      </HeroSection>

      {/* Stats Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Grow in={true} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    background: colors.neutral.white,
                    borderRadius: '24px',
                    border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 30px -10px ${alpha(colors.primary.main, 0.2)}`,
                    },
                  }}
                >
                  <Typography variant="h2" sx={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 800, 
                    color: colors.secondary.main,
                    mb: 1,
                  }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" sx={{ color: colors.text.secondary }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Core Expertise Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: colors.neutral.white }}>
        <ContentWrapper>
          <SectionTitle variant="h2">Our Core Expertise</SectionTitle>
          <SectionSubtitle>
            We provide end-to-end technology integration across specialized domains
          </SectionSubtitle>

          <SolutionsList limit={6} />
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              component={Link}
              to="/our-solutions"
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderColor: colors.secondary.main,
                color: colors.primary.main,
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: colors.secondary.dark,
                  bgcolor: alpha(colors.secondary.main, 0.1),
                },
              }}
            >
              View All Solutions
            </Button>
          </Box>
        </ContentWrapper>
      </Box>

      {/* Why Choose Us Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: colors.neutral.offWhite }}>
        <ContentWrapper>
          <SectionTitle variant="h2">Why Speedlight Infosolutions?</SectionTitle>
          <SectionSubtitle>
            We don't just install systems — we engineer intelligent environments.
          </SectionSubtitle>

          <Grid container spacing={3}>
            {whyChooseUs.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Grow in={true} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                  <FeatureCard elevation={0}>
                    <FeatureIcon className="feature-icon">
                      {item.icon}
                    </FeatureIcon>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: colors.primary.main }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.text.secondary, lineHeight: 1.7 }}>
                      {item.description}
                    </Typography>
                  </FeatureCard>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </ContentWrapper>
      </Box>

      {/* Industries We Serve Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: colors.neutral.white }}>
        <ContentWrapper>
          <SectionTitle variant="h2">Industries We Serve</SectionTitle>
          <SectionSubtitle>
            Specialized solutions for diverse sectors
          </SectionSubtitle>

          <IndustriesList limit={8} />
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              component={Link}
              to="/industries-we-serve"
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderColor: colors.secondary.main,
                color: colors.primary.main,
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: colors.secondary.dark,
                  bgcolor: alpha(colors.secondary.main, 0.1),
                },
              }}
            >
              View All Industries
            </Button>
          </Box>
        </ContentWrapper>
      </Box>

      {/* Our Approach Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: colors.neutral.offWhite }}>
        <ContentWrapper>
          <SectionTitle variant="h2">Our Approach</SectionTitle>
          <SectionSubtitle>
            A systematic methodology for successful project delivery
          </SectionSubtitle>

          <Grid container spacing={3}>
            {approachSteps.map((step, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Zoom in={true} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                  <ApproachCard elevation={0}>
                    <Typography
                      className="approach-number"
                      variant="h1"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        fontSize: '3rem',
                        fontWeight: 800,
                        color: alpha(colors.primary.main, 0.1),
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {step.number}
                    </Typography>
                    <Typography variant="h2" sx={{ fontSize: '2.5rem', mb: 2 }}>
                      {step.icon}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: colors.primary.main }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                      {step.description}
                    </Typography>
                  </ApproachCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </ContentWrapper>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: colors.primary.main }}>
        <ContentWrapper>
          <Fade in={true} timeout={1000}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  color: colors.neutral.white,
                  mb: 3,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                  fontWeight: 800,
                }}
              >
                Let's Build the Future of Intelligent Spaces
              </Typography>
              <Typography 
                sx={{ 
                  color: alpha(colors.neutral.white, 0.8),
                  mb: 4,
                  maxWidth: '800px',
                  mx: 'auto',
                  fontSize: '1.1rem',
                }}
              >
                Whether you are upgrading a boardroom, building a new campus, or modernizing enterprise 
                infrastructure — we deliver reliable, scalable, and performance-driven technology solutions.
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
                  borderRadius: '16px',
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: `0 20px 30px -10px ${alpha(colors.secondary.main, 0.3)}`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Get Started Today
              </Button>
            </Box>
          </Fade>
        </ContentWrapper>
      </Box>
    </Box>
  );
};

export default Home;