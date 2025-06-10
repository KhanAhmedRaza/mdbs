import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Layout from '../components/Layout';

const steps = ['Select Service', 'Choose Date & Time', 'Confirm Booking'];

const services = [
  {
    id: 'haircut',
    name: 'Haircut',
    duration: '45 min',
  },
  {
    id: 'beard-trim',
    name: 'Beard Trim',
    duration: '30 min',
  },
  {
    id: 'hot-towel-shave',
    name: 'Hot Towel Shave',
    duration: '45 min',
  },
  {
    id: 'grooming-package',
    name: 'Grooming Package',
    duration: '90 min',
  },
];

export default function Booking() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            {services.map((service) => (
              <Grid item xs={12} sm={6} key={service.id}>
                <Card
                  sx={{
                    height: '100%',
                    bgcolor: selectedService === service.id ? 'primary.main' : 'background.paper',
                    color: selectedService === service.id ? 'primary.contrastText' : 'text.primary',
                  }}
                >
                  <CardActionArea
                    onClick={() => handleServiceSelect(service.id)}
                    sx={{ height: '100%' }}
                  >
                    <CardContent>
                      <Typography variant="h6" component="h2">
                        {service.name}
                      </Typography>
                      <Typography variant="body2" color="inherit">
                        Duration: {service.duration}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        );
      case 1:
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Select Time"
                  value={selectedTime}
                  onChange={(newValue) => setSelectedTime(newValue)}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Booking Summary
            </Typography>
            <Typography>
              Service: {services.find((s) => s.id === selectedService)?.name}
            </Typography>
            <Typography>
              Date: {selectedDate?.toLocaleDateString()}
            </Typography>
            <Typography>
              Time: {selectedTime?.toLocaleTimeString()}
            </Typography>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Layout>
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>
            Book Your Appointment
          </Typography>
          <Paper sx={{ p: 4, mt: 4 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box sx={{ mt: 4 }}>
              {activeStep === steps.length ? (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" gutterBottom>
                    Booking Confirmed!
                  </Typography>
                  <Typography variant="subtitle1">
                    Thank you for booking with MD Barber Club.
                  </Typography>
                </Box>
              ) : (
                <>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      disabled={
                        (activeStep === 0 && !selectedService) ||
                        (activeStep === 1 && (!selectedDate || !selectedTime))
                      }
                    >
                      {activeStep === steps.length - 1 ? 'Confirm Booking' : 'Next'}
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
} 