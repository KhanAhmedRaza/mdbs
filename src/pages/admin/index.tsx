import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
} from '@mui/material';
import {
  CalendarToday,
  AttachMoney,
  People,
  TrendingUp,
} from '@mui/icons-material';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';

const DashboardCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
}) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { locale, query } = router;

  // Demo credentials (in a real app, this would be handled securely)
  const demoCredentials = {
    username: 'admin',
    password: 'admin123',
    adminKey: 'mdb2024', // This would be a secure environment variable in production
  };

  useEffect(() => {
    // Only run this effect when the router is ready
    if (!router.isReady) return;

    console.log('Admin page loaded. Checking credentials...');
    console.log('URL key:', query.key);
    
    const urlKey = query.key as string;
    if (!urlKey || urlKey !== demoCredentials.adminKey) {
      console.log('Invalid or missing admin key. Redirecting to home...');
      router.push('/');
      return;
    }

    setAdminKey(urlKey);
    const isAuth = localStorage.getItem('isAdminAuthenticated') === 'true';
    if (isAuth) {
      console.log('Admin already authenticated');
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router.isReady, query.key]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt...');
    console.log('Username:', username);
    console.log('Admin key:', adminKey);

    if (
      username === demoCredentials.username && 
      password === demoCredentials.password &&
      adminKey === demoCredentials.adminKey
    ) {
      console.log('Login successful');
      setIsAuthenticated(true);
      localStorage.setItem('isAdminAuthenticated', 'true');
    } else {
      console.log('Login failed');
      alert(locale === 'ar' ? 'بيانات الاعتماد غير صالحة' : 'Invalid credentials');
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <Layout>
        <Box sx={{ py: 8 }}>
          <Container maxWidth="sm">
            <Typography variant="h6" align="center">
              {locale === 'ar' ? 'جارٍ التحميل...' : 'Loading...'}
            </Typography>
          </Container>
        </Box>
      </Layout>
    );
  }

  // If no valid admin key, don't render anything (redirect handled in useEffect)
  if (!adminKey || adminKey !== demoCredentials.adminKey) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <Box sx={{ py: 8 }}>
          <Container maxWidth="sm">
            <Paper sx={{ p: 4 }}>
              <Typography variant="h4" align="center" gutterBottom>
                {locale === 'ar' ? 'تسجيل الدخول للوحة التحكم' : 'Admin Login'}
              </Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label={locale === 'ar' ? 'اسم المستخدم' : 'Username'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  type="password"
                  label={locale === 'ar' ? 'كلمة المرور' : 'Password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  required
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  {locale === 'ar' ? 'تسجيل الدخول' : 'Login'}
                </Button>
              </form>
            </Paper>
          </Container>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              {locale === 'ar' ? 'لوحة التحكم' : 'Admin Dashboard'}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                localStorage.removeItem('isAdminAuthenticated');
                setIsAuthenticated(false);
              }}
            >
              {locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}
            </Button>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard
                title={locale === 'ar' ? 'إجمالي الحجوزات' : 'Total Bookings'}
                value="150"
                icon={CalendarToday}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard
                title={locale === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue'}
                value="$3,500"
                icon={AttachMoney}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard
                title={locale === 'ar' ? 'العملاء النشطون' : 'Active Customers'}
                value="85"
                icon={People}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard
                title={locale === 'ar' ? 'الخدمات الشائعة' : 'Popular Services'}
                value="Haircut"
                icon={TrendingUp}
              />
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {locale === 'ar' ? 'الحجوزات الأخيرة' : 'Recent Bookings'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {locale === 'ar' ? 'لا توجد حجوزات للعرض' : 'No bookings to display'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {locale === 'ar' ? 'الخدمات الشائعة' : 'Popular Services'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {locale === 'ar' ? 'لا توجد بيانات للعرض' : 'No data to display'}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
} 