import React, { useEffect, useState } from 'react';
import {
  Toolbar,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Typography,
  Avatar,
} from '@mui/material';
import { Menu as MenuIcon, Language, Person } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface UserProfile {
  name: string;
  email: string;
}

const Navigation = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      setUser(JSON.parse(userProfile));
    }
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    setUser(null);
    handleUserMenuClose();
    router.push('/');
  };

  const menuItems = [
    { label: locale === 'ar' ? 'الرئيسية' : 'Home', path: '/' },
    { label: locale === 'ar' ? 'الخدمات' : 'Services', path: '/services' },
    { label: locale === 'ar' ? 'معرض الصور' : 'Gallery', path: '/gallery' },
    { label: locale === 'ar' ? 'اتصل بنا' : 'Contact', path: '/contact' },
  ];

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Link href="/" passHref legacyBehavior>
        <Typography
          component="a"
          variant="h6"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          MD Barber Club
        </Typography>
      </Link>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  passHref
                  legacyBehavior
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                    }}
                    component="a"
                  >
                    {item.label}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ mr: 2 }}>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                passHref
                legacyBehavior
              >
                <Button
                  component="a"
                  color="inherit"
                  sx={{ ml: 2 }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </Box>
        )}
        
        <Button
          color="primary"
          onClick={toggleLanguage}
          startIcon={<Language />}
          sx={{ ml: 2 }}
        >
          {locale === 'en' ? 'عربي' : 'English'}
        </Button>

        {user ? (
          <>
            <Button
              color="primary"
              onClick={handleUserMenu}
              startIcon={<Avatar sx={{ width: 24, height: 24 }}>{user.name[0]}</Avatar>}
              sx={{ ml: 2 }}
            >
              {user.name}
            </Button>
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
            >
              <Link href="/profile" passHref legacyBehavior>
                <MenuItem component="a" onClick={handleUserMenuClose}>
                  {locale === 'ar' ? 'الملف الشخصي' : 'Profile'}
                </MenuItem>
              </Link>
              <Link href="/bookings" passHref legacyBehavior>
                <MenuItem component="a" onClick={handleUserMenuClose}>
                  {locale === 'ar' ? 'حجوزاتي' : 'My Bookings'}
                </MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>
                {locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Link href="/auth" passHref legacyBehavior>
            <Button
              component="a"
              variant="contained"
              color="primary"
              startIcon={<Person />}
              sx={{ ml: 2 }}
            >
              {locale === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </Button>
          </Link>
        )}
      </Box>
    </Toolbar>
  );
};

export default Navigation; 