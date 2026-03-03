import { Box, Container, Typography, Grid, Card, CardContent, Chip, Breadcrumbs, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';

const HeroSection = styled(Box)(({ theme }) => ({
  background: '#0f172a',
  color: 'white',
  padding: theme.spacing(8, 0),
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
}));

const CaseStudies = () => {
  const cases = [
    {
      icon: <BusinessIcon />,
      title: 'Enterprise Headquarters – Unified Collaboration Deployment',
      challenge: 'A multi-floor corporate office required standardized Microsoft Teams-enabled meeting rooms with centralized control.',
      solution: 'Integrated collaboration systems, professional audio calibration, centralized control programming',
      outcome: 'Seamless hybrid collaboration, standardized user experience, reduced IT intervention',
      color: '#2563eb',
    },
    {
      icon: <SchoolIcon />,
      title: 'University Campus – Smart Classroom Infrastructure',
      challenge: 'Upgrade legacy lecture halls into interactive, hybrid-enabled learning environments.',
      solution: 'Interactive displays, wireless presentation platforms, campus-wide AV-over-IP architecture',
      outcome: 'Enhanced student engagement, hybrid learning capability, scalable infrastructure',
      color: '#10b981',
    },
    {
      icon: <SecurityIcon />,
      title: 'Command & Control Center – Monitoring Environment',
      challenge: 'Design a 24/7 monitoring environment with large-format visualization and secure networking.',
      solution: 'Video wall integration, redundant networking, centralized control platform',
      outcome: 'High-availability operations, real-time monitoring efficiency, secure infrastructure',
      color: '#f59e0b',
    },
  ];

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" style={{ textDecoration: 'none', color: '#64748b', display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
            Home
          </Link>
          <Link to="/about-us" style={{ textDecoration: 'none', color: '#64748b' }}>About Us</Link>
          <Typography color="#2563eb">Case Studies</Typography>
        </Breadcrumbs>
      </Container>

      <HeroSection>
        <Container maxWidth="xl">
          <Typography variant="h1" sx={{ fontWeight: 700, mb: 2, color: 'white', fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            Case Studies
          </Typography>
          <Typography variant="h6" sx={{ color: '#94a3b8', maxWidth: '800px' }}>
            We design and deliver intelligent AV and IT ecosystems tailored to real-world enterprise challenges.
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {cases.map((caseStudy, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ borderRadius: '24px', overflow: 'hidden' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar sx={{ bgcolor: caseStudy.color }}>{caseStudy.icon}</Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>{caseStudy.title}</Typography>
                  </Box>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Chip label="Challenge" sx={{ bgcolor: '#fee2e2', color: '#ef4444', mb: 2 }} />
                      <Typography variant="body2" color="text.secondary">{caseStudy.challenge}</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Chip label="Solution" sx={{ bgcolor: '#dbeafe', color: '#2563eb', mb: 2 }} />
                      <Typography variant="body2" color="text.secondary">{caseStudy.solution}</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Chip label="Outcome" sx={{ bgcolor: '#dcfce7', color: '#16a34a', mb: 2 }} />
                      <Typography variant="body2" color="text.secondary">{caseStudy.outcome}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CaseStudies;