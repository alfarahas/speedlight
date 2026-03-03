import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Breadcrumbs,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Fade,
  Grow,
  Zoom,
} from '@mui/material';
import {
  Home as HomeIcon,
  Business as BusinessIcon,
  CheckCircle as CheckIcon,
  ArrowForward as ArrowForwardIcon,
  Speed as SpeedIcon,
  People as PeopleIcon,
  Timeline as TimelineIcon,
  EmojiObjects as IdeaIcon,
  Warning as WarningIcon,
  Build as BuildIcon,
  Security as SecurityIcon,
  School as SchoolIcon,
  LocalHospital as LocalHospitalIcon,
  LocationOn as LocationIcon,
  Verified as VerifiedIcon,
  SupportAgent as SupportIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { fetchIndustries } from '../services/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  color: 'white',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
    '& .service-icon': {
      color: '#2563eb',
      transform: 'scale(1.1)',
    },
  },
}));

const BenefitCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  textAlign: 'center',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: '#f8fafc',
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
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

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#2563eb',
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    '&.Mui-selected': {
      color: '#2563eb',
    },
  },
});

const IndustryDetail = () => {
  const { id } = useParams();
  const [industry, setIndustry] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch main industry
      const industriesData = await fetchIndustries();
      const foundIndustry = industriesData.find(i => (i._id || i.id) === id);
      
      if (!foundIndustry) {
        setError('Industry not found');
        return;
      }
      
      setIndustry(foundIndustry);

      // Fetch industry details
      try {
        const detailsRes = await axios.get(`${API_URL}/public/industry-details/${id}`);
        setDetails(detailsRes.data);
        console.log('Industry details:', detailsRes.data);
      } catch (err) {
        console.log('No additional details found, using mock data');
        // Use mock data if no details found
        setDetails(getMockIndustryDetails(foundIndustry.title || foundIndustry.name));
      }

      setError(null);
    } catch (err) {
      setError('Failed to load industry details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getMockIndustryDetails = (industryName) => {
    return {
      tagline: `Future-ready ${industryName} technology that empowers collaboration, simplifies operations, and protects your IT investment.`,
      description: `End-to-end design, deployment and support of integrated AV & IT systems for ${industryName.toLowerCase()} environments.`,
      overview: `Speedlight Infosolutions Pvt Ltd delivers turnkey AV and IT infrastructure for ${industryName.toLowerCase()}. We combine practical design, disciplined project execution and dependable support to deliver systems that are secure, intuitive and easy to operate. Our solutions are engineered for reliability, scalability and low total cost of ownership.`,
      coreServices: [
        {
          title: "Boardroom & Executive Meeting Rooms",
          description: "Full turnkey AV fit-out: cameras, DSP audio, microphones, displays and signal management.",
          details: [
            "Seamless presentation workflows and wireless content sharing",
            "Commissioning and acoustic tuning for optimal speech intelligibility"
          ],
          benefit: "Executive-grade meeting experiences with predictable performance.",
          icon: "🏢"
        },
        {
          title: "Unified Collaboration & Hybrid Meeting Solutions",
          description: "Certified meeting-room deployments, MTR and UC-ready rooms.",
          details: [
            "Intelligent camera and audio solutions for hybrid participation",
            "Simplified UX with one-touch meeting start and calendar integration"
          ],
          benefit: "Reliable hybrid meetings that reduce friction and travel.",
          icon: "💬"
        },
        {
          title: "Training Rooms & Collaboration Spaces",
          description: "Interactive displays, lecture capture and multi-zone audio.",
          details: [
            "Flexible AV configurations for instructor-led and workshop modes",
            "Recording and distribution workflows for on-demand training"
          ],
          benefit: "Higher engagement and repeatable training outcomes.",
          icon: "📚"
        },
        {
          title: "Digital Signage & Corporate Communications",
          description: "Lobby and internal comms displays, content scheduling and CMS integration.",
          details: [
            "Real-time dashboards for KPIs and operational messaging",
            "Managed rollouts across multiple locations"
          ],
          benefit: "Consistent, centrally managed corporate messaging.",
          icon: "📺"
        },
        {
          title: "Intelligent Room Control & Automation",
          description: "Centralized room control panels and scheduling integration.",
          details: [
            "Automated workflows: lighting, AV sources, blinds and presets",
            "Remote monitoring and health-check reporting"
          ],
          benefit: "Reduced operational complexity and faster incident resolution.",
          icon: "⚙️"
        },
        {
          title: "Enterprise Network & Connectivity for AV",
          description: "Structured cabling, enterprise switching, VLAN design and secure wireless.",
          details: [
            "AV-over-IP architecture and QoS planning for high-availability media",
            "Rack design, power planning and redundancy recommendations"
          ],
          benefit: "Network foundations that protect AV performance and security.",
          icon: "🌐"
        },
        {
          title: "System Lifecycle & Support",
          description: "Site survey, design documentation and installation.",
          details: [
            "Commissioning, user training and as-built documentation",
            "Preventive maintenance, remote diagnostics and SLA-based support"
          ],
          benefit: "Predictable uptime and longer equipment life.",
          icon: "🔧"
        }
      ],
      deliveryApproach: {
        title: "Our Delivery Approach",
        steps: [
          { title: "Discovery & Requirements", description: "Stakeholder workshops and technical site surveys", icon: "🔍" },
          { title: "Design & Documentation", description: "Scalable designs, BOM, schematics and deployment plan", icon: "📐" },
          { title: "Implementation & Commissioning", description: "Certified installation, integration and tuning", icon: "⚡" },
          { title: "Training & Handover", description: "User training, admin training and detailed documentation", icon: "📚" },
          { title: "Support & Optimization", description: "Preventive maintenance, upgrades and managed services", icon: "🛠️" }
        ]
      },
      deploymentLocations: [
        "Corporate headquarters & executive suites",
        "Regional and satellite offices",
        "Executive briefing centers and boardrooms",
        "Training & learning centers",
        "Collaboration hubs and innovation labs"
      ],
      whyChooseUs: [
        {
          point: "Single-vendor project accountability",
          description: "from design through support",
          icon: "🎯"
        },
        {
          point: "Experienced engineers",
          description: "with enterprise deployment discipline",
          icon: "👨‍💻"
        },
        {
          point: "Solutions tailored to operational workflows",
          description: "and security policies",
          icon: "⚙️"
        },
        {
          point: "Focus on usability",
          description: "intuitive controls and minimal training overhead",
          icon: "👍"
        },
        {
          point: "Transparent budget planning",
          description: "and lifecycle cost management",
          icon: "💰"
        },
        {
          point: "Fast, documented support processes",
          description: "and preventive maintenance programs",
          icon: "🚀"
        }
      ],
      stats: {
        projects: 150,
        clients: 75,
        experience: "15+ Years",
        satisfaction: "98%"
      },
      cta: {
        title: "Ready to Transform Your Corporate Environment?",
        description: "To discuss a site assessment, feasibility study or project proposal, contact Speedlight Infosolutions Pvt Ltd",
        primaryButton: {
          text: "Request a consultation",
          link: "/contact-us"
        },
        secondaryButton: {
          text: "Get a project proposal",
          link: "/get-started"
        }
      }
    };
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#2563eb' }} />
      </Box>
    );
  }

  if (error || !industry) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">{error || 'Industry not found'}</Alert>
        <Button
          component={Link}
          to="/industries-we-serve"
          variant="contained"
          sx={{ mt: 3, bgcolor: '#2563eb' }}
        >
          Back to Industries
        </Button>
      </Container>
    );
  }

  const industryDetails = details || getMockIndustryDetails(industry.title || industry.name);

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Breadcrumbs */}
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" style={{ textDecoration: 'none', color: '#64748b', display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
            Home
          </Link>
          <Link to="/industries-we-serve" style={{ textDecoration: 'none', color: '#64748b' }}>
            Industries
          </Link>
          <Typography color="#2563eb">{industry.title || industry.name}</Typography>
        </Breadcrumbs>
      </Container>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h1" sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700, 
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}>
                <span style={{ fontSize: '4rem' }}>{industry.icon}</span>
                {industry.title || industry.name}
              </Typography>
              <Typography variant="h5" sx={{ color: '#94a3b8', mb: 3, fontWeight: 500 }}>
                {industryDetails.tagline}
              </Typography>
              <Typography variant="body1" sx={{ color: '#cbd5e1', mb: 4, maxWidth: '800px', fontSize: '1.1rem' }}>
                {industryDetails.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to={industryDetails.cta?.primaryButton?.link || "/contact-us"}
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
                  {industryDetails.cta?.primaryButton?.text || "Request a consultation"}
                </Button>
                <Button
                  component={Link}
                  to={industryDetails.cta?.secondaryButton?.link || "/get-started"}
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
                  {industryDetails.cta?.secondaryButton?.text || "Get a project proposal"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard>
              <Typography variant="h2" sx={{ color: '#2563eb', fontWeight: 700, fontSize: '3rem' }}>
                {industryDetails.stats?.projects || 150}+
              </Typography>
              <Typography variant="h6">Projects Completed</Typography>
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard>
              <Typography variant="h2" sx={{ color: '#10b981', fontWeight: 700, fontSize: '3rem' }}>
                {industryDetails.stats?.clients || 75}+
              </Typography>
              <Typography variant="h6">Happy Clients</Typography>
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard>
              <Typography variant="h2" sx={{ color: '#f59e0b', fontWeight: 700, fontSize: '3rem' }}>
                {industryDetails.stats?.experience || '15+'}
              </Typography>
              <Typography variant="h6">Years Experience</Typography>
            </StatCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard>
              <Typography variant="h2" sx={{ color: '#ef4444', fontWeight: 700, fontSize: '3rem' }}>
                {industryDetails.stats?.satisfaction || '98%'}
              </Typography>
              <Typography variant="h6">Client Satisfaction</Typography>
            </StatCard>
          </Grid>
        </Grid>
      </Container>

      {/* Tabs Navigation */}
      <Container maxWidth="xl" sx={{ mb: 4 }}>
        <Paper sx={{ borderRadius: '50px', p: 1 }}>
          <StyledTabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Overview" />
            <Tab label="Core Services" />
            <Tab label="Delivery Approach" />
            <Tab label="Why Choose Us" />
          </StyledTabs>
        </Paper>
      </Container>

      {/* Tab Panels */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Overview Panel */}
        <Fade in={tabValue === 0} timeout={500}>
          <Box sx={{ display: tabValue === 0 ? 'block' : 'none' }}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: 5, bgcolor: '#f8fafc', borderRadius: '24px' }}>
                  <SectionTitle variant="h3">Overview</SectionTitle>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#1e293b' }}>
                    {industryDetails.overview}
                  </Typography>
                </Paper>
              </Grid>
              
              {/* Deployment Locations */}
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: 5, borderRadius: '24px' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#0f172a' }}>
                    Typical Deployment Locations
                  </Typography>
                  <Grid container spacing={2}>
                    {industryDetails.deploymentLocations?.map((location, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <LocationIcon sx={{ color: '#2563eb' }} />
                          <Typography>{location}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Fade>

        {/* Core Services Panel */}
        <Fade in={tabValue === 1} timeout={500}>
          <Box sx={{ display: tabValue === 1 ? 'block' : 'none' }}>
            <Grid container spacing={4}>
              {industryDetails.coreServices?.map((service, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Grow in={tabValue === 1} timeout={500 + index * 100}>
                    <ServiceCard>
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                          <Typography variant="h2" className="service-icon" sx={{ fontSize: '3rem', transition: 'all 0.3s' }}>
                            {service.icon}
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 600 }}>{service.title}</Typography>
                        </Box>
                        <Typography variant="body1" sx={{ mb: 3, color: '#475569' }}>
                          {service.description}
                        </Typography>
                        <List dense>
                          {service.details?.map((detail, idx) => (
                            <ListItem key={idx} sx={{ px: 0 }}>
                              <ListItemIcon sx={{ minWidth: 30 }}>
                                <CheckIcon sx={{ color: '#2563eb', fontSize: 20 }} />
                              </ListItemIcon>
                              <ListItemText primary={detail} />
                            </ListItem>
                          ))}
                        </List>
                        <Box sx={{ mt: 3, p: 2, bgcolor: '#dbeafe', borderRadius: '12px' }}>
                          <Typography variant="subtitle2" sx={{ color: '#2563eb', fontWeight: 600 }}>
                            Benefit:
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {service.benefit}
                          </Typography>
                        </Box>
                      </CardContent>
                    </ServiceCard>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Delivery Approach Panel */}
        <Fade in={tabValue === 2} timeout={500}>
          <Box sx={{ display: tabValue === 2 ? 'block' : 'none' }}>
            <Paper elevation={0} sx={{ p: 5, bgcolor: '#f8fafc', borderRadius: '24px' }}>
              <SectionTitle variant="h3">{industryDetails.deliveryApproach?.title}</SectionTitle>
              <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', color: '#1e293b' }}>
                We follow clear project governance, staged testing and sign-off milestones to ensure timely delivery and quality outcomes.
              </Typography>
              <Grid container spacing={3}>
                {industryDetails.deliveryApproach?.steps?.map((step, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                    <Paper elevation={2} sx={{ p: 3, textAlign: 'center', height: '100%', borderRadius: '16px' }}>
                      <Typography variant="h2" sx={{ fontSize: '2.5rem', mb: 2 }}>{step.icon}</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{step.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{step.description}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        </Fade>

        {/* Why Choose Us Panel */}
        <Fade in={tabValue === 3} timeout={500}>
          <Box sx={{ display: tabValue === 3 ? 'block' : 'none' }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: 5, borderRadius: '24px' }}>
                  <SectionTitle variant="h3">Why Clients Choose Speedlight</SectionTitle>
                  <Grid container spacing={3}>
                    {industryDetails.whyChooseUs?.map((item, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2 }}>
                          <Avatar sx={{ bgcolor: '#dbeafe', color: '#2563eb' }}>{item.icon}</Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>{item.point}</Typography>
                            <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>

              {/* Key Benefits */}
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: '#0f172a' }}>
                  Key Benefits
                </Typography>
                <Grid container spacing={3}>
                  {[
                    { icon: <VerifiedIcon />, title: 'Single-vendor accountability', desc: 'From design through support' },
                    { icon: <PeopleIcon />, title: 'Experienced engineers', desc: 'Enterprise deployment discipline' },
                    { icon: <SecurityIcon />, title: 'Tailored solutions', desc: 'Customized to your workflows' },
                    { icon: <SupportIcon />, title: 'Fast support', desc: 'Documented processes and SLA' },
                  ].map((benefit, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <BenefitCard elevation={2}>
                        <Avatar sx={{ bgcolor: '#2563eb', width: 56, height: 56, mb: 2, mx: 'auto' }}>
                          {benefit.icon}
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{benefit.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{benefit.desc}</Typography>
                      </BenefitCard>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>

      {/* Next Steps CTA */}
      <Box sx={{ bgcolor: '#0f172a', py: { xs: 6, md: 10 }, mt: 4 }}>
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
              {industryDetails.cta?.title || "Ready to Transform Your Industry?"}
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
              {industryDetails.cta?.description || "To discuss a site assessment, feasibility study or project proposal, contact Speedlight Infosolutions Pvt Ltd"}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to={industryDetails.cta?.primaryButton?.link || "/contact-us"}
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: '#2563eb',
                  '&:hover': { bgcolor: '#1d4ed8' },
                  borderRadius: '12px',
                  px: 4,
                  py: 1.5,
                }}
              >
                {industryDetails.cta?.primaryButton?.text || "Request a consultation"}
              </Button>
              <Button
                component={Link}
                to={industryDetails.cta?.secondaryButton?.link || "/get-started"}
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
                {industryDetails.cta?.secondaryButton?.text || "Get a project proposal"}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default IndustryDetail;