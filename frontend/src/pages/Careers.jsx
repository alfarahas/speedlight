import { Box, Container, Typography, Grid, Paper, Button, Breadcrumbs, List, ListItem, ListItemIcon, ListItemText, TextField, Alert, Avatar, Chip, Stack, Divider, IconButton, Fade, Zoom, Grow, alpha } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import EngineeringIcon from '@mui/icons-material/Engineering';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import CodeIcon from '@mui/icons-material/Code';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import SendIcon from '@mui/icons-material/Send';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';

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

const JobCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '24px',
  height: '100%',
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

const BenefitCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  textAlign: 'center',
  background: alpha(colors.primary.main, 0.02),
  border: `1px solid ${alpha(colors.secondary.main, 0.2)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: alpha(colors.secondary.main, 0.05),
    transform: 'translateY(-5px)',
  },
}));

const ApplySection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  background: `linear-gradient(135deg, ${alpha(colors.primary.main, 0.02)} 0%, ${alpha(colors.secondary.main, 0.05)} 100%)`,
  borderRadius: '32px',
  border: `1px solid ${alpha(colors.secondary.main, 0.2)}`,
  position: 'relative',
  overflow: 'hidden',
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
      location: 'Mumbai',
      experience: '2-4 years',
      department: 'Engineering',
    },
    {
      icon: <NetworkCheckIcon />,
      title: 'Network & Infrastructure Engineer',
      description: 'Experience in LAN/WAN setup, AV-over-IP architecture, and enterprise networking.',
      type: 'Full-time',
      location: 'Pune',
      experience: '3-5 years',
      department: 'Infrastructure',
    },
    {
      icon: <CodeIcon />,
      title: 'AV Programmer / Control System Specialist',
      description: 'Experience in Crestron / AMX / Extron programming preferred.',
      type: 'Full-time',
      location: 'Bangalore',
      experience: '3-6 years',
      department: 'Programming',
    },
    {
      icon: <TrendingUpIcon />,
      title: 'Sales & Business Development Executive',
      description: 'Enterprise AV/IT solution selling experience preferred.',
      type: 'Full-time',
      location: 'Mumbai',
      experience: '3-5 years',
      department: 'Sales',
    },
    {
      icon: <WorkIcon />,
      title: 'Project Manager - AV/IT',
      description: 'Experience managing enterprise technology projects from conception to delivery.',
      type: 'Full-time',
      location: 'Delhi NCR',
      experience: '5-8 years',
      department: 'Project Management',
    },
    {
      icon: <SchoolIcon />,
      title: 'Technical Trainer',
      description: 'Develop and deliver technical training programs for internal teams and clients.',
      type: 'Full-time',
      location: 'Remote',
      experience: '4-6 years',
      department: 'Learning & Development',
    },
  ];

  const benefits = [
    { icon: <BusinessCenterIcon />, title: 'Competitive Salary', description: 'Industry-leading compensation packages' },
    { icon: <SchoolIcon />, title: 'Learning & Development', description: 'Continuous upskilling opportunities' },
    { icon: <PeopleIcon />, title: 'Collaborative Culture', description: 'Work with industry experts' },
    { icon: <AccessTimeIcon />, title: 'Flexible Hours', description: 'Work-life balance prioritized' },
    { icon: <LocationOnIcon />, title: 'Multiple Locations', description: 'PAN India presence' },
    { icon: <CheckCircleIcon />, title: 'Health Insurance', description: 'Comprehensive coverage' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

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
          }}>
            <HomeIcon sx={{ fontSize: 18 }} />
            Home
          </Link>
          <Link to="/about-us" style={{ textDecoration: 'none', color: alpha(colors.primary.main, 0.7) }}>
            About Us
          </Link>
          <Typography sx={{ color: colors.secondary.main, fontWeight: 600 }}>Careers</Typography>
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
                icon={<PeopleIcon />}
                label="Join Our Team"
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
                Careers at{' '}
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
                We are building intelligent technology environments across industries — and we are always looking for 
                passionate professionals who thrive in innovation-driven environments.
              </Typography>
            </Box>
          </Fade>
        </Container>
      </HeroSection>

      {/* Why Join Us */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: colors.primary.main }}>
            Why Join Us?
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.secondary, maxWidth: '800px', mx: 'auto', fontSize: '1.1rem' }}>
            Build your career with industry leaders and work on cutting-edge technology projects
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Grow in={true} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                <BenefitCard elevation={0}>
                  <Avatar sx={{ bgcolor: colors.secondary.main, color: colors.primary.main, width: 56, height: 56, mb: 2, mx: 'auto' }}>
                    {benefit.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: colors.primary.main }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                    {benefit.description}
                  </Typography>
                </BenefitCard>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Current Opportunities */}
      <Box sx={{ bgcolor: colors.neutral.white, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: colors.primary.main }}>
              Current Opportunities
            </Typography>
            <Typography variant="body1" sx={{ color: colors.text.secondary, maxWidth: '800px', mx: 'auto', fontSize: '1.1rem' }}>
              Join our team of experts and work on transformative technology projects
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {jobs.map((job, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Zoom in={true} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                  <JobCard elevation={0}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Avatar sx={{ bgcolor: alpha(colors.secondary.main, 0.1), color: colors.secondary.main, width: 56, height: 56 }}>
                        {job.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: colors.primary.main }}>
                          {job.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: colors.secondary.main, fontWeight: 500 }}>
                          {job.department}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                      {job.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 3 }}>
                      <Chip 
                        icon={<BusinessCenterIcon />} 
                        label={job.type} 
                        size="small"
                        sx={{ bgcolor: alpha(colors.primary.main, 0.05), color: colors.primary.main }} 
                      />
                      <Chip 
                        icon={<LocationOnIcon />} 
                        label={job.location} 
                        size="small"
                        sx={{ bgcolor: alpha(colors.secondary.main, 0.1), color: colors.secondary.dark }} 
                      />
                      <Chip 
                        icon={<AccessTimeIcon />} 
                        label={job.experience} 
                        size="small"
                        sx={{ bgcolor: alpha(colors.accent.main, 0.05), color: colors.accent.main }} 
                      />
                    </Box>
                    
                    <Button
                      variant="outlined"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        borderColor: colors.secondary.main,
                        color: colors.primary.main,
                        '&:hover': {
                          borderColor: colors.secondary.dark,
                          bgcolor: alpha(colors.secondary.main, 0.05),
                        },
                      }}
                    >
                      Apply Now
                    </Button>
                  </JobCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Application Process */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={800}>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: colors.primary.main }}>
                  Our Application Process
                </Typography>
                <List sx={{ '& .MuiListItem-root': { mb: 2 } }}>
                  {[
                    { step: '1', title: 'Submit Application', description: 'Share your resume and cover letter' },
                    { step: '2', title: 'Initial Screening', description: 'Phone/video interview with HR' },
                    { step: '3', title: 'Technical Assessment', description: 'Skill evaluation and problem-solving' },
                    { step: '4', title: 'Team Interview', description: 'Meet with potential team members' },
                    { step: '5', title: 'Offer & Onboarding', description: 'Welcome to the Speedlight family' },
                  ].map((item, index) => (
                    <ListItem key={index} sx={{ alignItems: 'flex-start' }}>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: colors.secondary.main, color: colors.primary.main, width: 32, height: 32, fontSize: '1rem' }}>
                          {item.step}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography variant="h6" sx={{ fontWeight: 600, color: colors.primary.main }}>{item.title}</Typography>}
                        secondary={<Typography variant="body2" sx={{ color: colors.text.secondary }}>{item.description}</Typography>}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
              <ApplySection elevation={0}>
                <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                  <EmailIcon sx={{ fontSize: 64, color: colors.secondary.main, mb: 3 }} />
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: colors.primary.main }}>
                    Apply With Us
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 4, color: colors.text.secondary, maxWidth: 400, mx: 'auto' }}>
                    Interested candidates may share their resume at:
                  </Typography>
                  
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 3, 
                      mb: 4, 
                      bgcolor: colors.neutral.white,
                      border: `2px dashed ${colors.secondary.main}`,
                      borderRadius: '16px',
                      display: 'inline-block',
                    }}
                  >
                    <Typography variant="h5" sx={{ color: colors.secondary.main, fontWeight: 600 }}>
                      careers@speedlightinfosolutions.com
                    </Typography>
                  </Paper>

                  {submitted && (
                    <Alert 
                      severity="success" 
                      sx={{ 
                        mb: 3, 
                        maxWidth: 400, 
                        mx: 'auto',
                        bgcolor: alpha(colors.secondary.main, 0.1),
                        color: colors.primary.main,
                        '& .MuiAlert-icon': { color: colors.secondary.main },
                      }}
                    >
                      Thank you for your interest! We'll review your application.
                    </Alert>
                  )}
                  
                  <Typography variant="body2" sx={{ color: alpha(colors.primary.main, 0.6) }}>
                    We look forward to hearing from you!
                  </Typography>
                </Box>
              </ApplySection>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Careers;