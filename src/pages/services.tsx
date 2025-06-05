import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import Layout from '../components/Layout';

const services = [
  {
    name: 'Haircut',
    description: 'Expert precision cut tailored to your style and preferences.',
  },
  {
    name: 'Beard Trim',
    description: 'Professional beard grooming and shaping service.',
  },
  {
    name: 'Hot Towel Shave',
    description: 'Traditional hot towel shave for the ultimate smooth finish.',
  },
  {
    name: 'Grooming Package',
    description: 'Complete grooming experience including haircut and facial grooming.',
  },
];

export default function Services() {
  return (
    <Layout>
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>
            Our Services
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 6 }}>
            Premium grooming services for the modern gentleman
          </Typography>
          
          <Grid container spacing={4}>
            {services.map((service) => (
              <Grid item xs={12} sm={6} key={service.name}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {service.name}
                    </Typography>
                    <Typography variant="body1">
                      {service.description}
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