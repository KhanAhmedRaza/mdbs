import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

interface MainNavigationProps {
  onDrawerToggle?: () => void;
  showDrawerIcon?: boolean;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ 
  onDrawerToggle,
  showDrawerIcon = false 
}) => {
  const theme = useTheme();
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;
  const t = locale === 'ar' ? ar : en;
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isRtl = locale === 'ar';

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const handleDashboard = () => {
    router.push(isAdmin ? '/admin/dashboard' : '/dashboard');
    handleClose();
  };

  const toggleLanguage = async () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    await router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const handleAdminAccess = () => {
    router.push('/admin/login');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar 
          disableGutters 
          sx={{ 
            direction: isRtl ? 'rtl' : 'ltr',
          }}
        >
          {showDrawerIcon && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge={isRtl ? 'end' : 'start'}
              onClick={onDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: isRtl ? 0 : 2,
              ml: isRtl ? 2 : 0,
              display: 'flex',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MD Barber Club
          </Typography>

          <Box 
            sx={{ 
              flexGrow: 1, 
              display: { xs: 'none', md: 'flex' },
              justifyContent: isRtl ? 'flex-end' : 'flex-start',
              direction: isRtl ? 'rtl' : 'ltr',
            }}
          >
            <Button
              component={Link}
              href="/services"
              sx={{ color: 'white', display: 'block', mx: 1 }}
            >
              {t.common.navigation.services}
            </Button>
            <Button
              component={Link}
              href="/about"
              sx={{ color: 'white', display: 'block', mx: 1 }}
            >
              {t.common.navigation.about || 'About'}
            </Button>
            <Button
              component={Link}
              href="/contact"
              sx={{ color: 'white', display: 'block', mx: 1 }}
            >
              {t.common.navigation.contact}
            </Button>
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              direction: isRtl ? 'rtl' : 'ltr',
            }}
          >
            <IconButton
              color="inherit"
              onClick={toggleLanguage}
              sx={{ 
                mr: isRtl ? 0 : 2,
                ml: isRtl ? 2 : 0,
              }}
            >
              <LanguageIcon />
              <Typography 
                variant="button" 
                sx={{ 
                  ml: isRtl ? 0 : 1,
                  mr: isRtl ? 1 : 0,
                }}
              >
                {locale === 'en' ? 'عربي' : 'English'}
              </Typography>
            </IconButton>

            {isAuthenticated ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <PersonIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: isRtl ? 'left' : 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: isRtl ? 'left' : 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleDashboard}>
                    {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  href="/login"
                  sx={{
                    color: 'white',
                    display: 'block',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {t.common.navigation.login || 'Login'}
                </Button>
                <Button
                  onClick={handleAdminAccess}
                  sx={{
                    display: 'none',
                  }}
                >
                  Admin
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainNavigation; 