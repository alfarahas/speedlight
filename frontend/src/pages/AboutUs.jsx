import { Box, Container, Typography, Grid, Paper, Avatar, Divider, Button, Chip, Stack, Fade, Zoom, Grow, useTheme, useMediaQuery, alpha } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HandshakeIcon from '@mui/icons-material/Handshake';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TimelineIcon from '@mui/icons-material/Timeline';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

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

const SectionTitle = styled(Typography)(({ theme, light }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  color: light ? colors.neutral.white : colors.primary.main,
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -12,
    left: 0,
    width: 80,
    height: 4,
    background: colors.secondary.gradient,
    borderRadius: 2,
  },
}));

const ValueCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  textAlign: 'center',
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
    transform: 'translateY(-12px)',
    boxShadow: `0 20px 30px -10px ${alpha(colors.primary.main, 0.2)}`,
    '&::before': {
      transform: 'scaleX(1)',
    },
    '& .MuiAvatar-root': {
      background: colors.secondary.gradient,
      color: colors.primary.main,
    },
  },
}));

const PartnerChip = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  background: colors.neutral.white,
  border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
  borderRadius: '40px',
  transition: 'all 0.3s ease',
  textAlign: 'center',
  cursor: 'default',
  '&:hover': {
    background: colors.secondary.gradient,
    color: colors.primary.main,
    transform: 'scale(1.05)',
    borderColor: 'transparent',
    boxShadow: `0 10px 20px -5px ${alpha(colors.secondary.main, 0.3)}`,
  },
}));

const TimelineCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  background: colors.neutral.white,
  border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
  borderLeft: `4px solid ${colors.secondary.main}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateX(12px)',
    boxShadow: `0 10px 20px -5px ${alpha(colors.primary.main, 0.2)}`,
    borderLeftColor: colors.accent.main,
  },
}));

const StatCard = styled(Paper)(({ theme, color }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  background: colors.primary.gradient,
  color: colors.neutral.white,
  borderRadius: '24px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    background: `radial-gradient(circle, ${alpha(colors.secondary.main, 0.2)} 0%, transparent 70%)`,
    borderRadius: '50%',
  },
  '&:hover': {
    transform: 'scale(1.05)',
    '& .MuiTypography-h2': {
      color: colors.secondary.main,
    },
  },
  transition: 'all 0.3s ease',
}));

const MissionVisionCard = styled(Paper)(({ theme, gradient }) => ({
  padding: theme.spacing(6),
  height: '100%',
  borderRadius: '32px',
  background: gradient || colors.neutral.white,
  border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 30px 40px -20px ${alpha(colors.primary.main, 0.3)}`,
  },
}));

const AboutUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const values = [
    {
      icon: <EngineeringIcon sx={{ fontSize: 40 }} />,
      title: 'Enterprise-Focused Design',
      description: 'Tailored solutions for complex business requirements with scalable architecture',
      metrics: '500+ Enterprise Projects',
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 40 }} />,
      title: 'Vendor-Neutral Advisory',
      description: 'Unbiased recommendations for optimal technology solutions and ROI',
      metrics: '30+ Technology Partners',
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      title: 'Certified Engineering Teams',
      description: 'Industry-certified professionals for flawless execution and support',
      metrics: '50+ Certified Experts',
    },
  ];

  const partners = [
    { name: 'Crestron', category: 'Control Systems' },
    { name: 'Cisco', category: 'Networking' },
    { name: 'Microsoft', category: 'Software' },
    { name: 'Poly', category: 'Video Conferencing' },
    { name: 'Yealink', category: 'Communication' },
    { name: 'Logitech', category: 'Peripherals' },
    { name: 'QSC', category: 'Audio' },
    { name: 'JBL', category: 'Audio' },
    { name: 'Bose', category: 'Audio' },
    { name: 'Biamp', category: 'Audio' },
    { name: 'Shure', category: 'Microphones' },
    { name: 'Samsung', category: 'Displays' },
    { name: 'LG', category: 'Displays' },
    { name: 'Sony', category: 'Professional' },
    { name: 'Epson', category: 'Projectors' },
    { name: 'Extron', category: 'AV' },
    { name: 'Kramer', category: 'AV' },
    { name: 'Barco', category: 'Visualization' },
    { name: 'Juniper', category: 'Networking' },
    { name: 'Aruba', category: 'Networking' },
  ];

  const timeline = [
    { year: '2010', event: 'Company Founded', milestone: 'Started with 3 engineers' },
    { year: '2013', event: 'PAN India Expansion', milestone: 'Opened 5 regional offices' },
    { year: '2016', event: 'Launched Enterprise Solutions', milestone: 'First 100 projects' },
    { year: '2019', event: '500+ Projects Milestone', milestone: 'Crossed 500 successful deployments' },
    { year: '2022', event: 'International Operations', milestone: 'Opened Singapore office' },
    { year: '2024', event: 'Global Industry Leader', milestone: 'Serving 15+ industries worldwide' },
  ];

  const leadership = [
    { name: 'Rajesh Mehta', role: 'Founder & CEO', experience: '25+ years', image: 'RJ' },
    { name: 'Priya Sharma', role: 'CTO', experience: '18+ years', image: 'PS' },
    { name: 'Amit Patel', role: 'Head of Operations', experience: '15+ years', image: 'AP' },
  ];

  const certifications = [
    'ISO 27001:2022 Certified',
    'Crestron Certified Partner',
    'Cisco Premier Integrator',
    'Microsoft Gold Partner',
    'AVIXA Member',
    'CompTIA Certified',
  ];

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', bgcolor: colors.neutral.offWhite }}>
      {/* Breadcrumbs */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Breadcrumbs 
          separator={<Typography variant="body2" sx={{ color: alpha(colors.primary.main, 0.5) }}>/</Typography>}
          sx={{ '& .MuiBreadcrumbs-ol': { alignItems: 'center' } }}
        >
          <Link to="/" style={{ 
            textDecoration: 'none', 
            color: alpha(colors.primary.main, 0.7),
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            transition: 'color 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = colors.secondary.main}
          onMouseLeave={(e) => e.currentTarget.style.color = alpha(colors.primary.main, 0.7)}
          >
            <HomeIcon sx={{ fontSize: 18 }} />
            Home
          </Link>
          <Typography sx={{ color: colors.secondary.main, fontWeight: 600 }}>About Us</Typography>
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
                icon={<MilitaryTechIcon />}
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
                About{' '}
                <Box 
                  component="span" 
                  sx={{ 
                    background: colors.secondary.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Speedlight Infosolutions
                </Box>
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
                Engineering intelligent AV & IT ecosystems for modern enterprises. 
                With over a decade of excellence, we've transformed how businesses 
                communicate, collaborate, and operate.
              </Typography>
            </Box>
          </Fade>
        </Container>
      </HeroSection>

      {/* Mission & Vision */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Zoom in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
              <MissionVisionCard gradient={`linear-gradient(135deg, ${alpha(colors.primary.main, 0.02)} 0%, ${alpha(colors.secondary.main, 0.05)} 100%)`}>
                <Avatar 
                  sx={{ 
                    bgcolor: colors.secondary.main, 
                    width: 72, 
                    height: 72, 
                    mb: 3,
                    color: colors.primary.main,
                  }}
                >
                  <EmojiObjectsIcon sx={{ fontSize: 36 }} />
                </Avatar>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: colors.primary.main }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: colors.text.secondary, mb: 3 }}>
                  To design, integrate, and support advanced Audio-Visual and Enterprise IT infrastructures 
                  that enable seamless collaboration, secure connectivity, and intelligent control across 
                  corporate, institutional, and premium environments.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip icon={<CheckCircleIcon />} label="Client-Centric" sx={{ bgcolor: alpha(colors.secondary.main, 0.1), color: colors.primary.main }} />
                  <Chip icon={<CheckCircleIcon />} label="Innovation-Driven" sx={{ bgcolor: alpha(colors.secondary.main, 0.1), color: colors.primary.main }} />
                </Box>
              </MissionVisionCard>
            </Zoom>
          </Grid>
          <Grid item xs={12} md={6}>
            <Zoom in={true} timeout={800} style={{ transitionDelay: '400ms' }}>
              <MissionVisionCard gradient={`linear-gradient(135deg, ${alpha(colors.accent.main, 0.02)} 0%, ${alpha(colors.secondary.main, 0.05)} 100%)`}>
                <Avatar 
                  sx={{ 
                    bgcolor: colors.accent.main, 
                    width: 72, 
                    height: 72, 
                    mb: 3,
                    color: colors.neutral.white,
                  }}
                >
                  <VisibilityIcon sx={{ fontSize: 36 }} />
                </Avatar>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: colors.primary.main }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: colors.text.secondary, mb: 3 }}>
                  To be the most trusted partner for enterprises seeking future-ready technology ecosystems, 
                  delivering innovation, reliability, and excellence in every project across the globe.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip icon={<FlagIcon />} label="Global Reach" sx={{ bgcolor: alpha(colors.accent.main, 0.1), color: colors.accent.dark }} />
                  <Chip icon={<StarIcon />} label="Excellence" sx={{ bgcolor: alpha(colors.accent.main, 0.1), color: colors.accent.dark }} />
                </Box>
              </MissionVisionCard>
            </Zoom>
          </Grid>
        </Grid>
      </Container>

      {/* Why Choose Us */}
      <Box sx={{ bgcolor: colors.neutral.white, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <SectionTitle variant="h3" sx={{ '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
              Why Choose Us?
            </SectionTitle>
            <Typography variant="body1" sx={{ color: colors.text.secondary, maxWidth: '800px', mx: 'auto', fontSize: '1.1rem' }}>
              We combine technical expertise with business acumen to deliver exceptional value
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Grow in={true} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                  <ValueCard elevation={0}>
                    <Avatar 
                      sx={{ 
                        bgcolor: alpha(colors.secondary.main, 0.1),
                        color: colors.secondary.main,
                        width: 80, 
                        height: 80, 
                        mb: 3, 
                        mx: 'auto',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {value.icon}
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: colors.primary.main }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: colors.text.secondary, mb: 3, lineHeight: 1.7 }}>
                      {value.description}
                    </Typography>
                    <Chip 
                      label={value.metrics} 
                      sx={{ 
                        bgcolor: alpha(colors.secondary.main, 0.1),
                        color: colors.primary.main,
                        fontWeight: 600,
                      }} 
                    />
                  </ValueCard>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Certifications & Accreditations */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={800}>
              <Box>
                <SectionTitle variant="h3">Certifications & Accreditations</SectionTitle>
                <Typography variant="body1" sx={{ color: colors.text.secondary, mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Our commitment to quality and excellence is validated by industry-leading certifications. 
                  We continuously invest in our team's expertise to deliver world-class solutions.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {certifications.map((cert, index) => (
                    <Chip
                      key={index}
                      label={cert}
                      icon={<WorkspacePremiumIcon />}
                      sx={{
                        bgcolor: alpha(colors.primary.main, 0.05),
                        color: colors.primary.main,
                        border: `1px solid ${alpha(colors.secondary.main, 0.3)}`,
                        '&:hover': {
                          bgcolor: colors.secondary.main,
                          color: colors.primary.main,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
              <Box sx={{ position: 'relative' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    bgcolor: colors.primary.main,
                    borderRadius: '32px',
                    color: colors.neutral.white,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: colors.secondary.main }}>
                      Industry Recognition
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="h3" sx={{ color: colors.secondary.main, fontWeight: 700 }}>15+</Typography>
                        <Typography variant="body2">Years of Excellence</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h3" sx={{ color: colors.secondary.main, fontWeight: 700 }}>50+</Typography>
                        <Typography variant="body2">Industry Certifications</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h3" sx={{ color: colors.secondary.main, fontWeight: 700 }}>100%</Typography>
                        <Typography variant="body2">Project Success Rate</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h3" sx={{ color: colors.secondary.main, fontWeight: 700 }}>24/7</Typography>
                        <Typography variant="body2">Support Availability</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}>
                    <WorkspacePremiumIcon sx={{ fontSize: 200 }} />
                  </Box>
                </Paper>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      {/* Company Timeline */}
      <Box sx={{ bgcolor: colors.neutral.white, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <SectionTitle variant="h3" sx={{ '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
              Our Journey
            </SectionTitle>
            <Typography variant="body1" sx={{ color: colors.text.secondary }}>
              A decade of growth, innovation, and excellence
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {timeline.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Grow in={true} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                  <TimelineCard elevation={0}>
                    <Typography variant="h3" sx={{ color: colors.secondary.main, fontWeight: 700, mb: 1 }}>
                      {item.year}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary.main, mb: 2 }}>
                      {item.event}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                      {item.milestone}
                    </Typography>
                  </TimelineCard>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Leadership Team */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <SectionTitle variant="h3" sx={{ '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            Leadership Team
          </SectionTitle>
          <Typography variant="body1" sx={{ color: colors.text.secondary }}>
            Experienced leaders driving innovation and excellence
          </Typography>
        </Box>
        
        <Grid container spacing={4} justifyContent="center">
          {leadership.map((leader, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in={true} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    borderRadius: '24px',
                    background: colors.neutral.white,
                    border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 30px -10px ${alpha(colors.primary.main, 0.2)}`,
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 3,
                      bgcolor: colors.secondary.main,
                      color: colors.primary.main,
                      fontSize: '2.5rem',
                      fontWeight: 600,
                      border: `4px solid ${alpha(colors.secondary.main, 0.3)}`,
                    }}
                  >
                    {leader.image}
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: colors.primary.main }}>
                    {leader.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: colors.secondary.main, fontWeight: 600, mb: 2 }}>
                    {leader.role}
                  </Typography>
                  <Chip 
                    label={leader.experience} 
                    size="small"
                    sx={{ bgcolor: alpha(colors.secondary.main, 0.1), color: colors.primary.main }} 
                  />
                </Paper>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Our Partners */}
      <Box sx={{ bgcolor: colors.neutral.white, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <SectionTitle variant="h3" sx={{ '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
              Our Technology Partners
            </SectionTitle>
            <Typography variant="body1" sx={{ color: colors.text.secondary }}>
              Collaborating with industry leaders to deliver the best solutions
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mb: 4 }}>
            {partners.map((partner, index) => (
              <Grow in={true} timeout={800} style={{ transitionDelay: `${index * 50}ms` }} key={index}>
                <PartnerChip elevation={0}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{partner.name}</Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: alpha(colors.primary.main, 0.6) }}>
                    {partner.category}
                  </Typography>
                </PartnerChip>
              </Grow>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Zoom in={true} timeout={800}>
              <StatCard>
                <Typography variant="h2" sx={{ fontSize: '3.5rem', fontWeight: 800, color: colors.secondary.main, mb: 2 }}>
                  500+
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Projects Completed</Typography>
                <Typography variant="body2" sx={{ color: alpha(colors.neutral.white, 0.7), mt: 2 }}>
                  Across 15+ industries
                </Typography>
              </StatCard>
            </Zoom>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Zoom in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
              <StatCard>
                <Typography variant="h2" sx={{ fontSize: '3.5rem', fontWeight: 800, color: colors.secondary.main, mb: 2 }}>
                  98%
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Client Retention</Typography>
                <Typography variant="body2" sx={{ color: alpha(colors.neutral.white, 0.7), mt: 2 }}>
                  Long-term partnerships
                </Typography>
              </StatCard>
            </Zoom>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Zoom in={true} timeout={800} style={{ transitionDelay: '400ms' }}>
              <StatCard>
                <Typography variant="h2" sx={{ fontSize: '3.5rem', fontWeight: 800, color: colors.secondary.main, mb: 2 }}>
                  50+
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Certified Experts</Typography>
                <Typography variant="body2" sx={{ color: alpha(colors.neutral.white, 0.7), mt: 2 }}>
                  Industry-certified team
                </Typography>
              </StatCard>
            </Zoom>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Zoom in={true} timeout={800} style={{ transitionDelay: '600ms' }}>
              <StatCard>
                <Typography variant="h2" sx={{ fontSize: '3.5rem', fontWeight: 800, color: colors.secondary.main, mb: 2 }}>
                  24/7
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Support Available</Typography>
                <Typography variant="body2" sx={{ color: alpha(colors.neutral.white, 0.7), mt: 2 }}>
                  Round-the-clock assistance
                </Typography>
              </StatCard>
            </Zoom>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: colors.primary.main, py: { xs: 8, md: 12 } }}>
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
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontWeight: 800, 
                    mb: 3, 
                    color: colors.neutral.white,
                    fontSize: { xs: '2rem', md: '3rem' },
                  }}
                >
                  Ready to Transform Your{' '}
                  <Box component="span" sx={{ color: colors.secondary.main }}>
                    Technology Infrastructure?
                  </Box>
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: alpha(colors.neutral.white, 0.8), 
                    mb: 5, 
                    fontSize: '1.2rem',
                    maxWidth: '800px',
                    mx: 'auto',
                  }}
                >
                  Let's discuss how our expertise can help your business achieve more with intelligent AV & IT solutions.
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
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
                      px: 5,
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: `0 20px 30px -10px ${alpha(colors.secondary.main, 0.5)}`,
                      },
                      transition: 'all 0.3s ease',
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
                      px: 5,
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: colors.secondary.main,
                        bgcolor: alpha(colors.secondary.main, 0.1),
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Explore Solutions
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUs;