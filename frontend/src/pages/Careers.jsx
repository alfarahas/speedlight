import { Box, Container, Typography, Grid, Paper, Button, Breadcrumbs, List, ListItem, ListItemIcon, ListItemText, TextField, Alert, Avatar, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import EngineeringIcon from '@mui/icons-material/Engineering';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import CodeIcon from '@mui/icons-material/Code';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';

const HeroSection = styled(Box)(({ theme }) => ({
  background: '#0f172a',
  color: 'white',
  padding: theme.spacing(8, 0),
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
}));

const Careers = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const jobs = [
    {
      icon: <EngineeringIcon />,
      title: 'AV Installation Engineer',
      description: 'Experience in AV integration, cabling, rack assembly, and system commissioning.',
      type: 'Full-time',
    },
    {
      icon: <NetworkCheckIcon />,
      title: 'Network & Infrastructure Engineer',
      description: 'Experience in LAN/WAN setup, AV-over-IP architecture, and enterprise networking.',
      type: 'Full-time',
    },
    {
      icon: <CodeIcon />,
      title: 'AV Programmer / Control System Specialist',
      description: 'Experience in Crestron / AMX / Extron programming preferred.',
      type: 'Full-time',
    },
    {
      icon: <TrendingUpIcon />,
      title: 'Sales & Business Development Executive',
      description: 'Enterprise AV/IT solution selling experience preferred.',
      type: 'Full-time',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" style={{ textDecoration: 'none', color: '#64748b', display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
            Home
          </Link>
          <Link to="/about-us" style={{ textDecoration: 'none', color: '#64748b' }}>About Us</Link>
          <Typography color="#2563eb">Careers</Typography>
        </Breadcrumbs>
      </Container>

      <HeroSection>
        <Container maxWidth="xl">
          <Box sx={{ maxWidth: '800px' }}>
            <Typography variant="h1" sx={{ fontWeight: 700, mb: 2, color: 'white', fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              Careers at Speedlight Infosolutions
            </Typography>
            <Typography variant="h6" sx={{ color: '#94a3b8' }}>
              We are building intelligent technology environments across industries — and we are always looking for 
              passionate professionals who thrive in innovation-driven environments.
            </Typography>
          </Box>
        </Container>
      </HeroSection>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: '#0f172a' }}>Current Opportunities</Typography>
        <Grid container spacing={4}>
          {jobs.map((job, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={2} sx={{ p: 4, borderRadius: '16px', height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar sx={{ bgcolor: '#2563eb' }}>{job.icon}</Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>{job.title}</Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {job.description}
                </Typography>
                <Chip label={job.type} sx={{ bgcolor: '#dbeafe', color: '#2563eb' }} />
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Paper elevation={0} sx={{ p: 5, bgcolor: '#f8fafc', borderRadius: '24px' }}>
            <EmailIcon sx={{ fontSize: 48, color: '#2563eb', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Apply With Us</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Interested candidates may share their resume at:
            </Typography>
            <Typography variant="h5" sx={{ color: '#2563eb', fontWeight: 600, mb: 4 }}>
              careers@speedlightinfosolutions.com
            </Typography>
            
            {submitted && (
              <Alert severity="success" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                Thank you for your interest! We'll review your application.
              </Alert>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Careers;