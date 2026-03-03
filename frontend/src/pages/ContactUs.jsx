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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';

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

const ContactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
  },
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    '&:hover fieldset': {
      borderColor: '#2563eb',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2563eb',
    },
  },
});

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
      message: 'Message sent successfully! We\'ll get back to you soon.',
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

  const contactInfo = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 30 }} />,
      title: 'Visit Us',
      details: ['123 Tech Park, Business District', 'Mumbai, Maharashtra 400001', 'India'],
      color: '#2563eb',
      bgColor: '#dbeafe',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 30 }} />,
      title: 'Call Us',
      details: ['+91 22 1234 5678', '+91 98765 43210'],
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      icon: <EmailIcon sx={{ fontSize: 30 }} />,
      title: 'Email Us',
      details: ['info@speedlightinfosolutions.com', 'sales@speedlightinfosolutions.com'],
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 30 }} />,
      title: 'Business Hours',
      details: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat: 9:00 AM - 1:00 PM', 'Sunday: Closed'],
      color: '#ef4444',
      bgColor: '#fee2e2',
    },
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
          <Typography color="#2563eb">Contact Us</Typography>
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
              Contact Us
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#94a3b8',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.6,
              }}
            >
              Let's discuss how we can help transform your technology infrastructure
            </Typography>
          </Box>
        </Container>
      </HeroSection>

      {/* Contact Info Cards */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={3}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ContactCard elevation={2}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <Avatar sx={{ bgcolor: info.bgColor, color: info.color, width: 64, height: 64, mb: 2 }}>
                    {info.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: info.color }}>
                    {info.title}
                  </Typography>
                  {info.details.map((detail, idx) => (
                    <Typography key={idx} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {detail}
                    </Typography>
                  ))}
                </Box>
              </ContactCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form & Map */}
      <Box sx={{ bgcolor: '#f8fafc', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: '24px' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#0f172a' }}>
                  Send us a message
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
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
                          bgcolor: '#2563eb',
                          '&:hover': { bgcolor: '#1d4ed8' },
                          borderRadius: '12px',
                          py: 2,
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>

            {/* Map Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ height: '100%', minHeight: 500, borderRadius: '24px', overflow: 'hidden' }}>
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
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, textAlign: 'center', color: '#0f172a' }}>
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: '16px' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#2563eb' }}>
                How quickly do you respond to inquiries?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We typically respond to all inquiries within 24 hours during business days.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: '16px' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#2563eb' }}>
                Do you offer emergency support?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Yes, we provide 24/7 emergency support for our enterprise clients.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: '16px' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#2563eb' }}>
                Can I schedule a consultation?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Absolutely! Fill out the form and mention "consultation" in your message.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: '16px' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#2563eb' }}>
                Do you serve clients outside India?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Yes, we have international operations and serve clients globally.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs;