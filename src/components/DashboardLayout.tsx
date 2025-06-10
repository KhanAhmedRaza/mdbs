import React, { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import AdminNavigation from './admin/AdminNavigation';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isAdmin, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated or not admin
  React.useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.replace('/auth');
    }
  }, [isAuthenticated, isAdmin, router]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminNavigation />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${240}px)` },
          ml: { sm: `${240}px` },
        }}
      >
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;