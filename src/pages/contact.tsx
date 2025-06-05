import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import Layout from '../components/Layout';
import { LocationOn, Phone, Email } from '@mui/icons-material';

export default function Contact() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Form submission logic would go here
  };

  return (
    <Layout>
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Grid container spacing={6} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, height: '100%' }}>
                <Typography variant="h5" gutterBottom>
                  Send us a message
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="First Name"
                        name="firstName"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Last Name"
                        name="lastName"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Phone"
                        name="phone"
                        type="tel"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, height: '100%' }}>
                <Typography variant="h5" gutterBottom>
                  Get in Touch
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn color="primary" sx={{ mr: 2 }} />
                    <Typography>
                      2885 Jones Franklin Rd
                      <br />
                      Raleigh, NC 27606
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Phone color="primary" sx={{ mr: 2 }} />
                    <Typography>(919) 519-6330</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Email color="primary" sx={{ mr: 2 }} />
                    <Typography>contact@mdbarberclub.com</Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Hours of Operation
                  </Typography>
                  <Typography>
                    Monday - Friday: 9am - 8pm
                    <br />
                    Saturday: 9am - 6pm
                    <br />
                    Sunday: Closed
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
} 