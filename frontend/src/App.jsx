import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import theme from './theme';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import OurSolutions from './pages/OurSolutions';
import IndustriesWeServe from './pages/IndustriesWeServe';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import GetStarted from './pages/GetStarted';
import SolutionDetail from './pages/SolutionDetail';
import IndustryDetail from './pages/IndustryDetail';
import OurOrganization from './pages/OurOrganization';
import WhyChooseUs from './pages/WhyChooseUs';
import CaseStudies from './pages/CaseStudies';
import Careers from './pages/Careers';

// Admin imports
import AdminLogin from './pages/Admin';
import AdminDashboard from './pages/admin/AdminDashboard';
import PrivateRoute from './components/admin/PrivateRoute';
import SolutionsManager from './pages/admin/SolutionsManager';
import IndustriesManager from './pages/admin/IndustriesManager';
import DashboardHome from './pages/admin/DashboardHome';
import SolutionDetailsManager from './pages/admin/SolutionDetailsManager';
import IndustryDetailsManager from './pages/admin/IndustryDetailsManager';
import { verifyToken, setAuthToken } from './services/auth';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        await verifyToken();
      }
    };
    initAuth();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
          <Routes>
            {/* Admin Routes - No Navbar/Footer */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            >
              <Route path="dashboard" element={<DashboardHome />} />
              <Route path="solutions" element={<SolutionsManager />} />
              <Route path="industries" element={<IndustriesManager />} />
              <Route path="solution-details" element={<SolutionDetailsManager />} />
              <Route path="industry-details" element={<IndustryDetailsManager />} />
            </Route>

            {/* Public Routes */}
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/our-solutions" element={<OurSolutions />} />
                    <Route path="/industries-we-serve" element={<IndustriesWeServe />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/get-started" element={<GetStarted />} />
                    <Route path="/solution/:id" element={<SolutionDetail />} />
                    <Route path="/industry/:id" element={<IndustryDetail />} />
                    <Route path="/about/organization" element={<OurOrganization />} />
                    <Route path="/about/why-choose-us" element={<WhyChooseUs />} />
                    <Route path="/about/case-studies" element={<CaseStudies />} />
                    <Route path="/about/careers" element={<Careers />} />
                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;