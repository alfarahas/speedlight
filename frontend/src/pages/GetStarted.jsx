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
  Grow,
  Chip,
  alpha,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
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
  RocketLaunch as RocketIcon,
} from '@mui/icons-material';

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

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '32px',
  boxShadow: `0 10px 25px -5px ${alpha(colors.primary.main, 0.1)}`,
  border: `1px solid ${alpha(colors.primary.main, 0.1)}`,
}));

const ReviewSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: alpha(colors.primary.main, 0.02),
  borderRadius: '20px',
  marginBottom: theme.spacing(3),
  border: `1px solid ${alpha(colors.secondary.main, 0.1)}`,
}));

const StepIcon = styled(Avatar)(({ theme, active }) => ({
  width: 40,
  height: 40,
  background: active ? colors.secondary.gradient : alpha(colors.primary.main, 0.1),
  color: active ? colors.primary.main : colors.text.disabled,
  transition: 'all 0.3s ease',
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
    { value: '10k-50k', label: '₹10L - ₹50L' },
    { value: '50k-100k', label: '₹50L - ₹1Cr' },
    { value: '100k-250k', label: '₹1Cr - ₹2.5Cr' },
    { value: '250k-500k', label: '₹2.5Cr - ₹5Cr' },
    { value: '500k-1m', label: '₹5Cr - ₹10Cr' },
    { value: '1m+', label: '₹10Cr+' },
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
      <Box sx={{ minHeight: '100vh', bgcolor: colors.neutral.offWhite, py: 8 }}>
        <Container maxWidth="md">
          <Zoom in={true}>
            <Paper sx={{ 
              p: { xs: 4, md: 8 }, 
              borderRadius: '48px', 
              textAlign: 'center',
              border: `1px solid ${alpha(colors.secondary.main, 0.2)}`,
              boxShadow: `0 20px 40px -10px ${alpha(colors.primary.main, 0.2)}`,
            }}>
              <Avatar sx={{ 
                bgcolor: colors.secondary.main, 
                width: 100, 
                height: 100, 
                mx: 'auto', 
                mb: 3,
                color: colors.primary.main,
              }}>
                <CheckCircleIcon sx={{ fontSize: 60 }} />
              </Avatar>
              
              <Typography variant="h2" sx={{ 
                fontWeight: 800, 
                mb: 2, 
                color: colors.primary.main,
                fontSize: { xs: '2rem', md: '3rem' },
              }}>
                Thank You!
              </Typography>
              
              <Typography variant="h6" sx={{ 
                color: colors.text.secondary, 
                mb: 4, 
                maxWidth: '600px', 
                mx: 'auto' 
              }}>
                We've received your request and will get back to you within 24 hours.
              </Typography>

              <Alert 
                severity="success" 
                sx={{ 
                  mb: 4, 
                  borderRadius: '16px', 
                  maxWidth: '500px', 
                  mx: 'auto',
                  bgcolor: alpha(colors.secondary.main, 0.1),
                  color: colors.primary.main,
                  '& .MuiAlert-icon': { color: colors.secondary.main },
                }}
              >
                A confirmation email has been sent to <strong>{formData.email}</strong>
              </Alert>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  size="large"
                  sx={{
                    background: colors.primary.gradient,
                    color: colors.neutral.white,
                    borderRadius: '16px',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  Return to Home
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: colors.secondary.main,
                    color: colors.secondary.main,
                    borderRadius: '16px',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      borderColor: colors.secondary.dark,
                      bgcolor: alpha(colors.secondary.main, 0.1),
                    },
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
    <Box sx={{ width: '100%', overflow: 'hidden', bgcolor: colors.neutral.offWhite }}>
      {/* Breadcrumbs */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Breadcrumbs 
          separator={<Typography variant="body2" sx={{ color: alpha(colors.primary.main, 0.5) }}>/</Typography>}
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
          <Typography sx={{ color: colors.secondary.main, fontWeight: 600 }}>Get Started</Typography>
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
                icon={<RocketIcon />}
                label="Start Your Journey"
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
                Get Started
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
                Let's discuss your project and transform your technology infrastructure. 
                Fill out the form below and our experts will get back to you within 24 hours.
              </Typography>
            </Box>
          </Fade>
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
                    <StepIcon active={activeStep >= index}>
                      {index === 0 && <PersonIcon />}
                      {index === 1 && <AssignmentIcon />}
                      {index === 2 && <CheckCircleIcon />}
                    </StepIcon>
                  )}
                >
                  <Typography sx={{ 
                    color: activeStep >= index ? colors.secondary.main : colors.text.disabled,
                    fontWeight: activeStep >= index ? 600 : 400,
                  }}>
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Divider sx={{ mb: 4, bgcolor: alpha(colors.primary.main, 0.1) }} />

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {activeStep === 0 && (
              <Fade in={true}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, color: colors.primary.main }}>
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
                          startAdornment: <PersonIcon sx={{ mr: 1, color: colors.secondary.main }} />,
                        }}
                        sx={textFieldStyles}
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
                          startAdornment: <EmailIcon sx={{ mr: 1, color: colors.secondary.main }} />,
                        }}
                        sx={textFieldStyles}
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
                          startAdornment: <PhoneIcon sx={{ mr: 1, color: colors.secondary.main }} />,
                        }}
                        sx={textFieldStyles}
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
                          startAdornment: <BusinessIcon sx={{ mr: 1, color: colors.secondary.main }} />,
                        }}
                        sx={textFieldStyles}
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
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, color: colors.primary.main }}>
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
                        sx={textFieldStyles}
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
                        sx={textFieldStyles}
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
                        sx={textFieldStyles}
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
                        sx={textFieldStyles}
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
                        sx={textFieldStyles}
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
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, color: colors.primary.main }}>
                    Review Your Information
                  </Typography>

                  <ReviewSection>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: colors.secondary.main }}>
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
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: colors.secondary.main }}>
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
                          color: colors.secondary.main,
                          '&.Mui-checked': { color: colors.secondary.main },
                        }}
                      />
                    }
                    label={<Typography sx={{ color: colors.text.secondary }}>Subscribe to our newsletter for technology insights and updates</Typography>}
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
                  color: colors.text.secondary,
                  '&:hover': { bgcolor: alpha(colors.primary.main, 0.05) },
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
                      background: colors.secondary.gradient,
                      color: colors.primary.main,
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                      '&.Mui-disabled': {
                        background: alpha(colors.secondary.main, 0.3),
                      },
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
                      background: colors.secondary.gradient,
                      color: colors.primary.main,
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                      '&.Mui-disabled': {
                        background: alpha(colors.secondary.main, 0.3),
                      },
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

const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    '&:hover fieldset': {
      borderColor: colors.secondary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: colors.secondary.main,
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: colors.secondary.main,
  },
};

export default GetStarted;