import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ReportsSection = () => {
  const [dateRange, setDateRange] = useState('last7');
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);

  const metrics = {
    totalBookings: 156,
    totalRevenue: 4850,
    avgBookingValue: 31.09,
    topServices: ['Haircut', 'Beard Trim', 'Hair Color'],
    serviceDistribution: [
      { name: 'Haircut', value: 45 },
      { name: 'Beard Trim', value: 30 },
      { name: 'Hair Color', value: 15 },
      { name: 'Other', value: 10 },
    ],
  };

  const handleDateRangeChange = (event: any) => {
    setDateRange(event.target.value);
    if (event.target.value !== 'custom') {
      setCustomStartDate(null);
      setCustomEndDate(null);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Date Range</InputLabel>
          <Select
            value={dateRange}
            label="Date Range"
            onChange={handleDateRangeChange}
          >
            <MenuItem value="last7">Last 7 Days</MenuItem>
            <MenuItem value="last30">Last 30 Days</MenuItem>
            <MenuItem value="thisMonth">This Month</MenuItem>
            <MenuItem value="lastMonth">Last Month</MenuItem>
            <MenuItem value="custom">Custom Range</MenuItem>
          </Select>
        </FormControl>

        {dateRange === 'custom' && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <DatePicker
                label="Start Date"
                value={customStartDate}
                onChange={(newValue) => setCustomStartDate(newValue)}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: { width: 200 }
                  }
                }}
              />
              <DatePicker
                label="End Date"
                value={customEndDate}
                onChange={(newValue) => setCustomEndDate(newValue)}
                minDate={customStartDate || undefined}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: { width: 200 }
                  }
                }}
              />
            </Box>
          </LocalizationProvider>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Bookings
              </Typography>
              <Typography variant="h4">
                {metrics.totalBookings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Revenue
              </Typography>
              <Typography variant="h4">
                ${metrics.totalRevenue}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Booking Value
              </Typography>
              <Typography variant="h4">
                ${metrics.avgBookingValue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Top Service
              </Typography>
              <Typography variant="h4">
                {metrics.topServices[0]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Service Distribution
              </Typography>
              <Box sx={{ 
                display: 'flex',
                gap: 2,
                mt: 2
              }}>
                {metrics.serviceDistribution.map((service) => (
                  <Box key={service.name} sx={{ flex: 1 }}>
                    <Typography variant="body2" gutterBottom>
                      {service.name}
                    </Typography>
                    <Box sx={{ 
                      height: 100,
                      bgcolor: 'grey.100',
                      position: 'relative'
                    }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          bgcolor: 'primary.main',
                          height: `${service.value}%`,
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {service.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportsSection; 