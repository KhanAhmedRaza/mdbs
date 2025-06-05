import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import {
  BookOnline as BookingIcon,
  AttachMoney as RevenueIcon,
  People as CustomersIcon,
  ContentCut as ServicesIcon,
} from '@mui/icons-material';

const KPISection = () => {
  const kpis = [
    {
      title: 'Total Bookings',
      value: '1,243',
      icon: <BookingIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Total Revenue (This Month)',
      value: '$24,580',
      icon: <RevenueIcon sx={{ fontSize: 40, color: 'success.main' }} />,
    },
    {
      title: 'Active Customers',
      value: '683',
      icon: <CustomersIcon sx={{ fontSize: 40, color: 'info.main' }} />,
    },
    {
      title: 'Most Popular Services',
      value: 'Haircut & Beard Trim',
      icon: <ServicesIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
    },
  ];

  return (
    <Grid container spacing={3}>
      {kpis.map((kpi, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {kpi.icon}
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {kpi.title}
                </Typography>
              </Box>
              <Typography variant="h4" component="div">
                {kpi.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default KPISection; 