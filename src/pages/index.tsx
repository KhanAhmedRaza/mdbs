import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import en from '../locales/en.json';
import ar from '../locales/ar.json';
import { TranslationType, Feature } from '../types/translations';
import MainNavigation from '../components/MainNavigation';

export default function HomePage() {
  const router = useRouter();
  const { locale } = router;
  const t = (locale === 'ar' ? ar : en) as TranslationType;

  return (
    <Box>
      <MainNavigation />
      <Layout>
        {/* Hero Section */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            textAlign: 'center',
            backgroundImage: 'url(/images/hero-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            },
          }}
        >
          <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              component="h1"
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              {t.home.hero.title}
            </Typography>
            <Typography
              variant="h5"
              paragraph
              sx={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              {t.home.hero.subtitle}
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => router.push('/booking')}
              sx={{ mt: 2 }}
            >
              {t.home.hero.bookNow}
            </Button>
          </Container>
        </Box>

        {/* Services Section */}
        <Container sx={{ py: 8 }}>
          <Typography variant="h3" align="center" gutterBottom>
            {t.home.services.title}
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {Object.entries(t.services.services).slice(0, 4).map(([key, service]) => (
              <Grid item key={key} xs={12} sm={6} md={3}>
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
                    height="140"
                    image={`/images/services/${key}.jpg`}
                    alt={service.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                      {service.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push('/services')}
            >
              {t.home.services.viewAll}
            </Button>
          </Box>
        </Container>

        {/* About Section */}
        <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
          <Container>
            <Typography variant="h3" align="center" gutterBottom>
              {t.home.about.title}
            </Typography>
            <Typography variant="h6" align="center" paragraph sx={{ maxWidth: 800, mx: 'auto' }}>
              {t.home.about.description}
            </Typography>
          </Container>
        </Box>

        {/* Features Section */}
        <Container sx={{ py: 8 }}>
          <Typography variant="h3" align="center" gutterBottom>
            {t.home.features.title}
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {Object.entries(t.home.features).filter(([key]) => key !== 'title').map(([key, feature]) => (
              <Grid item key={key} xs={12} sm={6} md={3}>
                <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {(feature as Feature).title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {(feature as Feature).description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Layout>
    </Box>
  );
} 