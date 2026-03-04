import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
  Breadcrumbs,
  Alert,
  Divider,
  Avatar,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Home as HomeIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

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

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '24px',
  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
}));

const ReviewSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f8fafc',
  borderRadius: '16px',
  marginBottom: theme.spacing(3),
}));

const StepIcon = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: '#2563eb',
  color: 'white',
}));

const GetStarted = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    newsletter: false
  });

  const steps = ['Basic Information', 'Project Details', 'Review & Submit'];

  const industries = [
    { value: 'corporate', label: 'Corporate & Enterprise' },
    { value: 'education', label: 'Education & Digital Classrooms' },
    { value: 'healthcare', label: 'Healthcare Facilities' },
    { value: 'government', label: 'Government & Public Sector' },
    { value: 'hospitality', label: 'Hospitality & Convention Centers' },
    { value: 'banking', label: 'Banking & Financial Institution' },
    { value: 'retail', label: 'Retail & Commercial Spaces' },
    { value: 'other', label: 'Other' },
  ];

  const projectTypes = [
    { value: 'new', label: 'New Installation' },
    { value: 'upgrade', label: 'Upgrade Existing System' },
    { value: 'consulting', label: 'Consulting & Design' },
    { value: 'support', label: 'Support & Maintenance' },
    { value: 'audit', label: 'System Audit & Assessment' },
  ];

  const budgetRanges = [
    { value: '10k-50k', label: '$10,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k-250k', label: '$100,000 - $250,000' },
    { value: '250k-500k', label: '$250,000 - $500,000' },
    { value: '500k-1m', label: '$500,000 - $1,000,000' },
    { value: '1m+', label: '$1,000,000+' },
  ];

  const timelines = [
    { value: 'immediate', label: 'Immediate (Within 1 month)' },
    { value: '1-3months', label: '1-3 months' },
    { value: '3-6months', label: '3-6 months' },
    { value: '6-12months', label: '6-12 months' },
    { value: 'planning', label: 'Just planning / exploratory' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Here you would typically send the data to your backend
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      industry: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: '',
      newsletter: false
    });
  };

  const isStepValid = () => {
    if (activeStep === 0) {
      return formData.fullName && formData.email && formData.phone;
    }
    if (activeStep === 1) {
      return formData.industry && formData.projectType && formData.message;
    }
    return true;
  };

  if (submitted) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)', py: 8 }}>
        <Container maxWidth="md">
          <Zoom in={true}>
            <Paper sx={{ p: { xs: 4, md: 8 }, borderRadius: '32px', textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: '#10b981', width: 80, height: 80, mx: 'auto', mb: 3 }}>
                <CheckCircleIcon sx={{ fontSize: 48 }} />
              </Avatar>
              
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, color: '#0f172a', fontSize: { xs: '2rem', md: '3rem' } }}>
                Thank You!
              </Typography>
              
              <Typography variant="h6" sx={{ color: '#64748b', mb: 4, maxWidth: '600px', mx: 'auto' }}>
                We've received your request and will get back to you within 24 hours.
              </Typography>

              <Alert severity="success" sx={{ mb: 4, borderRadius: '12px', maxWidth: '500px', mx: 'auto' }}>
                A confirmation email has been sent to <strong>{formData.email}</strong>
              </Alert>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/"
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
                  Return to Home
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: '#2563eb',
                    color: '#2563eb',
                    '&:hover': { borderColor: '#1d4ed8', bgcolor: 'rgba(37,99,235,0.04)' },
                    borderRadius: '12px',
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Submit Another Request
                </Button>
              </Box>
            </Paper>
          </Zoom>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Breadcrumbs */}
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" style={{ textDecoration: 'none', color: '#64748b', display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
            Home
          </Link>
          <Typography color="#2563eb">Get Started</Typography>
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
                mb: 2, 
                color: 'white',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Get Started
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#94a3b8',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.6,
              }}
            >
              Let's discuss your project and transform your technology infrastructure
            </Typography>
          </Box>
        </Container>
      </HeroSection>

      {/* Main Form Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <StyledPaper>
          {/* Stepper */}
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={() => (
                    <StepIcon>
                      {index === 0 && <PersonIcon />}
                      {index === 1 && <AssignmentIcon />}
                      {index === 2 && <CheckCircleIcon />}
                    </StepIcon>
                  )}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Divider sx={{ mb: 4 }} />

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {activeStep === 0 && (
              <Fade in={true}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 4, color: '#0f172a' }}>
                    Basic Information
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name *"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: <PersonIcon sx={{ mr: 1, color: '#94a3b8' }} />,
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email *"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: <EmailIcon sx={{ mr: 1, color: '#94a3b8' }} />,
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Phone *"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: <PhoneIcon sx={{ mr: 1, color: '#94a3b8' }} />,
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Company Name"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: <BusinessIcon sx={{ mr: 1, color: '#94a3b8' }} />,
                        }}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Fade>
            )}

            {/* Step 2: Project Details */}
            {activeStep === 1 && (
              <Fade in={true}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 4, color: '#0f172a' }}>
                    Project Details
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        select
                        fullWidth
                        label="Industry *"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      >
                        {industries.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        select
                        fullWidth
                        label="Project Type *"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      >
                        {projectTypes.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        select
                        fullWidth
                        label="Budget Range"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      >
                        {budgetRanges.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        select
                        fullWidth
                        label="Timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      >
                        {timelines.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Project Description *"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your project requirements, goals, and any specific challenges..."
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Fade>
            )}

            {/* Step 3: Review */}
            {activeStep === 2 && (
              <Fade in={true}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 4, color: '#0f172a' }}>
                    Review Your Information
                  </Typography>

                  <ReviewSection>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2563eb' }}>
                      Personal Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">Full Name</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{formData.fullName}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">Email</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{formData.email}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">Phone</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{formData.phone}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">Company</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {formData.company || 'Not provided'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ReviewSection>

                  <ReviewSection>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#2563eb' }}>
                      Project Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">Industry</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {industries.find(i => i.value === formData.industry)?.label || formData.industry}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">Project Type</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {projectTypes.find(p => p.value === formData.projectType)?.label || formData.projectType}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">Budget</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {budgetRanges.find(b => b.value === formData.budget)?.label || 'Not specified'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">Timeline</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {timelines.find(t => t.value === formData.timeline)?.label || 'Not specified'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">Project Description</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>
                          {formData.message}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ReviewSection>

                  <FormControlLabel
                    control={
                      <Checkbox
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        sx={{
                          color: '#2563eb',
                          '&.Mui-checked': { color: '#2563eb' },
                        }}
                      />
                    }
                    label="Subscribe to our newsletter for technology insights and updates"
                  />
                </Box>
              </Fade>
            )}

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                startIcon={<ArrowBackIcon />}
                sx={{
                  color: '#64748b',
                  '&:hover': { bgcolor: '#f1f5f9' },
                }}
              >
                Back
              </Button>

              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    disabled={!isStepValid()}
                    sx={{
                      bgcolor: '#10b981',
                      '&:hover': { bgcolor: '#059669' },
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Submit Request
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    disabled={!isStepValid()}
                    sx={{
                      bgcolor: '#2563eb',
                      '&:hover': { bgcolor: '#1d4ed8' },
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Next Step
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default GetStarted;