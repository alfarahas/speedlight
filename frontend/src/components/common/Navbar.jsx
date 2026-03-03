import { useState } from 'react';
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
  useMediaQuery,
  useTheme,
  Container,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  Fade,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BusinessIcon from '@mui/icons-material/Business';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WorkIcon from '@mui/icons-material/Work';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutAnchorEl, setAboutAnchorEl] = useState(null);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Our Solutions', path: '/our-solutions' },
    { label: 'Industries We Serve', path: '/industries-we-serve' },
    { 
      label: 'About Us', 
      path: '/about-us',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Our Organization', path: '/about/organization', icon: <BusinessIcon fontSize="small" /> },
        { label: 'Why Choose Us', path: '/about/why-choose-us', icon: <ThumbUpIcon fontSize="small" /> },
        { label: 'Case Studies', path: '/about/case-studies', icon: <MenuBookIcon fontSize="small" /> },
        { label: 'Careers', path: '/about/careers', icon: <WorkIcon fontSize="small" /> },
      ]
    },
    { label: 'Contact Us', path: '/contact-us' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAboutClick = (event) => {
    setAboutAnchorEl(event.currentTarget);
  };

  const handleAboutClose = () => {
    setAboutAnchorEl(null);
  };

  const handleMobileAboutToggle = () => {
    setMobileAboutOpen(!mobileAboutOpen);
  };

  const drawer = (
    <Box sx={{ bgcolor: '#0f172a', height: '100%', color: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <Box key={item.path}>
            {item.hasDropdown ? (
              <>
                <ListItem 
                  button 
                  onClick={handleMobileAboutToggle}
                  sx={{
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(37, 99, 235, 0.1)' },
                  }}
                >
                  <ListItemText primary={item.label} />
                  {mobileAboutOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                
                {/* Mobile Dropdown Items */}
                {mobileAboutOpen && (
                  <Box sx={{ bgcolor: 'rgba(255,255,255,0.05)', pl: 4 }}>
                    {item.dropdownItems.map((dropdownItem) => (
                      <ListItem
                        key={dropdownItem.path}
                        component={RouterLink}
                        to={dropdownItem.path}
                        onClick={handleDrawerToggle}
                        sx={{
                          color: '#94a3b8',
                          py: 1.5,
                          '&:hover': { 
                            color: 'white',
                            bgcolor: 'rgba(37, 99, 235, 0.1)',
                          },
                          ...(location.pathname === dropdownItem.path && {
                            color: '#2563eb',
                            bgcolor: 'rgba(37, 99, 235, 0.2)',
                          }),
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ color: '#2563eb', display: 'flex', alignItems: 'center' }}>
                            {dropdownItem.icon}
                          </Box>
                          <ListItemText primary={dropdownItem.label} />
                        </Box>
                      </ListItem>
                    ))}
                  </Box>
                )}
              </>
            ) : (
              <ListItem
                component={RouterLink}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(37, 99, 235, 0.1)' },
                  ...(location.pathname === item.path && {
                    color: '#2563eb',
                    bgcolor: 'rgba(37, 99, 235, 0.2)',
                    borderLeft: '4px solid #2563eb',
                  }),
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            )}
          </Box>
        ))}
        <ListItem
          component={RouterLink}
          to="/get-started"
          onClick={handleDrawerToggle}
          sx={{
            bgcolor: '#2563eb',
            color: 'white',
            '&:hover': { bgcolor: '#1d4ed8' },
            mx: 2,
            borderRadius: 1,
            mt: 2,
          }}
        >
          <ListItemText primary="Get Started" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        bgcolor: '#0f172a',
        width: '100%',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
        <Toolbar disableGutters sx={{ 
          height: { xs: 64, sm: 72, md: 80 },
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: 700,
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
              whiteSpace: 'nowrap',
            }}
          >
            SPEEDLIGHT{' '}
            <Box 
              component="span" 
              sx={{ 
                color: '#2563eb',
                display: { xs: 'none', sm: 'inline' },
              }}
            >
              INFOSOLUTIONS
            </Box>
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: { md: 2, lg: 4 },
              ml: 'auto',
              mr: 2,
            }}>
              {navItems.map((item) => (
                <Box key={item.path}>
                  {item.hasDropdown ? (
                    <>
                      <Button
                        onClick={handleAboutClick}
                        sx={{
                          color: location.pathname.startsWith('/about') ? '#2563eb' : 'white',
                          fontSize: { md: '0.85rem', lg: '0.95rem' },
                          whiteSpace: 'nowrap',
                          '&:hover': {
                            color: '#2563eb',
                            bgcolor: 'transparent',
                          },
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        {item.label}
                        <ExpandMoreIcon fontSize="small" />
                      </Button>
                      <Menu
                        anchorEl={aboutAnchorEl}
                        open={Boolean(aboutAnchorEl)}
                        onClose={handleAboutClose}
                        TransitionComponent={Fade}
                        PaperProps={{
                          sx: {
                            mt: 2,
                            bgcolor: '#0f172a',
                            color: 'white',
                            borderRadius: '12px',
                            minWidth: 220,
                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.1)',
                          },
                        }}
                      >
                        {item.dropdownItems.map((dropdownItem) => (
                          <MenuItem
                            key={dropdownItem.path}
                            component={RouterLink}
                            to={dropdownItem.path}
                            onClick={handleAboutClose}
                            sx={{
                              color: location.pathname === dropdownItem.path ? '#2563eb' : '#94a3b8',
                              gap: 2,
                              py: 1.5,
                              '&:hover': {
                                bgcolor: 'rgba(37, 99, 235, 0.1)',
                                color: 'white',
                              },
                            }}
                          >
                            <Box sx={{ color: '#2563eb', display: 'flex', alignItems: 'center' }}>
                              {dropdownItem.icon}
                            </Box>
                            {dropdownItem.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </>
                  ) : (
                    <Button
                      component={RouterLink}
                      to={item.path}
                      sx={{
                        color: location.pathname === item.path ? '#2563eb' : 'white',
                        fontSize: { md: '0.85rem', lg: '0.95rem' },
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          color: '#2563eb',
                          bgcolor: 'transparent',
                        },
                        ...(location.pathname === item.path && {
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -24,
                            left: 0,
                            right: 0,
                            height: 2,
                            bgcolor: '#2563eb',
                          },
                        }),
                      }}
                    >
                      {item.label}
                    </Button>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* Get Started Button - Desktop */}
          {!isMobile && (
            <Button
              component={RouterLink}
              to="/get-started"
              variant="contained"
              sx={{
                bgcolor: '#2563eb',
                color: 'white',
                '&:hover': {
                  bgcolor: '#1d4ed8',
                },
                fontSize: { md: '0.85rem', lg: '0.95rem' },
                px: { md: 2, lg: 3 },
                whiteSpace: 'nowrap',
              }}
            >
              Get Started
            </Button>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: 'white' }}
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
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            width: 300,
            bgcolor: '#0f172a',
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;