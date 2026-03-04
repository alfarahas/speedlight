import { Box, Container, Grid, Typography, Link, Divider, IconButton, TextField, Button, Stack, Paper, alpha, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled, keyframes } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';
import SecurityIcon from '@mui/icons-material/Security';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import DescriptionIcon from '@mui/icons-material/Description';

// Professional Color Palette (matching navbar and hero)
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
  background: {
    main: '#0A2647',
    dark: '#051A30',
    gradient: 'linear-gradient(180deg, #0A2647 0%, #051A30 100%)',
  },
};

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const pulseGlow = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const FooterContainer = styled(Box)(({ theme }) => ({
  background: colors.background.gradient,
  color: colors.neutral.white,
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
}));

const AnimatedBackground = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `radial-gradient(circle at 20% 50%, ${alpha(colors.secondary.main, 0.03)} 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, ${alpha(colors.accent.main, 0.03)} 0%, transparent 50%)`,
  animation: `${gradientFlow} 20s ease infinite`,
  pointerEvents: 'none',
});

const FooterWave = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '4px',
  background: `linear-gradient(90deg, transparent, ${colors.secondary.main}, ${colors.accent.main}, ${colors.secondary.main}, transparent)`,
  backgroundSize: '200% 100%',
  animation: `${gradientFlow} 5s ease infinite`,
});

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: colors.neutral.white,
  backgroundColor: alpha(colors.neutral.white, 0.05),
  border: `1px solid ${alpha(colors.neutral.white, 0.1)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: colors.secondary.main,
    color: colors.primary.main,
    transform: 'translateY(-5px)',
    borderColor: colors.secondary.main,
    boxShadow: `0 10px 20px -5px ${alpha(colors.secondary.main, 0.3)}`,
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  display: 'block',
  color: alpha(colors.neutral.white, 0.7),
  textDecoration: 'none',
  fontSize: '0.95rem',
  padding: '4px 0',
  transition: 'all 0.2s ease',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 0,
    height: '1px',
    background: colors.secondary.gradient,
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    color: colors.secondary.main,
    transform: 'translateX(5px)',
    '&::before': {
      width: '30px',
    },
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  color: alpha(colors.neutral.white, 0.7),
  marginBottom: theme.spacing(2),
  transition: 'all 0.2s ease',
  '&:hover': {
    color: colors.secondary.main,
    transform: 'translateX(5px)',
    '& .MuiSvgIcon-root': {
      color: colors.secondary.main,
    },
  },
}));

const NewsletterBox = styled(Paper)(({ theme }) => ({
  background: alpha(colors.neutral.white, 0.05),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(colors.neutral.white, 0.1)}`,
  borderRadius: '20px',
  padding: theme.spacing(3),
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: alpha(colors.secondary.main, 0.3),
    boxShadow: `0 10px 30px -10px ${alpha(colors.secondary.main, 0.2)}`,
  },
}));

const BadgeBox = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  background: alpha(colors.neutral.white, 0.03),
  border: `1px solid ${alpha(colors.neutral.white, 0.1)}`,
  borderRadius: '30px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: alpha(colors.secondary.main, 0.1),
    borderColor: colors.secondary.main,
  },
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const quickLinks = [
    { label: 'About Us', path: '/about-us', icon: '🏢' },
    { label: 'Our Solutions', path: '/our-solutions', icon: '💡' },
    { label: 'Industries', path: '/industries-we-serve', icon: '🏭' },
    { label: 'Contact', path: '/contact-us', icon: '📞' },
  ];

  const solutions = [
    { label: 'Video Conferencing', icon: '🎥' },
    { label: 'Sound Systems', icon: '🔊' },
    { label: 'Display Solutions', icon: '📺' },
    { label: 'Networking', icon: '🌐' },
    { label: 'Cybersecurity', icon: '🔒' },
    { label: 'Cloud Solutions', icon: '☁️' },
  ];

  const legal = [
    { label: 'Privacy Policy', path: '/privacy', icon: <PrivacyTipIcon /> },
    { label: 'Terms of Service', path: '/terms', icon: <DescriptionIcon /> },
    { label: 'Security', path: '/security', icon: <SecurityIcon /> },
  ];

  const socialMedia = [
    { icon: <FacebookIcon />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <TwitterIcon />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <InstagramIcon />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <YouTubeIcon />, url: 'https://youtube.com', label: 'YouTube' },
  ];

  const certifications = [
    'ISO 27001 Certified',
    'Crestron Partner',
    'Cisco Premier',
    'Microsoft Gold',
  ];

  return (
    <FooterContainer>
      <AnimatedBackground />
      <FooterWave />

      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 }, position: 'relative', zIndex: 2 }}>
        {/* Newsletter Section */}
        <Box sx={{ pt: { xs: 6, sm: 8, md: 10 }, pb: { xs: 4, sm: 6 } }}>
          <NewsletterBox>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 1,
                    background: colors.secondary.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}
                >
                  Stay Updated
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: alpha(colors.neutral.white, 0.7),
                    maxWidth: '400px',
                  }}
                >
                  Subscribe to our newsletter for the latest insights on AV & IT innovations.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                  <TextField
                    fullWidth
                    placeholder="Enter your email"
                    variant="outlined"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: colors.neutral.white,
                        backgroundColor: alpha(colors.neutral.white, 0.05),
                        borderRadius: '12px',
                        '& fieldset': {
                          borderColor: alpha(colors.neutral.white, 0.2),
                        },
                        '&:hover fieldset': {
                          borderColor: colors.secondary.main,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: colors.secondary.main,
                        },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    sx={{
                      background: colors.secondary.gradient,
                      color: colors.primary.main,
                      px: 4,
                      py: 1,
                      borderRadius: '12px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: `0 10px 20px -5px ${alpha(colors.secondary.main, 0.3)}`,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </NewsletterBox>
        </Box>

        {/* Main Footer Content */}
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 800,
                  mb: 2,
                  letterSpacing: '1px',
                }}
              >
                SPEEDLIGHT
              </Typography>
              <Box
                sx={{
                  display: 'inline-block',
                  background: colors.secondary.gradient,
                  px: 2,
                  py: 0.5,
                  borderRadius: '20px',
                  mb: 3,
                }}
              >
                <Typography variant="caption" sx={{ color: colors.primary.main, fontWeight: 600 }}>
                  INFOSOLUTIONS
                </Typography>
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: alpha(colors.neutral.white, 0.7),
                  mb: 3,
                  lineHeight: 1.8,
                  maxWidth: '320px',
                }}
              >
                Engineering intelligent AV & IT ecosystems for modern enterprises. 
                Transforming workspaces with cutting-edge technology solutions.
              </Typography>

              {/* Certifications */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {certifications.map((cert, index) => (
                  <BadgeBox key={index}>
                    <Typography variant="caption" sx={{ color: alpha(colors.neutral.white, 0.8) }}>
                      {cert}
                    </Typography>
                  </BadgeBox>
                ))}
              </Box>

              {/* Social Media */}
              <Stack direction="row" spacing={1}>
                {socialMedia.map((social, index) => (
                  <SocialIconButton
                    key={index}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </SocialIconButton>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 700,
                mb: 3,
                color: colors.neutral.white,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '40px',
                  height: '2px',
                  background: colors.secondary.gradient,
                  borderRadius: '2px',
                },
              }}
            >
              Quick Links
            </Typography>
            {quickLinks.map((item) => (
              <FooterLink
                key={item.label}
                component={RouterLink}
                to={item.path}
              >
                {item.icon} {item.label}
              </FooterLink>
            ))}
          </Grid>

          {/* Our Solutions */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 700,
                mb: 3,
                color: colors.neutral.white,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '40px',
                  height: '2px',
                  background: colors.secondary.gradient,
                  borderRadius: '2px',
                },
              }}
            >
              Our Solutions
            </Typography>
            {solutions.slice(0, 4).map((item) => (
              <FooterLink
                key={item.label}
                component={RouterLink}
                to="/our-solutions"
              >
                {item.icon} {item.label}
              </FooterLink>
            ))}
            <FooterLink
              component={RouterLink}
              to="/our-solutions"
              sx={{ 
                color: colors.secondary.main,
                fontWeight: 500,
                mt: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              View All <ArrowForwardIcon fontSize="small" />
            </FooterLink>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={5} md={4}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 700,
                mb: 3,
                color: colors.neutral.white,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '40px',
                  height: '2px',
                  background: colors.secondary.gradient,
                  borderRadius: '2px',
                },
              }}
            >
              Contact Us
            </Typography>

            <ContactItem>
              <LocationOnIcon sx={{ color: colors.secondary.main, fontSize: 20 }} />
              <Typography variant="body2">
                501, Techno Park, Andheri East, Mumbai, Maharashtra 400093
              </Typography>
            </ContactItem>

            <ContactItem>
              <PhoneIcon sx={{ color: colors.secondary.main, fontSize: 20 }} />
              <Typography variant="body2">
                +91 22 4123 4567 | +91 98765 43210
              </Typography>
            </ContactItem>

            <ContactItem>
              <EmailIcon sx={{ color: colors.secondary.main, fontSize: 20 }} />
              <Typography variant="body2">
                info@speedlight.com | support@speedlight.com
              </Typography>
            </ContactItem>

            {/* Business Hours */}
            <Paper
              sx={{
                mt: 3,
                p: 2,
                background: alpha(colors.neutral.white, 0.03),
                borderRadius: '12px',
                border: `1px solid ${alpha(colors.neutral.white, 0.05)}`,
              }}
            >
              <Typography variant="body2" sx={{ color: colors.secondary.main, fontWeight: 600, mb: 1 }}>
                Business Hours
              </Typography>
              <Typography variant="caption" sx={{ color: alpha(colors.neutral.white, 0.7), display: 'block' }}>
                Mon - Fri: 9:00 AM - 7:00 PM
              </Typography>
              <Typography variant="caption" sx={{ color: alpha(colors.neutral.white, 0.7), display: 'block' }}>
                Sat: 10:00 AM - 4:00 PM
              </Typography>
              <Typography variant="caption" sx={{ color: alpha(colors.neutral.white, 0.7), display: 'block' }}>
                Sun: Closed
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Legal Links and Copyright */}
        <Box sx={{ mt: { xs: 4, md: 6 } }}>
          <Divider sx={{ bgcolor: alpha(colors.neutral.white, 0.1), mb: 3 }} />
          
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                {legal.map((item) => (
                  <FooterLink
                    key={item.label}
                    component={RouterLink}
                    to={item.path}
                    sx={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontSize: '0.85rem',
                    }}
                  >
                    {item.icon} {item.label}
                  </FooterLink>
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography 
                variant="body2" 
                align={isMobile ? 'center' : 'right'} 
                sx={{ 
                  color: alpha(colors.neutral.white, 0.6),
                  fontSize: '0.85rem',
                }}
              >
                © {new Date().getFullYear()} Speedlight Infosolutions Pvt Ltd. 
                {!isMobile && <br />}
                All rights reserved. | CIN: U72900MH2020PTC123456
              </Typography>
            </Grid>
          </Grid>

          {/* Trust Badge */}
          <Box 
            sx={{ 
              mt: 3, 
              textAlign: 'center',
              animation: `${pulseGlow} 3s infinite`,
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                color: alpha(colors.neutral.white, 0.4),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <SecurityIcon sx={{ fontSize: 14 }} />
              Secured with 256-bit encryption | GDPR Compliant | ISO 27001:2022 Certified
            </Typography>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;