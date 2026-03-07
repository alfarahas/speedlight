import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  useMediaQuery,
  useTheme,
  Container,
  Menu,
  MenuItem,
  Divider,
  Fade,
  CircularProgress,
  Grid,
  Paper,
  Avatar,
  Chip,
  Zoom,
  Grow,
  Slide,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BusinessIcon from '@mui/icons-material/Business';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WorkIcon from '@mui/icons-material/Work';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { fetchSolutions, fetchIndustries } from '../../services/api';

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
  background: {
    main: '#FFFFFF',
    dark: '#1E1E1E',
    paper: '#F8F9FA',
    overlay: 'rgba(10, 38, 71, 0.95)',
  },
  text: {
    primary: '#212529',
    secondary: '#495057',
    disabled: '#ADB5BD',
    inverse: '#FFFFFF',
  },
  success: '#2E7D32',
  warning: '#ED6C02',
  error: '#D32F2F',
  info: '#0288D1',
};

// Styled Components
const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  background: scrolled 
    ? colors.background.overlay
    : colors.primary.gradient,
  backdropFilter: scrolled ? 'blur(10px)' : 'none',
  boxShadow: scrolled 
    ? '0 10px 30px -10px rgba(0, 0, 0, 0.3)' 
    : '0 4px 20px -5px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
  borderBottom: scrolled ? `1px solid ${colors.secondary.light}20` : 'none',
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  position: 'relative',
  color: active ? colors.secondary.main : colors.neutral.offWhite,
  fontSize: '1rem',
  fontWeight: 500,
  padding: '6px 16px',
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: colors.secondary.gradient,
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: -1,
  },
  '&:hover': {
    color: colors.neutral.white,
    transform: 'translateY(-2px)',
    '&::before': {
      opacity: 0.15,
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: active ? '80%' : 0,
    height: 2,
    background: colors.secondary.gradient,
    transition: 'width 0.3s ease',
    borderRadius: '2px 2px 0 0',
  },
}));

const GradientMenuItem = styled(MenuItem)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${colors.secondary.main}15, transparent)`,
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease',
  },
  '&:hover::before': {
    transform: 'translateX(100%)',
  },
}));

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Use a single state for the currently open dropdown
  const [openDropdown, setOpenDropdown] = useState(null);
  
  // Flag to prevent multiple state updates
  const isHoveringRef = useRef(false);
  
  // Refs for dropdown containers
  const solutionsRef = useRef(null);
  const industriesRef = useRef(null);
  const aboutRef = useRef(null);
  const solutionsMenuRef = useRef(null);
  const industriesMenuRef = useRef(null);
  const aboutMenuRef = useRef(null);
  
  // Mobile states
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  
  // Data states
  const [solutions, setSolutions] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState({ solutions: false, industries: false });
  const [hoveredCategory, setHoveredCategory] = useState(null);
  
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global mouse move handler with throttling
  useEffect(() => {
    let timeoutId = null;
    
    const handleGlobalMouseMove = (e) => {
      if (!openDropdown) return;
      
      // Clear previous timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Throttle the checks
      timeoutId = setTimeout(() => {
        // Check if mouse is inside any of the dropdown buttons or menus
        const isInSolutions = solutionsRef.current?.contains(e.target) || solutionsMenuRef.current?.contains(e.target);
        const isInIndustries = industriesRef.current?.contains(e.target) || industriesMenuRef.current?.contains(e.target);
        const isInAbout = aboutRef.current?.contains(e.target) || aboutMenuRef.current?.contains(e.target);
        
        // If mouse is not in any dropdown area, close all
        if (!isInSolutions && !isInIndustries && !isInAbout) {
          setOpenDropdown(null);
          isHoveringRef.current = false;
        }
      }, 50);
    };
    
    document.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [openDropdown]);

  // Fetch solutions and industries
  useEffect(() => {
    loadSolutions();
    loadIndustries();
  }, []);

  const loadSolutions = async () => {
    setLoading(prev => ({ ...prev, solutions: true }));
    try {
      const data = await fetchSolutions();
      setSolutions(data);
    } catch (error) {
      console.error('Error loading solutions:', error);
    } finally {
      setLoading(prev => ({ ...prev, solutions: false }));
    }
  };

  const loadIndustries = async () => {
    setLoading(prev => ({ ...prev, industries: true }));
    try {
      const data = await fetchIndustries();
      setIndustries(data);
    } catch (error) {
      console.error('Error loading industries:', error);
    } finally {
      setLoading(prev => ({ ...prev, industries: false }));
    }
  };

  // Group solutions by category
  const solutionsByCategory = solutions.reduce((acc, solution) => {
    const category = solution.category || 'Other Solutions';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(solution);
    return acc;
  }, {});

  const solutionCategories = Object.keys(solutionsByCategory);

  // Split industries into two columns
  const midPoint = Math.ceil(industries.length / 2);
  const industriesFirstColumn = industries.slice(0, midPoint);
  const industriesSecondColumn = industries.slice(midPoint);

  const navItems = [
    { label: 'Home', path: '/' },
    { 
      label: 'Our Solutions', 
      path: '/our-solutions',
      hasDropdown: true,
    },
    { 
      label: 'Industries', 
      path: '/industries-we-serve',
      hasDropdown: true,
    },
    { 
      label: 'About', 
      path: '/about-us',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Our Organization', path: '/about/organization', icon: '🏢', description: 'Learn about our mission' },
        { label: 'Why Choose Us', path: '/about/why-choose-us', icon: '⭐', description: 'Our competitive advantages' },
        { label: 'Case Studies', path: '/about/case-studies', icon: '📊', description: 'Success stories' },
        { label: 'Careers', path: '/about/careers', icon: '💼', description: 'Join our team' },
      ]
    },
    { label: 'Contact', path: '/contact-us' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle mouse enter on dropdown button with debounce
  const handleMouseEnter = (dropdownName) => {
    if (!isHoveringRef.current) {
      isHoveringRef.current = true;
      setOpenDropdown(dropdownName);
    }
  };

  // Handle mouse leave from dropdown button
  const handleMouseLeave = () => {
    // Don't close immediately, let the global handler handle it
    // This prevents flickering when moving between tabs
  };

  // Handle menu item click
  const handleMenuItemClick = () => {
    setOpenDropdown(null);
    isHoveringRef.current = false;
  };

  // Mobile dropdown handlers
  const handleMobileSolutionsToggle = () => {
    setMobileSolutionsOpen(!mobileSolutionsOpen);
  };

  const handleMobileIndustriesToggle = () => {
    setMobileIndustriesOpen(!mobileIndustriesOpen);
  };

  const handleMobileAboutToggle = () => {
    setMobileAboutOpen(!mobileAboutOpen);
  };

  // Desktop Solutions Menu
  const renderSolutionsMenu = () => (
    <Menu
      open={openDropdown === 'solutions'}
      anchorEl={solutionsRef.current}
      onClose={() => {
        setOpenDropdown(null);
        isHoveringRef.current = false;
      }}
      TransitionComponent={Fade}
      transitionDuration={300}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      MenuListProps={{
        ref: solutionsMenuRef,
        onMouseEnter: () => {
          setOpenDropdown('solutions');
          isHoveringRef.current = true;
        },
      }}
      PaperProps={{
        sx: {
          mt: 2,
          background: colors.neutral.white,
          color: colors.text.primary,
          borderRadius: '12px',
          minWidth: 400,
          maxHeight: 600,
          overflowY: 'auto',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
          border: `1px solid ${colors.neutral.lightGray}`,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: colors.neutral.lightGray,
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: colors.primary.main,
            borderRadius: '4px',
            '&:hover': {
              background: colors.primary.light,
            },
          },
        },
      }}
    >
      {loading.solutions ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={40} sx={{ color: colors.primary.main }} />
        </Box>
      ) : (
        solutionCategories.map((category, index) => (
          <Box 
            key={category}
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}
            sx={{
              transition: 'all 0.3s ease',
              transform: hoveredCategory === category ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <Box
              sx={{
                px: 3,
                py: 2,
                background: `linear-gradient(90deg, ${colors.secondary.main}10 0%, transparent 100%)`,
                borderLeft: `4px solid ${colors.secondary.main}`,
              }}
            >
              <Typography
                sx={{
                  color: colors.primary.main,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <RocketLaunchIcon fontSize="small" sx={{ color: colors.secondary.main }} />
                {category}
              </Typography>
            </Box>
            
            <Grid container spacing={1} sx={{ p: 2 }}>
              {solutionsByCategory[category].map((solution) => (
                <Grid item xs={12} key={solution._id}>
                  <GradientMenuItem
                    component={RouterLink}
                    to={`/solution/${solution._id}`}
                    onClick={handleMenuItemClick}
                    sx={{
                      color: colors.text.secondary,
                      py: 1.5,
                      px: 2,
                      borderRadius: '8px',
                      '&:hover': {
                        bgcolor: `${colors.secondary.main}10`,
                        color: colors.primary.main,
                        transform: 'translateX(8px)',
                      },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: `${colors.primary.main}10`,
                        color: colors.primary.main,
                        width: 32,
                        height: 32,
                        fontSize: '1.2rem',
                      }}
                    >
                      {solution.icon || '🔹'}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600} color={colors.text.primary}>
                        {solution.title}
                      </Typography>
                      {solution.shortDescription && (
                        <Typography variant="caption" sx={{ color: colors.text.disabled }}>
                          {solution.shortDescription.substring(0, 60)}...
                        </Typography>
                      )}
                    </Box>
                    <ArrowForwardIcon sx={{ 
                      fontSize: 16, 
                      opacity: 0, 
                      transition: 'opacity 0.2s',
                      color: colors.secondary.main,
                    }} />
                  </GradientMenuItem>
                </Grid>
              ))}
            </Grid>
            
            {index < solutionCategories.length - 1 && (
              <Divider sx={{ 
                bgcolor: colors.neutral.lightGray,
                my: 1,
              }} />
            )}
          </Box>
        ))
      )}
      
      <Box sx={{ p: 2, background: colors.neutral.offWhite }}>
        <Button
          component={RouterLink}
          to="/our-solutions"
          onClick={handleMenuItemClick}
          endIcon={<ArrowForwardIcon />}
          fullWidth
          sx={{
            color: colors.primary.main,
            border: `1px solid ${colors.primary.main}30`,
            borderRadius: '8px',
            py: 1,
            '&:hover': {
              borderColor: colors.primary.main,
              background: `${colors.primary.main}05`,
            },
          }}
        >
          Explore All Solutions
        </Button>
      </Box>
    </Menu>
  );

  // Desktop Industries Menu
  const renderIndustriesMenu = () => (
    <Menu
      open={openDropdown === 'industries'}
      anchorEl={industriesRef.current}
      onClose={() => {
        setOpenDropdown(null);
        isHoveringRef.current = false;
      }}
      TransitionComponent={Grow}
      transitionDuration={300}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      MenuListProps={{
        ref: industriesMenuRef,
        onMouseEnter: () => {
          setOpenDropdown('industries');
          isHoveringRef.current = true;
        },
      }}
      PaperProps={{
        sx: {
          mt: 2,
          background: colors.neutral.white,
          color: colors.text.primary,
          borderRadius: '12px',
          minWidth: 600,
          p: 2,
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
          border: `1px solid ${colors.neutral.lightGray}`,
        },
      }}
    >
      {loading.industries ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={40} sx={{ color: colors.primary.main }} />
        </Box>
      ) : (
        <>
          <Typography
            sx={{
              px: 2,
              py: 1,
              color: colors.primary.main,
              fontWeight: 600,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Industries We Serve
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              {industriesFirstColumn.map((industry) => (
                <GradientMenuItem
                  key={industry._id}
                  component={RouterLink}
                  to={`/industry/${industry._id}`}
                  onClick={handleMenuItemClick}
                  sx={{
                    color: colors.text.secondary,
                    py: 2,
                    px: 2,
                    borderRadius: '8px',
                    mb: 1,
                    '&:hover': {
                      bgcolor: `${colors.secondary.main}10`,
                      color: colors.primary.main,
                      transform: 'translateY(-2px)',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: `${colors.primary.main}10`,
                      color: colors.primary.main,
                      width: 40,
                      height: 40,
                    }}
                  >
                    {industry.icon || '🏢'}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={600} color={colors.text.primary}>
                      {industry.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.disabled }}>
                      {industry.industryType || 'Enterprise Solutions'}
                    </Typography>
                  </Box>
                </GradientMenuItem>
              ))}
            </Grid>
            
            <Grid item xs={6}>
              {industriesSecondColumn.map((industry) => (
                <GradientMenuItem
                  key={industry._id}
                  component={RouterLink}
                  to={`/industry/${industry._id}`}
                  onClick={handleMenuItemClick}
                  sx={{
                    color: colors.text.secondary,
                    py: 2,
                    px: 2,
                    borderRadius: '8px',
                    mb: 1,
                    '&:hover': {
                      bgcolor: `${colors.secondary.main}10`,
                      color: colors.primary.main,
                      transform: 'translateY(-2px)',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: `${colors.primary.main}10`,
                      color: colors.primary.main,
                      width: 40,
                      height: 40,
                    }}
                  >
                    {industry.icon || '🏢'}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={600} color={colors.text.primary}>
                      {industry.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.disabled }}>
                      {industry.industryType || 'Enterprise Solutions'}
                    </Typography>
                  </Box>
                </GradientMenuItem>
              ))}
            </Grid>
          </Grid>
          
          <Divider sx={{ bgcolor: colors.neutral.lightGray, my: 2 }} />
          
          <Box sx={{ textAlign: 'center' }}>
            <Button
              component={RouterLink}
              to="/industries-we-serve"
              onClick={handleMenuItemClick}
              endIcon={<ArrowForwardIcon />}
              sx={{
                color: colors.primary.main,
                '&:hover': {
                  gap: 1,
                },
              }}
            >
              View All Industries
            </Button>
          </Box>
        </>
      )}
    </Menu>
  );

  // Desktop About Menu
  const renderAboutMenu = () => (
    <Menu
      open={openDropdown === 'about'}
      anchorEl={aboutRef.current}
      onClose={() => {
        setOpenDropdown(null);
        isHoveringRef.current = false;
      }}
      TransitionComponent={Zoom}
      transitionDuration={300}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      MenuListProps={{
        ref: aboutMenuRef,
        onMouseEnter: () => {
          setOpenDropdown('about');
          isHoveringRef.current = true;
        },
      }}
      PaperProps={{
        sx: {
          mt: 2,
          background: colors.neutral.white,
          color: colors.text.primary,
          borderRadius: '12px',
          minWidth: 280,
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
          border: `1px solid ${colors.neutral.lightGray}`,
        },
      }}
    >
      {navItems.find(item => item.label === 'About')?.dropdownItems.map((item) => (
        <GradientMenuItem
          key={item.path}
          component={RouterLink}
          to={item.path}
          onClick={handleMenuItemClick}
          sx={{
            color: location.pathname === item.path ? colors.primary.main : colors.text.secondary,
            py: 2,
            px: 2.5,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            '&:hover': {
              bgcolor: `${colors.secondary.main}10`,
              color: colors.primary.main,
            },
          }}
        >
          <Avatar
            sx={{
              bgcolor: `${colors.primary.main}10`,
              color: colors.primary.main,
              width: 32,
              height: 32,
              fontSize: '1rem',
            }}
          >
            {item.icon}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600} color={colors.text.primary}>
              {item.label}
            </Typography>
            <Typography variant="caption" sx={{ color: colors.text.disabled }}>
              {item.description}
            </Typography>
          </Box>
        </GradientMenuItem>
      ))}
    </Menu>
  );

  // Mobile Drawer (keeping the same)
  const drawer = (
    <Box sx={{ 
      height: '100%',
      background: colors.neutral.white,
      color: colors.text.primary,
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 2.5,
        borderBottom: `1px solid ${colors.neutral.lightGray}`,
        background: colors.primary.gradient,
      }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: colors.neutral.white,
            letterSpacing: '0.5px',
          }}
        >
          SPEEDLIGHT
        </Typography>
        <IconButton 
          onClick={handleDrawerToggle} 
          sx={{ 
            color: colors.neutral.white,
            '&:hover': {
              background: `${colors.neutral.white}20`,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List sx={{ p: 2 }}>
        {/* Home */}
        <Slide direction="right" in={true} timeout={300}>
          <ListItem
            component={RouterLink}
            to="/"
            onClick={handleDrawerToggle}
            sx={{
              color: location.pathname === '/' ? colors.primary.main : colors.text.primary,
              borderRadius: '8px',
              mb: 1,
              '&:hover': { 
                bgcolor: `${colors.secondary.main}10`,
                transform: 'translateX(8px)',
              },
              transition: 'all 0.2s ease',
              ...(location.pathname === '/' && {
                bgcolor: `${colors.primary.main}10`,
              }),
            }}
          >
            <ListItemText 
              primary="Home" 
              primaryTypographyProps={{ 
                fontWeight: location.pathname === '/' ? 600 : 400,
              }}
            />
          </ListItem>
        </Slide>

        {/* Our Solutions with Categories */}
        <Slide direction="right" in={true} timeout={400}>
          <ListItem 
            button 
            onClick={handleMobileSolutionsToggle}
            sx={{
              color: colors.text.primary,
              borderRadius: '8px',
              mb: 1,
              '&:hover': { bgcolor: `${colors.secondary.main}10` },
            }}
          >
            <ListItemText 
              primary="Our Solutions"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
            {mobileSolutionsOpen ? 
              <ExpandLessIcon sx={{ color: colors.primary.main }} /> : 
              <ExpandMoreIcon sx={{ color: colors.text.secondary }} />
            }
          </ListItem>
        </Slide>
        
        <Collapse in={mobileSolutionsOpen} timeout="auto" unmountOnExit>
          <Box sx={{ 
            bgcolor: colors.neutral.offWhite,
            borderRadius: '8px',
            ml: 2,
            mb: 2,
            p: 1.5,
            border: `1px solid ${colors.neutral.lightGray}`,
          }}>
            {loading.solutions ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <CircularProgress size={24} sx={{ color: colors.primary.main }} />
              </Box>
            ) : (
              solutionCategories.map((category) => (
                <Box key={category}>
                  <Typography
                    sx={{
                      px: 2,
                      py: 1,
                      color: colors.primary.main,
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {category}
                  </Typography>
                  
                  {solutionsByCategory[category].map((solution) => (
                    <ListItem
                      key={solution._id}
                      component={RouterLink}
                      to={`/solution/${solution._id}`}
                      onClick={handleDrawerToggle}
                      sx={{
                        color: colors.text.secondary,
                        py: 1,
                        pl: 2,
                        borderRadius: '6px',
                        '&:hover': { 
                          color: colors.primary.main,
                          bgcolor: `${colors.secondary.main}10`,
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Avatar
                          sx={{
                            bgcolor: `${colors.primary.main}10`,
                            color: colors.primary.main,
                            width: 28,
                            height: 28,
                            fontSize: '0.9rem',
                          }}
                        >
                          {solution.icon || '🔹'}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText 
                        primary={solution.title}
                        primaryTypographyProps={{ fontSize: '0.95rem' }}
                      />
                    </ListItem>
                  ))}
                </Box>
              ))
            )}
          </Box>
        </Collapse>

        {/* Industries */}
        <Slide direction="right" in={true} timeout={500}>
          <ListItem 
            button 
            onClick={handleMobileIndustriesToggle}
            sx={{
              color: colors.text.primary,
              borderRadius: '8px',
              mb: 1,
              '&:hover': { bgcolor: `${colors.secondary.main}10` },
            }}
          >
            <ListItemText 
              primary="Industries"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
            {mobileIndustriesOpen ? 
              <ExpandLessIcon sx={{ color: colors.primary.main }} /> : 
              <ExpandMoreIcon sx={{ color: colors.text.secondary }} />
            }
          </ListItem>
        </Slide>

        <Collapse in={mobileIndustriesOpen} timeout="auto" unmountOnExit>
          <Box sx={{ 
            bgcolor: colors.neutral.offWhite,
            borderRadius: '8px',
            ml: 2,
            mb: 2,
            p: 1.5,
            border: `1px solid ${colors.neutral.lightGray}`,
          }}>
            {loading.industries ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <CircularProgress size={24} sx={{ color: colors.primary.main }} />
              </Box>
            ) : (
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  {industriesFirstColumn.map((industry) => (
                    <ListItem
                      key={industry._id}
                      component={RouterLink}
                      to={`/industry/${industry._id}`}
                      onClick={handleDrawerToggle}
                      sx={{
                        color: colors.text.secondary,
                        py: 1,
                        px: 1,
                        borderRadius: '6px',
                        '&:hover': { 
                          color: colors.primary.main,
                          bgcolor: `${colors.secondary.main}10`,
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <Box sx={{ fontSize: '1.2rem' }}>{industry.icon || '🏢'}</Box>
                      </ListItemIcon>
                      <ListItemText 
                        primary={industry.name}
                        primaryTypographyProps={{ fontSize: '0.9rem' }}
                      />
                    </ListItem>
                  ))}
                </Grid>
                <Grid item xs={6}>
                  {industriesSecondColumn.map((industry) => (
                    <ListItem
                      key={industry._id}
                      component={RouterLink}
                      to={`/industry/${industry._id}`}
                      onClick={handleDrawerToggle}
                      sx={{
                        color: colors.text.secondary,
                        py: 1,
                        px: 1,
                        borderRadius: '6px',
                        '&:hover': { 
                          color: colors.primary.main,
                          bgcolor: `${colors.secondary.main}10`,
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <Box sx={{ fontSize: '1.2rem' }}>{industry.icon || '🏢'}</Box>
                      </ListItemIcon>
                      <ListItemText 
                        primary={industry.name}
                        primaryTypographyProps={{ fontSize: '0.9rem' }}
                      />
                    </ListItem>
                  ))}
                </Grid>
              </Grid>
            )}
          </Box>
        </Collapse>

        {/* About */}
        <Slide direction="right" in={true} timeout={600}>
          <ListItem 
            button 
            onClick={handleMobileAboutToggle}
            sx={{
              color: colors.text.primary,
              borderRadius: '8px',
              mb: 1,
              '&:hover': { bgcolor: `${colors.secondary.main}10` },
            }}
          >
            <ListItemText 
              primary="About"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
            {mobileAboutOpen ? 
              <ExpandLessIcon sx={{ color: colors.primary.main }} /> : 
              <ExpandMoreIcon sx={{ color: colors.text.secondary }} />
            }
          </ListItem>
        </Slide>

        <Collapse in={mobileAboutOpen} timeout="auto" unmountOnExit>
          <Box sx={{ 
            bgcolor: colors.neutral.offWhite,
            borderRadius: '8px',
            ml: 2,
            mb: 2,
            p: 1.5,
            border: `1px solid ${colors.neutral.lightGray}`,
          }}>
            {navItems.find(item => item.label === 'About')?.dropdownItems.map((item) => (
              <ListItem
                key={item.path}
                component={RouterLink}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  color: colors.text.secondary,
                  py: 1,
                  px: 2,
                  borderRadius: '6px',
                  '&:hover': { 
                    color: colors.primary.main,
                    bgcolor: `${colors.secondary.main}10`,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Typography sx={{ fontSize: '1.2rem' }}>{item.icon}</Typography>
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  secondary={item.description}
                  primaryTypographyProps={{ fontSize: '0.95rem' }}
                  secondaryTypographyProps={{ fontSize: '0.75rem', color: colors.text.disabled }}
                />
              </ListItem>
            ))}
          </Box>
        </Collapse>

        {/* Contact */}
        <Slide direction="right" in={true} timeout={700}>
          <ListItem
            component={RouterLink}
            to="/contact-us"
            onClick={handleDrawerToggle}
            sx={{
              color: location.pathname === '/contact-us' ? colors.primary.main : colors.text.primary,
              borderRadius: '8px',
              mb: 2,
              '&:hover': { 
                bgcolor: `${colors.secondary.main}10`,
                transform: 'translateX(8px)',
              },
              transition: 'all 0.2s ease',
              ...(location.pathname === '/contact-us' && {
                bgcolor: `${colors.primary.main}10`,
              }),
            }}
          >
            <ListItemText 
              primary="Contact"
              primaryTypographyProps={{ 
                fontWeight: location.pathname === '/contact-us' ? 600 : 400,
              }}
            />
          </ListItem>
        </Slide>

        {/* Get Started Button */}
        <Slide direction="up" in={true} timeout={800}>
          <ListItem
            component={RouterLink}
            to="/get-started"
            onClick={handleDrawerToggle}
            sx={{
              background: colors.primary.gradient,
              color: colors.neutral.white,
              borderRadius: '10px',
              py: 1.5,
              mt: 2,
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: `0 10px 20px -5px ${colors.primary.main}80`,
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ListItemText 
              primary="Get Started" 
              sx={{ textAlign: 'center' }}
              primaryTypographyProps={{ 
                fontWeight: 700,
                letterSpacing: '0.5px',
              }}
            />
          </ListItem>
        </Slide>
      </List>
    </Box>
  );

  return (
    <StyledAppBar 
      position="sticky" 
      elevation={0}
      scrolled={scrolled ? 1 : 0}
      sx={{ 
        width: '100%',
        zIndex: 1100,
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
        <Toolbar disableGutters sx={{ 
          height: { xs: 64, sm: 72, md: 80 },
          justifyContent: 'space-between',
          transition: 'height 0.3s ease',
        }}>
          {/* Logo */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              position: 'relative',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                color: colors.neutral.white,
                letterSpacing: '1px',
                whiteSpace: 'nowrap',
              }}
            >
              SPEEDLIGHT
            </Typography>
            <Chip
              label="INFOSOLUTIONS"
              size="small"
              sx={{
                display: { xs: 'none', sm: 'flex' },
                background: `${colors.secondary.main}20`,
                color: colors.neutral.white,
                border: `1px solid ${colors.secondary.main}`,
                fontWeight: 500,
                fontSize: '0.7rem',
                height: 24,
                backdropFilter: 'blur(5px)',
              }}
            />
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1,
              ml: 'auto',
              mr: 2,
            }}>
              {/* Home */}
              <NavButton
                component={RouterLink}
                to="/"
                active={location.pathname === '/' ? 1 : 0}
              >
                Home
              </NavButton>

              {/* Our Solutions Dropdown */}
              <Box 
                ref={solutionsRef}
                onMouseEnter={() => handleMouseEnter('solutions')}
                onMouseLeave={handleMouseLeave}
                sx={{ position: 'relative' }}
              >
                <NavButton
                  active={openDropdown === 'solutions' || location.pathname.startsWith('/solution') ? 1 : 0}
                  endIcon={<ExpandMoreIcon sx={{ 
                    transition: 'transform 0.3s',
                    transform: openDropdown === 'solutions' ? 'rotate(180deg)' : 'none',
                  }} />}
                >
                  Our Solutions
                </NavButton>
                {renderSolutionsMenu()}
              </Box>

              {/* Industries Dropdown */}
              <Box 
                ref={industriesRef}
                onMouseEnter={() => handleMouseEnter('industries')}
                onMouseLeave={handleMouseLeave}
                sx={{ position: 'relative' }}
              >
                <NavButton
                  active={openDropdown === 'industries' || location.pathname.startsWith('/industry') ? 1 : 0}
                  endIcon={<ExpandMoreIcon sx={{ 
                    transition: 'transform 0.3s',
                    transform: openDropdown === 'industries' ? 'rotate(180deg)' : 'none',
                  }} />}
                >
                  Industries
                </NavButton>
                {renderIndustriesMenu()}
              </Box>

              {/* About Dropdown */}
              <Box 
                ref={aboutRef}
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}
                sx={{ position: 'relative' }}
              >
                <NavButton
                  active={openDropdown === 'about' || location.pathname.startsWith('/about') ? 1 : 0}
                  endIcon={<ExpandMoreIcon sx={{ 
                    transition: 'transform 0.3s',
                    transform: openDropdown === 'about' ? 'rotate(180deg)' : 'none',
                  }} />}
                >
                  About
                </NavButton>
                {renderAboutMenu()}
              </Box>

              {/* Contact */}
              <NavButton
                component={RouterLink}
                to="/contact-us"
                active={location.pathname === '/contact-us' ? 1 : 0}
              >
                Contact
              </NavButton>
            </Box>
          )}

          {/* Get Started Button - Desktop */}
          {!isMobile && (
            <Button
              component={RouterLink}
              to="/get-started"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                background: colors.neutral.white,
                color: colors.primary.main,
                px: 3,
                py: 1,
                borderRadius: '8px',
                fontWeight: 600,
                '&:hover': {
                  background: colors.neutral.offWhite,
                  transform: 'scale(1.05)',
                  boxShadow: `0 10px 20px -5px ${colors.primary.main}80`,
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get Started
            </Button>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ 
                color: colors.neutral.white,
                '&:hover': {
                  background: `${colors.neutral.white}20`,
                  transform: 'rotate(90deg)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { 
            width: 320,
            bgcolor: 'transparent',
          },
        }}
      >
        {drawer}
      </Drawer>
    </StyledAppBar>
  );
};

export default Navbar;