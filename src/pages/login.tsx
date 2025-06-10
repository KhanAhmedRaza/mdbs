import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { useRouter } from 'next/router';
import { Person as UserIcon } from '@mui/icons-material';
import Layout from '../components/Layout';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would typically make an API call to verify credentials
      if (credentials.email && credentials.password) {
        // Simulate successful login
        const mockUserProfile = {
          name: 'John Doe',
          email: credentials.email,
          preferences: {
            services: [],
            barber: ''
          },
          upcomingBookings: [
            {
              service: 'Haircut',
              date: '2024-03-25',
              time: '10:00 AM'
            }
          ]
        };
        localStorage.setItem('userProfile', JSON.stringify(mockUserProfile));
        router.push('/profile');
      } else {
        setError('Please fill in all fields');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Layout>
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
              <UserIcon sx={{ fontSize: 40, mr: 2 }} />
              <Typography component="h1" variant="h5">
                User Login
              </Typography>
            </Box>

            {error && (
              <Box sx={{ mb: 2 }}>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}

            <form onSubmit={handleLogin}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
    </Layout>
  );
} 