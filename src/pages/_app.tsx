import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { appWithTranslation } from 'next-i18next';
import '../styles/globals.css';
import { TenantProvider } from '../contexts/TenantContext';
import { AuthProvider } from '../contexts/AuthContext';
import { createTheme } from '@mui/material/styles';
import { useTenant } from '../contexts/TenantContext';
import ClientOnly from '../components/ClientOnly';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TenantProvider>
        <ThemeWrapper>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Component {...pageProps} />
          </LocalizationProvider>
        </ThemeWrapper>
      </TenantProvider>
    </AuthProvider>
  );
}

// Theme wrapper component that uses the business configuration
function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { currentTenant } = useTenant();
  
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: currentTenant?.primaryColor || '#1976d2',
      },
      secondary: {
        main: currentTenant?.secondaryColor || '#9c27b0',
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
      },
    },
    components: {
      MuiTabs: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff',
            borderRadius: '4px 4px 0 0',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: 'rgba(0, 0, 0, 0.87)',
            '&.Mui-selected': {
              color: '#1976d2',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ClientOnly>
        {children}
      </ClientOnly>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp); 