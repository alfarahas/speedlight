import { Box, Container, Typography, Grid, Paper, Avatar, Breadcrumbs, Divider, Chip, Fade, Grow, Zoom, alpha, Button } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupsIcon from '@mui/icons-material/Groups';
import HandshakeIcon from '@mui/icons-material/Handshake';
import VerifiedIcon from '@mui/icons-material/Verified';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

const SectionTitle = styled(Typography)(({ theme, light }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(4),
  color: light ? colors.neutral.white : colors.primary.main,
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

const OurOrganization = () => {
  const partners = [
    'Crestron', 'Cisco', 'Microsoft Teams Rooms', 'Poly', 'Yealink', 'Logitech',
    'QSC', 'JBL', 'Bose', 'Biamp', 'Shure', 'Sennheiser', 'Yamaha',
    'Samsung', 'LG', 'Sony', 'ViewSonic', 'BenQ', 'Panasonic', 'NEC',
    'Kramer', 'AMX', 'Extron', 'Barco', 'Netgear',
    'Juniper Networks', 'Aruba', 'CommScope'
  ];

  const values = [
    { icon: <EngineeringIcon />, title: 'Technical Excellence', color: colors.primary.main },
    { icon: <GroupsIcon />, title: 'Collaborative Approach', color: colors.secondary.main },
    { icon: <HandshakeIcon />, title: 'Long-term Partnerships', color: colors.accent.main },
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
          <Typography sx={{ color: colors.secondary.main, fontWeight: 600 }}>Our Organization</Typography>
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
                label="Company Profile"
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
                Our Organization
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
                Engineering Intelligent AV & IT Ecosystems for Modern Enterprises
              </Typography>
            </Box>
          </Fade>
        </Container>
      </HeroSection>

      {/* Introduction */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Fade in={true} timeout={1200}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 4, md: 6 }, 
              bgcolor: colors.neutral.white,
              borderRadius: '32px',
              border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
            }}
          >
            <Typography variant="body1" sx={{ 
              fontSize: '1.1rem', 
              lineHeight: 1.8, 
              color: colors.text.secondary,
              mb: 3
            }}>
              <Box component="span" sx={{ color: colors.secondary.main, fontWeight: 700, fontSize: '1.2rem' }}>
                Speedlight Infosolutions Pvt Ltd
              </Box>{' '}
              is a specialized technology integration company delivering enterprise-grade Audio Visual (AV), 
              Unified Collaboration, Networking, and Intelligent Control solutions.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: colors.text.secondary }}>
              We partner with organizations to design, integrate, and support scalable technology environments 
              that enhance communication, collaboration, visualization, and operational control. From corporate 
              boardrooms and digital classrooms to command centers and large-scale event environments, we transform 
              physical spaces into intelligent, connected ecosystems.
            </Typography>
          </Paper>
        </Fade>
      </Container>

      {/* Who We Are */}
      <Box sx={{ bgcolor: colors.neutral.white, py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={800}>
                <Box>
                  <SectionTitle variant="h3">Who We Are</SectionTitle>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: colors.text.primary, mb: 3, fontWeight: 500 }}>
                    We are solution architects and system integrators — not just equipment suppliers.
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: 1.8, color: colors.text.secondary }}>
                    Our strength lies in understanding business objectives and translating them into performance-driven, 
                    standards-compliant technology infrastructures engineered for reliability, scalability, and long-term value.
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: 1.8, color: colors.text.secondary, mt: 2 }}>
                    By combining AV expertise with enterprise IT infrastructure capabilities, we deliver fully integrated 
                    systems that operate seamlessly across modern workplaces.
                  </Typography>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {values.map((item, index) => (
                    <Zoom key={index} in={true} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          textAlign: 'center',
                          background: alpha(item.color, 0.05),
                          border: `1px solid ${alpha(item.color, 0.2)}`,
                          borderRadius: '24px',
                          width: 140,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: `0 10px 20px -5px ${alpha(item.color, 0.3)}`,
                          },
                        }}
                      >
                        <Avatar sx={{ bgcolor: item.color, color: colors.neutral.white, width: 64, height: 64, mb: 2, mx: 'auto' }}>
                          {item.icon}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: colors.primary.main }}>
                          {item.title}
                        </Typography>
                      </Paper>
                    </Zoom>
                  ))}
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* What We Do */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <SectionTitle variant="h3">What We Do</SectionTitle>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', mb: 4, color: colors.text.secondary }}>
          We provide end-to-end integration services across:
        </Typography>
        <Grid container spacing={3}>
          {[
            'Workplace Collaboration & Microsoft Teams Room environments',
            'Professional Audio & Acoustic Systems',
            'Advanced Display & Visualization Technologies',
            'Enterprise Networking & AV-over-IP Architectures',
            'Intelligent Control & Automation Platforms',
            'Hybrid Event & Large-Scale AV Deployments',
          ].map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Grow in={true} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    borderRadius: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    background: alpha(colors.secondary.main, 0.05),
                    border: `1px solid ${alpha(colors.secondary.main, 0.1)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      background: alpha(colors.secondary.main, 0.1),
                    },
                  }}
                >
                  <Box sx={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    background: colors.secondary.gradient,
                  }} />
                  <Typography sx={{ color: colors.text.primary, fontWeight: 500 }}>{item}</Typography>
                </Paper>
              </Grow>
            </Grid>
          ))}
        </Grid>
        <Typography variant="body1" sx={{ mt: 4, fontSize: '1rem', color: colors.text.secondary, fontStyle: 'italic' }}>
          Our services cover consultation, system design, engineering, installation, programming, commissioning, 
          and ongoing lifecycle support.
        </Typography>
      </Container>

      {/* Partners Section */}
      <Box sx={{ bgcolor: colors.neutral.white, py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            Our Technology Ecosystem
          </SectionTitle>
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: 'center', 
              color: colors.text.secondary, 
              mb: 6, 
              maxWidth: '800px', 
              mx: 'auto' 
            }}
          >
            Powered by strategic partnerships with industry-leading manufacturers
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
            {partners.map((partner, index) => (
              <Grow key={index} in={true} timeout={800} style={{ transitionDelay: `${index * 50}ms` }}>
                <PartnerChip elevation={0}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{partner}</Typography>
                </PartnerChip>
              </Grow>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: colors.primary.main, py: { xs: 6, md: 8 } }}>
        <Container maxWidth="xl">
          <Fade in={true} timeout={1000}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: colors.neutral.white, fontWeight: 700, mb: 2 }}>
                Ready to Transform Your Technology Infrastructure?
              </Typography>
              <Typography variant="body1" sx={{ color: alpha(colors.neutral.white, 0.8), mb: 4, maxWidth: '700px', mx: 'auto' }}>
                Let's discuss how our expertise can help your organization achieve more.
              </Typography>
              <Button
                component={Link}
                to="/contact-us"
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
                Get in Touch
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default OurOrganization;