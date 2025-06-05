import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
} from '@mui/material';
import { AccessTime, AttachMoney } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import en from '../../locales/en.json';
import ar from '../../locales/ar.json';

export default function ServicesPage() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'ar' ? ar : en;

  return (
    <Layout>
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Typography variant="h2" align="center" gutterBottom>
            {t.services.title}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ mb: 6 }}
          >
            {t.services.description}
          </Typography>

          <Grid container spacing={4}>
            {Object.entries(t.services.services).map(([key, service]) => (
              <Grid item key={key} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={`/images/services/${key}.jpg`}
                    alt={service.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                      sx={{ mb: 2 }}
                    >
                      {service.description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 'auto',
                      }}
                    >
                      <Chip
                        icon={<AccessTime />}
                        label={service.duration}
                        variant="outlined"
                      />
                      <Typography variant="h6" color="primary">
                        {service.price}
                      </Typography>
                    </Box>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => router.push('/booking')}
                      sx={{ mt: 2 }}
                    >
                      {t.services.bookNow}
                    </Button>
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