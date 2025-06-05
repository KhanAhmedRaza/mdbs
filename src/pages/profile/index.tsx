import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
} from '@mui/material';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

interface UserProfile {
  name: string;
  email: string;
  preferences: {
    services: string[];
    barber: string;
  };
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile');
    if (!userProfile) {
      router.push('/auth');
      return;
    }
    setProfile(JSON.parse(userProfile));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    router.push('/auth');
  };

  if (!profile) {
    return null;
  }

  return (
    <Layout>
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              {locale === 'ar' ? 'الملف الشخصي' : 'Profile'}
            </Typography>
            <Button variant="outlined" color="primary" onClick={handleLogout}>
              {locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}
            </Button>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {locale === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={locale === 'ar' ? 'الاسم' : 'Name'}
                      secondary={profile.name}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                      secondary={profile.email}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {locale === 'ar' ? 'التفضيلات' : 'Preferences'}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {locale === 'ar' ? 'الخدمات المفضلة' : 'Preferred Services'}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {profile.preferences.services.length > 0 ? (
                      profile.preferences.services.map((service) => (
                        <Chip
                          key={service}
                          label={service}
                          color="primary"
                          variant="outlined"
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        {locale === 'ar'
                          ? 'لم يتم تحديد خدمات مفضلة بعد'
                          : 'No preferred services set yet'}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    {locale === 'ar' ? 'الحلاق المفضل' : 'Preferred Barber'}
                  </Typography>
                  <Typography variant="body2">
                    {profile.preferences.barber || (locale === 'ar'
                      ? 'لم يتم تحديد حلاق مفضل بعد'
                      : 'No preferred barber set yet')}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {locale === 'ar' ? 'الحجوزات السابقة' : 'Past Bookings'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {locale === 'ar'
                    ? 'لا توجد حجوزات سابقة'
                    : 'No past bookings found'}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
} 