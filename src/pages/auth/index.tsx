import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Snackbar,
} from '@mui/material';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AuthPage() {
  const [tabValue, setTabValue] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  
  const router = useRouter();
  const { locale } = router;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Demo login - in production this would call an API
      const demoUser = {
        email: 'demo@example.com',
        password: 'password123',
      };

      if (loginData.email === demoUser.email && loginData.password === demoUser.password) {
        localStorage.setItem('userProfile', JSON.stringify({
          name: 'Demo User',
          email: loginData.email,
          preferences: {
            services: ['Haircut', 'Beard Trim'],
            barber: 'John Doe',
          },
        }));
        setSnackbar({
          open: true,
          message: locale === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Successfully logged in',
          severity: 'success',
        });
        router.push('/profile');
      } else {
        setSnackbar({
          open: true,
          message: locale === 'ar' ? 'بيانات الاعتماد غير صالحة' : 'Invalid credentials',
          severity: 'error',
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: locale === 'ar' ? 'حدث خطأ أثناء تسجيل الدخول' : 'Error during login',
        severity: 'error',
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (signupData.password !== signupData.confirmPassword) {
        setSnackbar({
          open: true,
          message: locale === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match',
          severity: 'error',
        });
        return;
      }

      // Demo signup - in production this would call an API
      localStorage.setItem('userProfile', JSON.stringify({
        name: signupData.name,
        email: signupData.email,
        preferences: {
          services: [],
          barber: '',
        },
      }));
      
      setSnackbar({
        open: true,
        message: locale === 'ar' ? 'تم إنشاء الحساب بنجاح' : 'Account created successfully',
        severity: 'success',
      });
      router.push('/profile');
    } catch (error) {
      setSnackbar({
        open: true,
        message: locale === 'ar' ? 'حدث خطأ أثناء إنشاء الحساب' : 'Error during signup',
        severity: 'error',
      });
    }
  };

  const translations = {
    pageTitle: locale === 'ar' ? 'تسجيل الدخول أو إنشاء حساب' : 'Login or Create Account',
    loginTab: locale === 'ar' ? 'تسجيل الدخول' : 'Login',
    signupTab: locale === 'ar' ? 'إنشاء حساب' : 'Sign Up',
    email: locale === 'ar' ? 'البريد الإلكتروني' : 'Email',
    password: locale === 'ar' ? 'كلمة المرور' : 'Password',
    confirmPassword: locale === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password',
    name: locale === 'ar' ? 'الاسم' : 'Name',
    phone: locale === 'ar' ? 'رقم الهاتف' : 'Phone Number',
    loginButton: locale === 'ar' ? 'تسجيل الدخول' : 'Login',
    signupButton: locale === 'ar' ? 'إنشاء حساب' : 'Sign Up',
    welcomeText: locale === 'ar' 
      ? 'مرحباً بك في نادي MD للحلاقة'
      : 'Welcome to MD Barber Club',
    loginSubtext: locale === 'ar'
      ? 'قم بتسجيل الدخول لحجز موعدك وإدارة تفضيلاتك'
      : 'Sign in to book appointments and manage your preferences',
    signupSubtext: locale === 'ar'
      ? 'أنشئ حسابك للوصول إلى جميع الميزات'
      : 'Create an account to access all features',
  };

  return (
    <Layout>
      <Box sx={{ py: 8 }}>
        <Container maxWidth="sm">
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              {translations.pageTitle}
            </Typography>
            <Typography variant="h6" align="center" color="primary" gutterBottom>
              {translations.welcomeText}
            </Typography>
            
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              sx={{ mb: 3 }}
            >
              <Tab label={translations.loginTab} />
              <Tab label={translations.signupTab} />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Typography variant="body1" align="center" color="text.secondary" gutterBottom>
                {translations.loginSubtext}
              </Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label={translations.email}
                  type="email"
                  margin="normal"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
                <TextField
                  fullWidth
                  label={translations.password}
                  type="password"
                  margin="normal"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  {translations.loginButton}
                </Button>
              </form>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="body1" align="center" color="text.secondary" gutterBottom>
                {translations.signupSubtext}
              </Typography>
              <form onSubmit={handleSignup}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={translations.name}
                      required
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={translations.email}
                      type="email"
                      required
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={translations.phone}
                      required
                      value={signupData.phone}
                      onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={translations.password}
                      type="password"
                      required
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={translations.confirmPassword}
                      type="password"
                      required
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    />
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  {translations.signupButton}
                </Button>
              </form>
            </TabPanel>
          </Paper>
        </Container>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
} 