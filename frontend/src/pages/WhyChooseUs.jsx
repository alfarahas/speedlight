import { Box, Container, Typography, Grid, Paper, Avatar, Breadcrumbs, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HandshakeIcon from '@mui/icons-material/Handshake';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import GroupIcon from '@mui/icons-material/Group';

const HeroSection = styled(Box)(({ theme }) => ({
  background: '#0f172a',
  color: 'white',
  padding: theme.spacing(8, 0),
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
}));

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <EngineeringIcon sx={{ fontSize: 40 }} />,
      title: 'True System Integration Expertise',
      description: 'We don\'t assemble products. We architect complete technology ecosystems.',
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 40 }} />,
      title: 'Strategic Partnerships',
      description: 'Powered by industry-leading manufacturers ensuring international standards.',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Engineering-Driven Methodology',
      description: 'Consult → Design → Integrate → Test → Commission → Support',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Scalable & Future-Ready Architecture',
      description: 'Designed to evolve with emerging technologies.',
    },
  ];

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" style={{ textDecoration: 'none', color: '#64748b', display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
            Home
          </Link>
          <Link to="/about-us" style={{ textDecoration: 'none', color: '#64748b' }}>About Us</Link>
          <Typography color="#2563eb">Why Choose Us</Typography>
        </Breadcrumbs>
      </Container>

      <HeroSection>
        <Container maxWidth="xl">
          <Box sx={{ maxWidth: '800px' }}>
            <Typography variant="h1" sx={{ fontWeight: 700, mb: 2, color: 'white', fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              Why Choose Us
            </Typography>
            <Typography variant="h5" sx={{ color: '#94a3b8' }}>
              Engineered for Performance. Designed for Reliability. Built for Scale.
            </Typography>
          </Box>
        </Container>
      </HeroSection>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {reasons.map((reason, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={2} sx={{ p: 4, borderRadius: '16px', height: '100%' }}>
                <Avatar sx={{ bgcolor: '#2563eb', width: 64, height: 64, mb: 3 }}>{reason.icon}</Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>{reason.title}</Typography>
                <Typography variant="body1" color="text.secondary">{reason.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: '#0f172a' }}>Our Commitment</Typography>
          <Paper elevation={0} sx={{ p: 5, bgcolor: '#f8fafc', borderRadius: '24px' }}>
            <List>
              {[
                'Intelligent system architecture',
                'Operational efficiency',
                'Enterprise-level security',
                'Measurable return on technology investment'
              ].map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon><CheckCircleIcon sx={{ color: '#2563eb' }} /></ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;