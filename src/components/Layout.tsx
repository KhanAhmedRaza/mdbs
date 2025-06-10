import React from 'react';
import {
  Box,
  Container,
  Typography,
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
  CssBaseline,
} from '@mui/material';
import { useRouter } from 'next/router';
import MainNavigation from './MainNavigation';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { useEffect } from 'react';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create ltr cache
const cacheLtr = createCache({
  key: 'muiltr',
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { locale } = router;
  const isRtl = locale === 'ar';

  const theme = createTheme({
    direction: isRtl ? 'rtl' : 'ltr',
    typography: {
      fontFamily: isRtl ? 'Arial, sans-serif' : 'Roboto, sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            direction: isRtl ? 'rtl' : 'ltr',
          },
        },
      },
    },
  });

  // Update document direction when locale changes
  useEffect(() => {
    document.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', locale || 'en');
  }, [isRtl, locale]);

  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              minHeight: '100vh',
              direction: isRtl ? 'rtl' : 'ltr',
            }}
          >
            <MainNavigation />
            <Box 
              component="main" 
              sx={{ 
                flexGrow: 1, 
                pt: 8,
                direction: isRtl ? 'rtl' : 'ltr',
              }}
            >
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
                bgcolor: 'grey.200',
                direction: isRtl ? 'rtl' : 'ltr',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
                  © {new Date().getFullYear()} MD Barber Club
          </Typography>
        </Container>
      </Box>
    </Box>
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
};

export default Layout; 