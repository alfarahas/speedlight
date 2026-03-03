import { Box, Container, Grid, Typography, Link, Divider, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box sx={{ 
      bgcolor: '#0f172a', 
      color: 'white', 
      width: '100%',
      pt: { xs: 6, sm: 8 },
      pb: { xs: 4, sm: 4 },
    }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
        <Grid container spacing={{ xs: 3, sm: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
              }}
            >
              SPEEDLIGHT{' '}
              <Box component="span" sx={{ color: '#2563eb' }}>
                INFOSOLUTIONS
              </Box>
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#94a3b8', 
                mb: 2,
                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                lineHeight: 1.6,
                maxWidth: { xs: '100%', md: '300px' },
              }}
            >
              Engineering intelligent AV & IT ecosystems for modern enterprises.
            </Typography>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600, 
                mb: 2,
                fontSize: { xs: '0.95rem', sm: '1rem' },
              }}
            >
              Quick Links
            </Typography>
            {['About Us', 'Our Solutions', 'Industries', 'Contact'].map((item) => (
              <Link
                key={item}
                component={RouterLink}
                to={`/${item.toLowerCase().replace(' ', '-')}`}
                sx={{
                  display: 'block',
                  color: '#94a3b8',
                  mb: 1.5,
                  textDecoration: 'none',
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                  '&:hover': { color: '#2563eb' },
                }}
              >
                {item}
              </Link>
            ))}
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600, 
                mb: 2,
                fontSize: { xs: '0.95rem', sm: '1rem' },
              }}
            >
              Our Solutions
            </Typography>
            {[
              'Video Conferencing',
              'Sound Systems',
              'Display Solutions',
              'Networking',
            ].map((item) => (
              <Typography
                key={item}
                variant="body2"
                sx={{ 
                  color: '#94a3b8', 
                  mb: 1.5,
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                }}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600, 
                mb: 2,
                fontSize: { xs: '0.95rem', sm: '1rem' },
              }}
            >
              Contact Us
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#94a3b8', 
                mb: 1.5,
                fontSize: { xs: '0.85rem', sm: '0.9rem' },
              }}
            >
              Mumbai, Maharashtra
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#94a3b8', 
                mb: 1.5,
                fontSize: { xs: '0.85rem', sm: '0.9rem' },
              }}
            >
              +91 22 1234 5678
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#94a3b8', 
                mb: 1.5,
                fontSize: { xs: '0.85rem', sm: '0.9rem' },
              }}
            >
              info@speedlight.com
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: { xs: 3, sm: 4 } }} />

        <Typography 
          variant="body2" 
          align="center" 
          sx={{ 
            color: '#94a3b8',
            fontSize: { xs: '0.8rem', sm: '0.85rem' },
          }}
        >
          © {new Date().getFullYear()} Speedlight Infosolutions Pvt Ltd. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;