import { Box, Container, Typography, Grid, Paper, Avatar, Breadcrumbs, List, ListItem, ListItemIcon, ListItemText, Chip, Fade, Grow, Zoom, alpha } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HandshakeIcon from '@mui/icons-material/Handshake';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';

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

const ReasonCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  borderRadius: '24px',
  background: colors.neutral.white,
  border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: colors.secondary.gradient,
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 30px -10px ${alpha(colors.primary.main, 0.2)}`,
    '&::before': {
      transform: 'scaleX(1)',
    },
  },
}));

const CommitmentItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  background: alpha(colors.secondary.main, 0.05),
  border: `1px solid ${alpha(colors.secondary.main, 0.2)}`,
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: alpha(colors.secondary.main, 0.1),
    transform: 'translateX(8px)',
  },
}));

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <EngineeringIcon sx={{ fontSize: 40 }} />,
      title: 'True System Integration Expertise',
      description: 'We don\'t just assemble products. We architect complete technology ecosystems with seamless integration across all components.',
      color: colors.primary.main,
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 40 }} />,
      title: 'Strategic Partnerships',
      description: 'Powered by industry-leading manufacturers ensuring international standards and access to latest technologies.',
      color: colors.secondary.main,
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Engineering-Driven Methodology',
      description: 'Consult → Design → Integrate → Test → Commission → Support - A proven process for successful project delivery.',
      color: colors.accent.main,
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Scalable & Future-Ready Architecture',
      description: 'Designed to evolve with emerging technologies, protecting your investment for years to come.',
      color: '#10b981',
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      title: 'Certified Engineering Teams',
      description: 'Industry-certified professionals with extensive experience in enterprise deployments.',
      color: '#f59e0b',
    },
    {
      icon: <StarIcon sx={{ fontSize: 40 }} />,
      title: 'Proven Track Record',
      description: '500+ successful projects across 15+ industries with 98% client retention rate.',
      color: '#ef4444',
    },
  ];

  const commitments = [
    'Intelligent system architecture that adapts to your needs',
    'Operational efficiency through streamlined workflows',
    'Enterprise-level security built into every solution',
    'Measurable return on technology investment',
    '24/7 support and proactive maintenance',
    'Continuous innovation and technology updates',
  ];

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
          <Link to="/about-us" style={{ textDecoration: 'none', color: alpha(colors.primary.main, 0.7) }}>
            About Us
          </Link>
          <Typography sx={{ color: colors.secondary.main, fontWeight: 600 }}>Why Choose Us</Typography>
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
                icon={<StarIcon />}
                label="Why Choose Us"
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
                Why Choose Us
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: alpha(colors.neutral.white, 0.9),
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  lineHeight: 1.8,
                  maxWidth: '800px',
                }}
              >
                Engineered for Performance. Designed for Reliability. Built for Scale.
              </Typography>
            </Box>
          </Fade>
        </Container>
      </HeroSection>

      {/* Reasons Grid */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={4}>
          {reasons.map((reason, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Grow in={true} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                <ReasonCard elevation={0}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(reason.color, 0.1), 
                      color: reason.color,
                      width: 64, 
                      height: 64,
                    }}>
                      {reason.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: colors.primary.main }}>
                        {reason.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: colors.text.secondary, lineHeight: 1.7 }}>
                        {reason.description}
                      </Typography>
                    </Box>
                  </Box>
                </ReasonCard>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Our Commitment */}
      <Box sx={{ bgcolor: colors.neutral.white, py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={800}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, color: colors.primary.main }}>
                    Our Commitment
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', color: colors.text.secondary, mb: 4, lineHeight: 1.8 }}>
                    We are committed to delivering excellence in every project through:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {commitments.map((item, index) => (
                      <Zoom key={index} in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                        <CommitmentItem elevation={0}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CheckCircleIcon sx={{ color: colors.secondary.main }} />
                            <Typography variant="body1" sx={{ fontWeight: 500, color: colors.text.primary }}>
                              {item}
                            </Typography>
                          </Box>
                        </CommitmentItem>
                      </Zoom>
                    ))}
                  </Box>
                </Box>
              </Fade>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 5,
                    background: colors.primary.gradient,
                    borderRadius: '32px',
                    color: colors.neutral.white,
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: colors.secondary.main }}>
                    Our Promise
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8, color: alpha(colors.neutral.white, 0.9) }}>
                    We don't just deliver projects; we build lasting partnerships. Every solution we create is backed by our commitment to quality, reliability, and long-term support.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ textAlign: 'center', flex: 1 }}>
                      <Typography variant="h3" sx={{ color: colors.secondary.main, fontWeight: 700 }}>98%</Typography>
                      <Typography variant="body2">Client Retention</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', flex: 1 }}>
                      <Typography variant="h3" sx={{ color: colors.secondary.main, fontWeight: 700 }}>500+</Typography>
                      <Typography variant="body2">Projects</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', flex: 1 }}>
                      <Typography variant="h3" sx={{ color: colors.secondary.main, fontWeight: 700 }}>24/7</Typography>
                      <Typography variant="body2">Support</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: colors.primary.main, py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <Fade in={true} timeout={1000}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ 
                fontWeight: 800, 
                mb: 3, 
                color: colors.neutral.white,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
              }}>
                Ready to Experience the Difference?
              </Typography>
              <Typography variant="body1" sx={{ color: alpha(colors.neutral.white, 0.8), mb: 4, fontSize: '1.2rem', maxWidth: '800px', mx: 'auto' }}>
                Partner with us for your next technology project and see why industry leaders choose Speedlight Infosolutions.
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
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                Start Your Journey
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default WhyChooseUs;