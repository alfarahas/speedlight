import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../services/auth';

const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 50%)',
    animation: 'pulse 15s ease-in-out infinite',
  },
  '@keyframes pulse': {
    '0%, 100%': { transform: 'translate(-10%, -10%) rotate(0deg)' },
    '50%': { transform: 'translate(0%, 0%) rotate(5deg)' },
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: '24px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  position: 'relative',
  zIndex: 1,
  width: '100%',
  maxWidth: '450px',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '2rem',
  textAlign: 'center',
  marginBottom: theme.spacing(1),
  '& .blue': {
    color: '#2563eb',
  },
}));

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(credentials.username, credentials.password);
    
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <LoginContainer>
      <Container maxWidth="sm">
        <StyledPaper elevation={0}>
          <LogoText variant="h4">
            SPEEDLIGHT{' '}
            <span className="blue">INFOSOLUTIONS</span>
          </LogoText>
          
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              mb: 4, 
              color: 'text.secondary',
              fontSize: '0.95rem',
            }}
          >
            Admin Panel Login
          </Typography>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: '12px',
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: '12px' },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={credentials.password}
              onChange={handleChange}
              required
              sx={{ mb: 4 }}
              InputProps={{
                sx: { borderRadius: '12px' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.8,
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                background: 'linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1d4ed8 30%, #2563eb 90%)',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Demo credentials */}
          <Box 
            sx={{ 
              mt: 4,
              p: 3,
              bgcolor: '#f8fafc',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
            }}
          >
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 600,
                mb: 1.5,
                color: 'text.primary',
              }}
            >
              Demo Credentials
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <strong>Username:</strong> admin
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <strong>Password:</strong> admin123
              </Typography>
            </Box>
          </Box>
        </StyledPaper>
      </Container>
    </LoginContainer>
  );
};

export default AdminLogin;