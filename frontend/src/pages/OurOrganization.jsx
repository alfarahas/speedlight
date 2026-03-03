import { Box, Container, Typography, Grid, Paper, Avatar, Breadcrumbs, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupsIcon from '@mui/icons-material/Groups';
import HandshakeIcon from '@mui/icons-material/Handshake';

const HeroSection = styled(Box)(({ theme }) => ({
  background: '#0f172a',
  color: 'white',
  padding: theme.spacing(8, 0),
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
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

const OurOrganization = () => {
  const partners = [
    'Poly', 'Yealink', 'Logitech', 'Cisco', 'Microsoft Teams Rooms',
    'QSC', 'JBL', 'Bose', 'Biamp', 'Shure', 'Sennheiser', 'Yamaha',
    'Samsung', 'LG', 'Sony', 'ViewSonic', 'BenQ', 'Panasonic', 'NEC',
    'Crestron', 'Kramer', 'AMX', 'Extron', 'Barco', 'Netgear',
    'Juniper Networks', 'CommScope', 'Aruba'
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
          <Link to="/about-us" style={{ textDecoration: 'none', color: '#64748b' }}>About Us</Link>
          <Typography color="#2563eb">Our Organization</Typography>
        </Breadcrumbs>
      </Container>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="xl">
          <Box sx={{ maxWidth: '900px' }}>
            <Typography variant="h1" sx={{ fontWeight: 700, mb: 3, color: 'white', fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              Our Organization
            </Typography>
            <Typography variant="h6" sx={{ color: '#94a3b8', fontSize: '1.25rem', lineHeight: 1.6 }}>
              Engineering Intelligent AV & IT Ecosystems
            </Typography>
          </Box>
        </Container>
      </HeroSection>

      {/* Introduction */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 5, bgcolor: '#f8fafc', borderRadius: '24px' }}>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#1e293b' }}>
                Speedlight Infosolutions Pvt Ltd is a specialized technology integration company delivering 
                enterprise-grade Audio Visual (AV), Unified Collaboration, Networking, and Intelligent Control solutions.
                <br /><br />
                We partner with organizations to design, integrate, and support scalable technology environments 
                that enhance communication, collaboration, visualization, and operational control. From corporate 
                boardrooms and digital classrooms to command centers and large-scale event environments, we transform 
                physical spaces into intelligent, connected ecosystems.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Who We Are */}
      <Box sx={{ bgcolor: '#f8fafc', py: 8 }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <SectionTitle variant="h3">Who We Are</SectionTitle>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#1e293b', mb: 3 }}>
                We are solution architects and system integrators — not just equipment suppliers.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: 1.8, color: '#475569' }}>
                Our strength lies in understanding business objectives and translating them into performance-driven, 
                standards-compliant technology infrastructures engineered for reliability, scalability, and long-term value.
                <br /><br />
                By combining AV expertise with enterprise IT infrastructure capabilities, we deliver fully integrated 
                systems that operate seamlessly across modern workplaces.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Avatar sx={{ bgcolor: '#2563eb', width: 80, height: 80 }}><EngineeringIcon sx={{ fontSize: 40 }} /></Avatar>
                <Avatar sx={{ bgcolor: '#10b981', width: 80, height: 80 }}><GroupsIcon sx={{ fontSize: 40 }} /></Avatar>
                <Avatar sx={{ bgcolor: '#f59e0b', width: 80, height: 80 }}><HandshakeIcon sx={{ fontSize: 40 }} /></Avatar>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* What We Do */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <SectionTitle variant="h3">What We Do</SectionTitle>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', mb: 4, color: '#475569' }}>
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
              <Paper elevation={1} sx={{ p: 3, borderRadius: '12px', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#2563eb' }} />
                <Typography>{item}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Typography variant="body1" sx={{ mt: 4, fontSize: '1rem', color: '#475569' }}>
          Our services cover consultation, system design, engineering, installation, programming, commissioning, 
          and ongoing lifecycle support.
        </Typography>
      </Container>

      {/* Partners Section */}
      <Box sx={{ bgcolor: '#f8fafc', py: 8 }}>
        <Container maxWidth="xl">
          <SectionTitle variant="h3" sx={{ textAlign: 'center', '&::after': { left: '50%', transform: 'translateX(-50%)' } }}>
            Our Technology Ecosystem
          </SectionTitle>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mt: 4 }}>
            {partners.map((partner, index) => (
              <Paper key={index} elevation={1} sx={{ px: 3, py: 1.5, borderRadius: '30px', bgcolor: 'white' }}>
                <Typography variant="body2">{partner}</Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default OurOrganization;