import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  GridView as SolutionsIcon,
  Business as IndustriesIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
  },
}));

const StatAvatar = styled(Avatar)(({ theme, bgcolor }) => ({
  width: 56,
  height: 56,
  backgroundColor: bgcolor || theme.palette.primary.main,
  color: 'white',
}));

const DashboardHome = () => {
  const [stats, setStats] = useState({
    solutions: 0,
    industries: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [solutionsRes, industriesRes] = await Promise.all([
        axios.get(`${API_URL}/solutions`, { headers }),
        axios.get(`${API_URL}/industries`, { headers })
      ]);

      setStats({
        solutions: solutionsRes.data.length,
        industries: industriesRes.data.length
      });

      // Create recent activities based on data
      const activities = [];
      if (solutionsRes.data.length > 0) {
        activities.push({
          id: 1,
          text: `Total ${solutionsRes.data.length} solutions available`,
          time: 'Current',
          icon: SolutionsIcon,
          bgColor: '#dbeafe',
          color: '#2563eb',
        });
      }
      if (industriesRes.data.length > 0) {
        activities.push({
          id: 2,
          text: `Serving ${industriesRes.data.length} industries`,
          time: 'Current',
          icon: IndustriesIcon,
          bgColor: '#d1fae5',
          color: '#10b981',
        });
      }
      setRecentActivities(activities);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Solutions',
      value: stats.solutions,
      icon: SolutionsIcon,
      color: '#2563eb',
      bgColor: '#dbeafe',
      link: '/admin/solutions',
      description: 'Active solutions in the system',
    },
    {
      title: 'Total Industries',
      value: stats.industries,
      icon: IndustriesIcon,
      color: '#10b981',
      bgColor: '#d1fae5',
      link: '/admin/industries',
      description: 'Industries we serve',
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress sx={{ color: '#2563eb' }} />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: '#0f172a' }}>
        Dashboard Overview
      </Typography>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <StyledCard onClick={() => window.location.href = card.link}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <StatAvatar bgcolor={card.bgColor}>
                      <IconComponent sx={{ color: card.color }} />
                    </StatAvatar>
                    <Box sx={{ ml: 2, flex: 1 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: card.color }}>
                        {card.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.title}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {card.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: card.color }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      View Details
                    </Typography>
                    <ArrowForwardIcon sx={{ ml: 1, fontSize: 16 }} />
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>

      {/* Recent Activity & Quick Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: '16px' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Recent Activity
            </Typography>
            {recentActivities.length > 0 ? (
              <List>
                {recentActivities.map((activity) => {
                  const ActivityIcon = activity.icon;
                  return (
                    <ListItem key={activity.id} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: activity.bgColor, width: 40, height: 40 }}>
                          <ActivityIcon sx={{ color: activity.color, fontSize: 20 }} />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.text}
                        secondary={activity.time}
                      />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
                No recent activities
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: '16px' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  component={Link}
                  to="/admin/solutions"
                  variant="outlined"
                  fullWidth
                  sx={{
                    justifyContent: 'flex-start',
                    p: 2,
                    borderRadius: '12px',
                    borderColor: '#e2e8f0',
                    color: '#0f172a',
                    '&:hover': {
                      borderColor: '#2563eb',
                      bgcolor: '#dbeafe',
                    },
                  }}
                >
                  <SolutionsIcon sx={{ mr: 2, color: '#2563eb' }} />
                  <Box sx={{ textAlign: 'left', flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Manage Solutions
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Add, edit, or remove solutions
                    </Typography>
                  </Box>
                  <ArrowForwardIcon sx={{ color: '#2563eb' }} />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  component={Link}
                  to="/admin/industries"
                  variant="outlined"
                  fullWidth
                  sx={{
                    justifyContent: 'flex-start',
                    p: 2,
                    borderRadius: '12px',
                    borderColor: '#e2e8f0',
                    color: '#0f172a',
                    '&:hover': {
                      borderColor: '#10b981',
                      bgcolor: '#d1fae5',
                    },
                  }}
                >
                  <IndustriesIcon sx={{ mr: 2, color: '#10b981' }} />
                  <Box sx={{ textAlign: 'left', flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Manage Industries
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Add, edit, or remove industries
                    </Typography>
                  </Box>
                  <ArrowForwardIcon sx={{ color: '#10b981' }} />
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;