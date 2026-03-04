import { Box, Container, Typography, Grid, Card, CardContent, Chip, Breadcrumbs, Avatar, Button, Paper, Divider, Fade, Zoom, Grow, alpha } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InsightsIcon from '@mui/icons-material/Insights';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

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

const CaseStudyCard = styled(Card)(({ theme, color }) => ({
  borderRadius: '32px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 30px 40px -20px ${alpha(color || colors.primary.main, 0.3)}`,
  },
}));

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  background: alpha(colors.secondary.main, 0.05),
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: alpha(colors.secondary.main, 0.1),
    transform: 'scale(1.05)',
  },
}));

const CaseStudies = () => {
  const cases = [
    {
      icon: <BusinessIcon />,
      title: 'Enterprise Headquarters – Unified Collaboration Deployment',
      client: 'Fortune 500 Financial Services',
      industry: 'Financial Services',
      challenge: 'A multi-floor corporate office required standardized Microsoft Teams-enabled meeting rooms with centralized control across 50+ meeting spaces.',
      solution: 'Integrated collaboration systems, professional audio calibration, centralized control programming with Crestron, seamless Microsoft Teams integration, and enterprise-grade networking.',
      outcome: 'Seamless hybrid collaboration for 1000+ employees, standardized user experience across all meeting rooms, reduced IT intervention by 60%, 40% increase in meeting efficiency.',
      metrics: [
        { label: 'Meeting Rooms', value: '50+' },
        { label: 'Efficiency Gain', value: '40%' },
        { label: 'IT Support Reduction', value: '60%' },
      ],
      color: colors.primary.main,
    },
    {
      icon: <SchoolIcon />,
      title: 'University Campus – Smart Classroom Infrastructure',
      client: 'Premier Engineering Institute',
      industry: 'Education',
      challenge: 'Upgrade 100+ legacy lecture halls into interactive, hybrid-enabled learning environments with centralized management.',
      solution: 'Interactive displays, wireless presentation platforms, campus-wide AV-over-IP architecture, lecture capture systems, and cloud-based management platform.',
      outcome: 'Enhanced student engagement with 85% positive feedback, hybrid learning capability for 5000+ students, scalable infrastructure for future expansion, 50% reduction in technical issues.',
      metrics: [
        { label: 'Classrooms', value: '100+' },
        { label: 'Student Reach', value: '5000+' },
        { label: 'Engagement Increase', value: '85%' },
      ],
      color: '#10b981',
    },
    {
      icon: <SecurityIcon />,
      title: 'Command & Control Center – Monitoring Environment',
      client: 'State Government Agency',
      industry: 'Government/Public Safety',
      challenge: 'Design a 24/7 mission-critical monitoring environment with large-format visualization, redundant systems, and secure networking.',
      solution: '24x7 video wall integration with redundant processors, dual-path fiber optic networking, centralized control platform with failover, and advanced cybersecurity measures.',
      outcome: 'High-availability operations with 99.99% uptime, real-time monitoring efficiency improved by 70%, secure infrastructure meeting government compliance, scalability for future expansion.',
      metrics: [
        { label: 'Uptime', value: '99.99%' },
        { label: 'Efficiency Gain', value: '70%' },
        { label: 'Security Compliance', value: '100%' },
      ],
      color: '#f59e0b',
    },
    {
      icon: <BusinessIcon />,
      title: 'Healthcare Facility – Digital Transformation',
      client: 'Multi-specialty Hospital Chain',
      industry: 'Healthcare',
      challenge: 'Modernize patient rooms, operation theaters, and consultation rooms with integrated AV/IT systems for improved patient care.',
      solution: 'Surgical video integration, patient entertainment systems, digital signage wayfinding, telemedicine capabilities, and secure network infrastructure.',
      outcome: 'Enhanced patient experience, improved doctor collaboration, successful telemedicine rollout across 10 facilities, 30% faster patient processing.',
      metrics: [
        { label: 'Facilities', value: '10' },
        { label: 'Patient Satisfaction', value: '+45%' },
        { label: 'Efficiency', value: '+30%' },
      ],
      color: '#8B5A2B',
    },
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
          }}>
            <HomeIcon sx={{ fontSize: 18 }} />
            Home
          </Link>
          <Link to="/about-us" style={{ textDecoration: 'none', color: alpha(colors.primary.main, 0.7) }}>
            About Us
          </Link>
          <Typography sx={{ color: colors.secondary.main, fontWeight: 600 }}>Case Studies</Typography>
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
                icon={<InsightsIcon />}
                label="Success Stories"
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
                Case Studies
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
                We design and deliver intelligent AV and IT ecosystems tailored to real-world enterprise challenges. 
                Explore how we've transformed businesses across industries.
              </Typography>
            </Box>
          </Fade>
        </Container>
      </HeroSection>

      {/* Case Studies Grid */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {cases.map((caseStudy, index) => (
            <Grid item xs={12} key={index}>
              <Zoom in={true} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                <CaseStudyCard elevation={0} color={caseStudy.color}>
                  <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                      <Avatar sx={{ bgcolor: alpha(caseStudy.color, 0.1), color: caseStudy.color, width: 64, height: 64 }}>
                        {caseStudy.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: colors.primary.main, mb: 1 }}>
                          {caseStudy.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                          <Chip 
                            label={caseStudy.client} 
                            size="small"
                            sx={{ bgcolor: alpha(caseStudy.color, 0.1), color: caseStudy.color }} 
                          />
                          <Chip 
                            label={caseStudy.industry} 
                            size="small"
                            sx={{ bgcolor: alpha(colors.secondary.main, 0.1), color: colors.secondary.dark }} 
                          />
                        </Box>
                      </Box>
                    </Box>

                    {/* Metrics */}
                    <Grid container spacing={2} sx={{ mb: 4 }}>
                      {caseStudy.metrics.map((metric, idx) => (
                        <Grid item xs={4} key={idx}>
                          <MetricCard elevation={0}>
                            <Typography variant="h5" sx={{ color: caseStudy.color, fontWeight: 700 }}>
                              {metric.value}
                            </Typography>
                            <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                              {metric.label}
                            </Typography>
                          </MetricCard>
                        </Grid>
                      ))}
                    </Grid>

                    {/* Challenge, Solution, Outcome */}
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ mb: { xs: 2, md: 0 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Avatar sx={{ bgcolor: '#fee2e2', color: '#ef4444', width: 32, height: 32 }}>
                              <LightbulbIcon sx={{ fontSize: 18 }} />
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: colors.primary.main }}>
                              Challenge
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: colors.text.secondary, lineHeight: 1.7 }}>
                            {caseStudy.challenge}
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Box sx={{ mb: { xs: 2, md: 0 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Avatar sx={{ bgcolor: alpha(colors.primary.main, 0.1), color: colors.primary.main, width: 32, height: 32 }}>
                              <InsightsIcon sx={{ fontSize: 18 }} />
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: colors.primary.main }}>
                              Solution
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: colors.text.secondary, lineHeight: 1.7 }}>
                            {caseStudy.solution}
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Avatar sx={{ bgcolor: alpha('#10b981', 0.1), color: '#10b981', width: 32, height: 32 }}>
                              <TrendingUpIcon sx={{ fontSize: 18 }} />
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: colors.primary.main }}>
                              Outcome
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: colors.text.secondary, lineHeight: 1.7 }}>
                            {caseStudy.outcome}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 4, bgcolor: alpha(colors.primary.main, 0.1) }} />

                    {/* Key Takeaways */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Chip 
                          icon={<CheckCircleIcon />} 
                          label="ROI Positive" 
                          size="small"
                          sx={{ bgcolor: alpha('#10b981', 0.1), color: '#10b981' }} 
                        />
                        <Chip 
                          icon={<CheckCircleIcon />} 
                          label="Scalable Solution" 
                          size="small"
                          sx={{ bgcolor: alpha(colors.primary.main, 0.1), color: colors.primary.main }} 
                        />
                        <Chip 
                          icon={<CheckCircleIcon />} 
                          label="Future-Ready" 
                          size="small"
                          sx={{ bgcolor: alpha(colors.secondary.main, 0.1), color: colors.secondary.dark }} 
                        />
                      </Box>
                      <Button
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          color: colors.secondary.main,
                          '&:hover': { gap: 1 },
                        }}
                      >
                        Read Full Case Study
                      </Button>
                    </Box>
                  </CardContent>
                </CaseStudyCard>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: colors.primary.main, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="xl">
          <Fade in={true} timeout={1000}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                bgcolor: 'transparent',
                textAlign: 'center',
                border: `1px solid ${alpha(colors.secondary.main, 0.2)}`,
                borderRadius: '48px',
              }}
            >
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3, 
                  color: colors.neutral.white,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                }}
              >
                Ready to Transform Your Business?
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: alpha(colors.neutral.white, 0.8), 
                  mb: 4, 
                  fontSize: '1.1rem',
                  maxWidth: '700px',
                  mx: 'auto',
                }}
              >
                Let's discuss how we can help you achieve similar results with intelligent AV & IT solutions
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
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
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  Start Your Project
                </Button>
                <Button
                  component={Link}
                  to="/our-solutions"
                  variant="outlined"
                  size="large"
                  sx={{
                    color: colors.neutral.white,
                    borderColor: alpha(colors.neutral.white, 0.3),
                    borderRadius: '12px',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      borderColor: colors.secondary.main,
                      bgcolor: alpha(colors.secondary.main, 0.1),
                    },
                  }}
                >
                  Explore Solutions
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default CaseStudies;