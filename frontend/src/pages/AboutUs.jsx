import { Box, Container, Typography, Grid, Paper, Avatar, Divider, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HandshakeIcon from '@mui/icons-material/Handshake';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

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

const ValueCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  textAlign: 'center',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
  },
}));

const PartnerChip = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  backgroundColor: '#f8fafc',
  borderRadius: '30px',
  transition: 'all 0.3s ease',
  textAlign: 'center',
  '&:hover': {
    backgroundColor: '#2563eb',
    color: 'white',
    transform: 'scale(1.05)',
  },
}));

const AboutUs = () => {
  const values = [
    {
      icon: <EngineeringIcon sx={{ fontSize: 40 }} />,
      title: 'Enterprise-focused design',
      description: 'Tailored solutions for complex business requirements',
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 40 }} />,
      title: 'Vendor-neutral advisory',
      description: 'Unbiased recommendations for optimal solutions',
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      title: 'Certified engineering teams',
      description: 'Industry-certified professionals for flawless execution',
    },
  ];

  const partners = [
    'Poly', 'Yealink', 'Logitech', 'Cisco', 'Microsoft',
    'QSC', 'JBL', 'Bose', 'Biamp', 'Shure', 'Sennheiser', 'Yamaha',
    'Samsung', 'LG', 'Sony', 'ViewSonic', 'BenQ', 'Epson', 'Panasonic', 'NEC',
    'Crestron', 'AMX', 'Extron', 'Kramer', 'Barco',
    'Netgear', 'Juniper Networks', 'Aruba', 'CommScope'
  ];

  const timeline = [
    { year: '2010', event: 'Company Founded' },
    { year: '2013', event: 'Expanded to PAN India' },
    { year: '2016', event: 'Launched Enterprise Solutions' },
    { year: '2019', event: 'Crossed 500+ Projects' },
    { year: '2022', event: 'Opened International Operations' },
    { year: '2024', event: 'Serving 10+ Industries Globally' },
  ];

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Breadcrumbs */}
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" style={{ textDecoration: 'none', color: '#64748b', display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
            Home
          </Link>
          <Typography color="#2563eb">About Us</Typography>
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
                mb: 3, 
                color: 'white',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              About Speedlight Infosolutions
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#94a3b8',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.6,
              }}
            >
              Engineering intelligent AV & IT ecosystems for modern enterprises since 2010
            </Typography>
          </Box>
        </Container>
      </HeroSection>

      {/* Mission & Vision */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 4, md: 6 }, 
                height: '100%',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #2563eb10 0%, #0f172a10 100%)',
              }}
            >
              <Avatar sx={{ bgcolor: '#2563eb', width: 56, height: 56, mb: 3 }}>
                <EmojiObjectsIcon />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#0f172a' }}>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#1e293b' }}>
                To design, integrate, and support advanced Audio-Visual and Enterprise IT infrastructures 
                that enable seamless collaboration, secure connectivity, and intelligent control across 
                corporate, institutional, and premium environments.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 4, md: 6 }, 
                height: '100%',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #10b98110 0%, #0f172a10 100%)',
              }}
            >
              <Avatar sx={{ bgcolor: '#10b981', width: 56, height: 56, mb: 3 }}>
                <VisibilityIcon />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#0f172a' }}>
                Our Vision
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#1e293b' }}>
                To be the most trusted partner for enterprises seeking future-ready technology ecosystems, 
                delivering innovation, reliability, and excellence in every project.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Why Choose Us */}
      <Box sx={{ bgcolor: '#f8fafc', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <SectionTitle variant="h3" align="center" sx={{ '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            Why Choose Us?
          </SectionTitle>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {values.map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <ValueCard elevation={2}>
                  <Avatar sx={{ bgcolor: '#2563eb', width: 64, height: 64, mb: 3, mx: 'auto' }}>
                    {value.icon}
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {value.description}
                  </Typography>
                </ValueCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Company Timeline */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <SectionTitle variant="h3">Our Journey</SectionTitle>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {timeline.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  borderRadius: '16px',
                  borderLeft: '4px solid #2563eb',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateX(8px)',
                  },
                }}
              >
                <Typography variant="h4" sx={{ color: '#2563eb', fontWeight: 700, mb: 1 }}>
                  {item.year}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {item.event}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Our Partners */}
      <Box sx={{ bgcolor: '#f8fafc', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <SectionTitle variant="h3" align="center" sx={{ '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            Our Technology Partners
          </SectionTitle>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mt: 4 }}>
            {partners.map((partner, index) => (
              <PartnerChip key={index} elevation={1}>
                <Typography variant="body2">{partner}</Typography>
              </PartnerChip>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
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
                500+
              </Typography>
              <Typography variant="h6">Projects Completed</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                bgcolor: '#f8fafc',
                borderRadius: '16px',
              }}
            >
              <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 700, color: '#10b981' }}>
                100+
              </Typography>
              <Typography variant="h6">Happy Clients</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                bgcolor: '#f8fafc',
                borderRadius: '16px',
              }}
            >
              <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 700, color: '#f59e0b' }}>
                50+
              </Typography>
              <Typography variant="h6">Certified Experts</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                bgcolor: '#f8fafc',
                borderRadius: '16px',
              }}
            >
              <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 700, color: '#ef4444' }}>
                24/7
              </Typography>
              <Typography variant="h6">Support Available</Typography>
            </Paper>
          </Grid>
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
              Ready to Work With Us?
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
              Let's discuss how we can help transform your technology infrastructure
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
                Contact Us
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

export default AboutUs;