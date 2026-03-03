import { Box, Container, Typography, Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import SolutionsList from '../components/dynamic/SolutionsList';
import HomeIcon from '@mui/icons-material/Home';

const HeroSection = styled(Box)(({ theme }) => ({
  background: '#0f172a',
  color: 'white',
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(4),
}));

const OurSolutions = () => {
  return (
    <Box>
      {/* Breadcrumbs */}
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" style={{ textDecoration: 'none', color: '#64748b', display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
            Home
          </Link>
          <Typography color="#2563eb">Our Solutions</Typography>
        </Breadcrumbs>
      </Container>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="xl">
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Our Solutions
          </Typography>
          <Typography variant="h6" sx={{ color: '#94a3b8', maxWidth: '800px' }}>
            Comprehensive technology solutions tailored to your business needs
          </Typography>
        </Container>
      </HeroSection>

      {/* Solutions List */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <SolutionsList />
      </Container>
    </Box>
  );
};

export default OurSolutions;