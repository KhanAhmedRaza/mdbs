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
      primary: {
        main: currentTenant.primaryColor,
      },
      secondary: {
        main: currentTenant.secondaryColor,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default MyApp; 