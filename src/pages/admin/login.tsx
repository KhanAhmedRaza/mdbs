import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { AdminPanelSettings as AdminIcon } from '@mui/icons-material';

export default function AdminLoginPage() {
  const theme = useTheme();
  const router = useRouter();
  const [error, setError] = useState('');

  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: '',
  });

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would typically make an API call to verify credentials
      if (adminCredentials.username === 'admin' && adminCredentials.password === 'admin123') {
        localStorage.setItem('adminToken', 'admin-token');
        router.push('/admin/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ width: '100%', mt: 3, p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <AdminIcon sx={{ fontSize: 40, mr: 2 }} />
            <Typography component="h1" variant="h5">
              Admin Login
            </Typography>
          </Box>

          {error && (
            <Box sx={{ mb: 2 }}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}

          <form onSubmit={handleAdminLogin}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={adminCredentials.username}
              onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="admin-password"
              autoComplete="current-password"
              value={adminCredentials.password}
              onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
} 