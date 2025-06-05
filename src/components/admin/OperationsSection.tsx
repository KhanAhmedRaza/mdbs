import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Grid,
  Rating,
  Chip,
} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`operations-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const OperationsSection = () => {
  const [tabValue, setTabValue] = useState(0);

  const staffPerformance = [
    {
      id: 'B001',
      name: 'Michael Brown',
      bookings: 156,
      avgServiceTime: 35,
      revenue: 5460,
      rating: 4.8,
      location: 'Raleigh',
    },
    {
      id: 'B002',
      name: 'Jessica Martinez',
      bookings: 142,
      avgServiceTime: 40,
      revenue: 4980,
      rating: 4.9,
      location: 'Charlotte',
    },
    {
      id: 'B003',
      name: 'William Taylor',
      bookings: 128,
      avgServiceTime: 38,
      revenue: 4480,
      rating: 4.7,
      location: 'Durham',
    },
  ];

  const scheduleOptimization = [
    {
      barber: 'Michael Brown',
      day: 'Monday',
      utilization: 85,
      idleSlots: 2,
      suggestedHours: '10 AM - 7 PM',
    },
    {
      barber: 'Jessica Martinez',
      day: 'Monday',
      utilization: 92,
      idleSlots: 1,
      suggestedHours: '11 AM - 8 PM',
    },
    {
      barber: 'William Taylor',
      day: 'Monday',
      utilization: 78,
      idleSlots: 3,
      suggestedHours: '9 AM - 6 PM',
    },
  ];

  const noShows = [
    {
      customer: 'James Wilson',
      barber: 'Michael Brown',
      date: '2024-03-01',
      time: '2:30 PM',
      frequency: 2,
      status: 'Warning',
    },
    {
      customer: 'Emma Davis',
      barber: 'Jessica Martinez',
      date: '2024-03-02',
      time: '3:15 PM',
      frequency: 1,
      status: 'Normal',
    },
  ];

  const peakHours = [
    { hour: '9 AM', load: 45 },
    { hour: '10 AM', load: 65 },
    { hour: '11 AM', load: 85 },
    { hour: '12 PM', load: 90 },
    { hour: '1 PM', load: 75 },
    { hour: '2 PM', load: 80 },
    { hour: '3 PM', load: 95 },
    { hour: '4 PM', load: 100 },
    { hour: '5 PM', load: 90 },
    { hour: '6 PM', load: 70 },
  ];

  const getLoadColor = (load: number) => {
    if (load >= 90) return '#ef5350';
    if (load >= 70) return '#ffa726';
    return '#66bb6a';
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Operational Intelligence
      </Typography>

      <Tabs
        value={tabValue}
        onChange={(_, newValue) => setTabValue(newValue)}
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
      >
        <Tab label="Staff Performance" />
        <Tab label="Scheduling" />
        <Tab label="Peak Hours" />
        <Tab label="No-Shows" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Barber</TableCell>
                <TableCell align="right">Bookings</TableCell>
                <TableCell align="right">Avg. Time (min)</TableCell>
                <TableCell align="right">Revenue</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffPerformance.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell align="right">{staff.bookings}</TableCell>
                  <TableCell align="right">{staff.avgServiceTime}</TableCell>
                  <TableCell align="right">${staff.revenue}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating value={staff.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({staff.rating})
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{staff.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Barber</TableCell>
                <TableCell>Day</TableCell>
                <TableCell align="right">Utilization %</TableCell>
                <TableCell align="right">Idle Slots</TableCell>
                <TableCell>Suggested Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scheduleOptimization.map((schedule) => (
                <TableRow key={schedule.barber}>
                  <TableCell>{schedule.barber}</TableCell>
                  <TableCell>{schedule.day}</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`${schedule.utilization}%`}
                      color={schedule.utilization >= 85 ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">{schedule.idleSlots}</TableCell>
                  <TableCell>{schedule.suggestedHours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Daily Peak Hours
            </Typography>
            <Box sx={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 1 }}>
              {peakHours.map((hour) => (
                <Box
                  key={hour.hour}
                  sx={{
                    flex: 1,
                    height: `${hour.load}%`,
                    bgcolor: getLoadColor(hour.load),
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    p: 1,
                  }}
                >
                  <Typography variant="caption" sx={{ color: 'white', mb: 1 }}>
                    {hour.load}%
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              {peakHours.map((hour) => (
                <Typography key={hour.hour} variant="caption" sx={{ flex: 1, textAlign: 'center' }}>
                  {hour.hour}
                </Typography>
              ))}
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Barber</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell align="right">No-Shows</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {noShows.map((noShow) => (
                <TableRow key={`${noShow.customer}-${noShow.date}`}>
                  <TableCell>{noShow.customer}</TableCell>
                  <TableCell>{noShow.barber}</TableCell>
                  <TableCell>{noShow.date}</TableCell>
                  <TableCell>{noShow.time}</TableCell>
                  <TableCell align="right">{noShow.frequency}</TableCell>
                  <TableCell>
                    <Chip
                      label={noShow.status}
                      color={noShow.status === 'Warning' ? 'error' : 'default'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Box>
  );
};

export default OperationsSection; 