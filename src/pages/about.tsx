import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

export default function AboutPage() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'ar' ? ar : en;

  return (
    <Layout>
      <Box sx={{ pt: 12, pb: 6 }}>
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            {t.home.about.title}
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="body1" paragraph>
                  {t.home.about.description}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
} 