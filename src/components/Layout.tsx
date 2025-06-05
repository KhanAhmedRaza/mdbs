import React from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import LanguageIcon from '@mui/icons-material/Language';
import { useEffect, useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const theme = useTheme();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if we're on an admin page and have the correct key
    const isAdminPath = router.pathname.startsWith('/admin');
    const hasValidKey = router.query.key === 'mdb2024';
    setIsAdmin(isAdminPath && hasValidKey);
  }, [router.pathname, router.query]);

  const handleLanguageToggle = () => {
    const newLocale = router.locale === 'en' ? 'ar' : 'en';
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  const handleLogout = () => {
    router.push('/');
  };

  const handleLogin = () => {
    router.push('/auth');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => router.push('/')}
          >
            MD Barber Club
          </Typography>
          
          <IconButton
            color="inherit"
            onClick={handleLanguageToggle}
            sx={{ mr: 2 }}
          >
            <LanguageIcon />
          </IconButton>

          {!isAdmin && (
            <Button color="inherit" onClick={() => router.push('/services')}>
              Services
            </Button>
          )}
          
          {!isAdmin && (
            <Button color="inherit" onClick={() => router.push('/gallery')}>
              Gallery
            </Button>
          )}

          {isAdmin ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: theme.palette.grey[200],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} MD Barber Club. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 