import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

export default function Services() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'ar' ? ar : en;
  const isRtl = locale === 'ar';

  return (
    <Layout>
      <Box 
        sx={{ 
          py: 8,
          direction: isRtl ? 'rtl' : 'ltr',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom
            sx={{ direction: isRtl ? 'rtl' : 'ltr' }}
          >
            {t.services.title}
          </Typography>
          <Typography 
            variant="subtitle1" 
            align="center" 
            sx={{ 
              mb: 6,
              direction: isRtl ? 'rtl' : 'ltr',
            }}
          >
            {t.services.description}
          </Typography>
          
          <Grid container spacing={4}>
            {Object.entries(t.services.services).map(([key, service]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                    direction: isRtl ? 'rtl' : 'ltr',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      gutterBottom
                      sx={{ direction: isRtl ? 'rtl' : 'ltr' }}
                    >
                      {service.title}
                    </Typography>
                    <Typography 
                      variant="body1"
                      sx={{ direction: isRtl ? 'rtl' : 'ltr' }}
                    >
                      {service.description}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        mt: 2,
                        direction: isRtl ? 'rtl' : 'ltr',
                      }}
                    >
                      {service.price} • {service.duration}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
} 