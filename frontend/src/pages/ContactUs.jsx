import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Breadcrumbs,
  Avatar,
  Divider,
  Alert,
  Snackbar,
  Chip,
  Fade,
  Zoom,
  Grow,
  alpha,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import BusinessIcon from '@mui/icons-material/Business';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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

const ContactCard = styled(Paper)(({ theme, bgcolor }) => ({
  padding: theme.spacing(3),
  height: '100%',
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
    background: bgcolor || colors.secondary.gradient,
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

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: alpha(colors.neutral.white, 0.9),
    transition: 'all 0.3s ease',
    '&:hover fieldset': {
      borderColor: colors.secondary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: colors.secondary.main,
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: colors.secondary.main,
  },
});

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(colors.secondary.main, 0.1),
  color: colors.secondary.main,
  margin: theme.spacing(0, 1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: colors.secondary.main,
    color: colors.primary.main,
    transform: 'translateY(-5px)',
  },
}));

const CopyButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(colors.primary.main, 0.05),
  color: colors.primary.main,
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: alpha(colors.secondary.main, 0.1),
    color: colors.secondary.main,
  },
}));

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setSnackbar({
      open: true,
      message: 'Message sent successfully! We\'ll get back to you within 24 hours.',
      severity: 'success'
    });
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactInfo = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 30 }} />,
      title: 'Visit Us',
      details: ['501, Techno Park, Andheri East', 'Mumbai, Maharashtra 400093', 'India'],
      color: colors.primary.main,
      bgColor: alpha(colors.primary.main, 0.1),
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 30 }} />,
      title: 'Call Us',
      details: ['+91 22 4123 4567', '+91 98765 43210'],
      color: colors.secondary.main,
      bgColor: alpha(colors.secondary.main, 0.1),
    },
    {
      icon: <EmailIcon sx={{ fontSize: 30 }} />,
      title: 'Email Us',
      details: ['info@speedlight.com', 'support@speedlight.com'],
      color: colors.accent.main,
      bgColor: alpha(colors.accent.main, 0.1),
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 30 }} />,
      title: 'Business Hours',
      details: ['Mon-Fri: 9:00 AM - 7:00 PM', 'Sat: 10:00 AM - 4:00 PM', 'Sunday: Closed'],
      color: '#10b981',
      bgColor: alpha('#10b981', 0.1),
    },
  ];

  const faqs = [
    {
      question: 'How quickly do you respond to inquiries?',
      answer: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, please mention "URGENT" in your message subject.',
    },
    {
      question: 'Do you offer emergency support?',
      answer: 'Yes, we provide 24/7 emergency support for our enterprise clients with dedicated support agreements.',
    },
    {
      question: 'Can I schedule a consultation?',
      answer: 'Absolutely! Fill out the form and mention "consultation" in your message. We offer 30-minute strategy calls free of charge.',
    },
    {
      question: 'Do you serve clients outside India?',
      answer: 'Yes, we have international operations and serve clients globally across 15+ countries.',
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
          <Typography sx={{ color: colors.secondary.main, fontWeight: 600 }}>Contact Us</Typography>
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
                label="Get in Touch"
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
                Contact{' '}
                <Box 
                  component="span" 
                  sx={{ 
                    background: colors.secondary.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Us
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
                Let's discuss how we can help transform your technology infrastructure. 
                Our team of experts is ready to assist you with your AV and IT needs.
              </Typography>
            </Box>
          </Fade>
        </Container>
      </HeroSection>

      {/* Contact Info Cards */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={3}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Grow in={true} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                <ContactCard elevation={0} bgcolor={info.color}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: info.bgColor, color: info.color, width: 72, height: 72, mb: 2 }}>
                      {info.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: colors.primary.main }}>
                      {info.title}
                    </Typography>
                    {info.details.map((detail, idx) => (
                      <Typography key={idx} variant="body2" sx={{ color: colors.text.secondary, mb: 0.5 }}>
                        {detail}
                      </Typography>
                    ))}
                    {info.title === 'Email Us' && (
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Tooltip title="Copy email">
                          <CopyButton size="small" onClick={() => handleCopyEmail(info.details[0])}>
                            <ContentCopyIcon fontSize="small" />
                          </CopyButton>
                        </Tooltip>
                      </Box>
                    )}
                  </Box>
                </ContactCard>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form & Map */}
      <Box sx={{ bgcolor: colors.neutral.white, py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={800}>
                <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: '32px', border: `1px solid ${alpha(colors.primary.main, 0.1)}` }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: colors.primary.main }}>
                    Send us a message
                  </Typography>
                  <Typography variant="body1" sx={{ color: colors.text.secondary, mb: 4, fontSize: '1.1rem' }}>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </Typography>

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <StyledTextField
                          fullWidth
                          label="Your Name *"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <StyledTextField
                          fullWidth
                          label="Your Email *"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <StyledTextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <StyledTextField
                          fullWidth
                          label="Company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <StyledTextField
                          fullWidth
                          label="Your Message *"
                          name="message"
                          multiline
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          endIcon={<SendIcon />}
                          sx={{
                            background: colors.secondary.gradient,
                            color: colors.primary.main,
                            borderRadius: '12px',
                            py: 2,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            '&:hover': {
                              transform: 'scale(1.02)',
                              boxShadow: `0 10px 20px -5px ${alpha(colors.secondary.main, 0.3)}`,
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </form>

                  {/* Social Links */}
                  <Divider sx={{ my: 4, bgcolor: alpha(colors.primary.main, 0.1) }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <SocialButton>
                      <WhatsAppIcon />
                    </SocialButton>
                    <SocialButton>
                      <LinkedInIcon />
                    </SocialButton>
                    <SocialButton>
                      <TwitterIcon />
                    </SocialButton>
                    <SocialButton>
                      <FacebookIcon />
                    </SocialButton>
                  </Box>
                </Paper>
              </Fade>
            </Grid>

            {/* Map Section */}
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
                <Paper elevation={0} sx={{ height: '100%', minHeight: 600, borderRadius: '32px', overflow: 'hidden', border: `1px solid ${alpha(colors.primary.main, 0.1)}` }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.67292864864!2d72.71648495!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Office Location"
                  />
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: colors.primary.main }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.secondary, maxWidth: '800px', mx: 'auto' }}>
            Find quick answers to common questions about our services and support
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {faqs.map((faq, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Zoom in={true} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    borderRadius: '20px',
                    border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: colors.secondary.main,
                      boxShadow: `0 10px 20px -5px ${alpha(colors.secondary.main, 0.2)}`,
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: colors.primary.main }}>
                    {faq.question}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.text.secondary, lineHeight: 1.7 }}>
                    {faq.answer}
                  </Typography>
                </Paper>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Trust Badges */}
      <Box sx={{ bgcolor: colors.primary.main, py: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item>
              <Chip
                icon={<CheckCircleIcon />}
                label="24/7 Support Available"
                sx={{ bgcolor: alpha(colors.neutral.white, 0.1), color: colors.neutral.white }}
              />
            </Grid>
            <Grid item>
              <Chip
                icon={<CheckCircleIcon />}
                label="ISO 27001 Certified"
                sx={{ bgcolor: alpha(colors.neutral.white, 0.1), color: colors.neutral.white }}
              />
            </Grid>
            <Grid item>
              <Chip
                icon={<CheckCircleIcon />}
                label="100+ Enterprise Clients"
                sx={{ bgcolor: alpha(colors.neutral.white, 0.1), color: colors.neutral.white }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ 
            bgcolor: colors.neutral.white,
            color: colors.text.primary,
            '& .MuiAlert-icon': { color: colors.secondary.main },
            borderRadius: '12px',
            boxShadow: `0 10px 20px -5px ${alpha(colors.primary.main, 0.2)}`,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Copy Success Snackbar */}
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="success"
          sx={{ 
            bgcolor: colors.neutral.white,
            color: colors.text.primary,
            borderRadius: '12px',
          }}
        >
          Email copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs;