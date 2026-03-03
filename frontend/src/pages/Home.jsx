import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SolutionsList from '../components/dynamic/SolutionsList';
import IndustriesList from '../components/dynamic/IndustriesList';

const HeroSection = styled(Box)(({ theme }) => ({
  width: '100%',
  background: '#0f172a',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(15,23,42,0.85) 100%)',
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2034&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.15,
    zIndex: 0,
  },
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

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  fontSize: '2rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  maxWidth: '800px',
  marginLeft: 'auto',
  marginRight: 'auto',
  color: theme.palette.text.secondary,
  fontSize: '1.1rem',
}));

const Home = () => {
  const whyChooseUs = [
    "Enterprise-focused design approach",
    "Vendor-neutral technology advisory",
    "Certified engineering & installation teams",
    "Scalable and future-ready architecture",
    "Long-term lifecycle support",
    "Proven multi-domain integration capability"
  ];

  const approachSteps = [
    { number: "01", title: "Consult", description: "Requirement analysis and environment assessment." },
    { number: "02", title: "Design", description: "Custom architecture and system planning." },
    { number: "03", title: "Integrate", description: "Professional installation and system configuration." },
    { number: "04", title: "Optimize", description: "Testing, calibration, and performance validation." },
    { number: "05", title: "Support", description: "Lifecycle management and technical assistance." }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <ContentWrapper>
            <Typography 
              variant="h1" 
              sx={{ 
                color: 'white',
                mb: 3,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                maxWidth: '1000px',
              }}
            >
              Engineering Intelligent{' '}
              <Box component="span" sx={{ color: '#2563eb' }}>
                AV & IT Ecosystems
              </Box>{' '}
              for Modern Enterprises
            </Typography>
            
            <Typography 
              sx={{ 
                color: '#94a3b8',
                mb: 3,
                maxWidth: '800px',
                fontSize: { xs: '1rem', md: '1.25rem' },
                lineHeight: 1.6,
              }}
            >
              We design, integrate, and support advanced Audio-Visual and Enterprise IT infrastructures 
              that enable seamless collaboration, secure connectivity, and intelligent control across 
              corporate, institutional, and premium environments.
            </Typography>
            
            <Typography 
              sx={{ 
                color: '#94a3b8',
                mb: 4,
                maxWidth: '700px',
              }}
            >
              From boardrooms to control rooms, from enterprise campuses to smart residences — we deliver 
              performance-driven, future-ready technology ecosystems.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
              <Button
                component={Link}
                to="/our-solutions"
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
                Explore Solutions
              </Button>
              <Button
                component={Link}
                to="/contact-us"
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
                Contact Us
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ color: '#2563eb', fontSize: '1.5rem' }}>🔹</Box>
              <Typography sx={{ color: '#94a3b8' }}>
                Design. Integrate. Optimize. Support.
              </Typography>
            </Box>
          </ContentWrapper>
        </HeroContent>
      </HeroSection>

      {/* Core Expertise Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
        <ContentWrapper>
          <SectionTitle variant="h2">Our Core Expertise</SectionTitle>
          <SectionSubtitle>
            We provide end-to-end technology integration across six specialized domains
          </SectionSubtitle>

          <SolutionsList limit={6} />
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              component={Link}
              to="/our-solutions"
              variant="outlined"
              sx={{
                borderColor: '#2563eb',
                color: '#2563eb',
                '&:hover': {
                  borderColor: '#1d4ed8',
                  bgcolor: 'rgba(37,99,235,0.04)',
                },
                borderRadius: '12px',
                px: 4,
                py: 1.5,
              }}
            >
              View All Solutions
            </Button>
          </Box>
        </ContentWrapper>
      </Box>

      {/* Why Choose Us Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#f8fafc' }}>
        <ContentWrapper>
          <SectionTitle variant="h2">Why Speedlight Infosolutions?</SectionTitle>
          <SectionSubtitle>
            We don't just install systems — we engineer intelligent environments.
          </SectionSubtitle>

          <Grid container spacing={3}>
            {whyChooseUs.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: 2,
                  p: 2,
                  bgcolor: 'white',
                  borderRadius: '12px',
                  height: '100%',
                }}>
                  <Box sx={{ color: '#2563eb', fontSize: '1.25rem' }}>✔</Box>
                  <Typography variant="body1">{item}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </ContentWrapper>
      </Box>

      {/* Industries We Serve Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
        <ContentWrapper>
          <SectionTitle variant="h2">Industries We Serve</SectionTitle>
          <IndustriesList />
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              component={Link}
              to="/industries-we-serve"
              variant="outlined"
              sx={{
                borderColor: '#2563eb',
                color: '#2563eb',
                '&:hover': {
                  borderColor: '#1d4ed8',
                  bgcolor: 'rgba(37,99,235,0.04)',
                },
                borderRadius: '12px',
                px: 4,
                py: 1.5,
              }}
            >
              View All Industries
            </Button>
          </Box>
        </ContentWrapper>
      </Box>

      {/* Our Approach Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#f8fafc' }}>
        <ContentWrapper>
          <SectionTitle variant="h2">Our Approach</SectionTitle>

          <Grid container spacing={3}>
            {approachSteps.map((step, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: '16px',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 16,
                      fontSize: '4rem',
                      fontWeight: 700,
                      color: '#2563eb',
                      opacity: 0.1,
                    }}
                  >
                    {step.number}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, position: 'relative' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ position: 'relative' }}>
                    {step.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </ContentWrapper>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#0f172a' }}>
        <ContentWrapper>
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h2" 
              sx={{ 
                color: 'white',
                mb: 3,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                fontWeight: 700,
              }}
            >
              Let's Build the Future of Intelligent Spaces
            </Typography>
            <Typography 
              sx={{ 
                color: '#94a3b8',
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
              sx={{ 
                bgcolor: '#2563eb',
                '&:hover': { bgcolor: '#1d4ed8' },
                borderRadius: '12px',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
              }}
            >
              Get Started Today
            </Button>
          </Box>
        </ContentWrapper>
      </Box>
    </Box>
  );
};

export default Home;