import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import {
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  status: 'available' | 'busy' | 'off';
  performance: number;
  rating: number;
  appointments: number;
}

const OperationsSection: React.FC = () => {
  const theme = useTheme();

  const staffMembers: StaffMember[] = [
    {
      id: '1',
      name: 'John Smith',
      role: 'Senior Barber',
      status: 'busy',
      performance: 95,
      rating: 4.9,
      appointments: 42,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Stylist',
      status: 'available',
      performance: 88,
      rating: 4.7,
      appointments: 38,
    },
    {
      id: '3',
      name: 'Mike Wilson',
      role: 'Barber',
      status: 'available',
      performance: 92,
      rating: 4.8,
      appointments: 35,
    },
    {
      id: '4',
      name: 'Emily Brown',
      role: 'Junior Stylist',
      status: 'off',
      performance: 85,
      rating: 4.5,
      appointments: 28,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return theme.palette.success.main;
      case 'busy':
        return theme.palette.warning.main;
      case 'off':
        return theme.palette.grey[500];
      default:
        return theme.palette.primary.main;
    }
  };

  const appointments = [
    {
      time: '09:00 AM',
      client: 'Alex Thompson',
      service: 'Haircut & Beard Trim',
      staff: 'John Smith',
      status: 'Completed',
    },
    {
      time: '10:30 AM',
      client: 'Maria Garcia',
      service: 'Hair Styling',
      staff: 'Sarah Johnson',
      status: 'In Progress',
    },
    {
      time: '11:15 AM',
      client: 'David Lee',
      service: 'Beard Trim',
      staff: 'Mike Wilson',
      status: 'Scheduled',
    },
    {
      time: '12:00 PM',
      client: 'Sophie Chen',
      service: 'Haircut',
      staff: 'John Smith',
      status: 'Scheduled',
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Operations Management
      </Typography>

      <Grid container spacing={3}>
        {/* Staff Performance */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Staff Performance
            </Typography>
            <Grid container spacing={3}>
              {staffMembers.map((staff) => (
                <Grid item xs={12} md={6} key={staff.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="h6">{staff.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {staff.role}
                          </Typography>
                        </Box>
                        <Chip
                          label={staff.status}
                          size="small"
                          sx={{
                            ml: 'auto',
                            bgcolor: getStatusColor(staff.status),
                            color: 'white',
                          }}
                        />
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" gutterBottom>
                          Performance
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={staff.performance}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>

                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">
                            Rating
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StarIcon sx={{ color: '#FFB400', mr: 0.5 }} />
                            <Typography variant="h6">{staff.rating}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="textSecondary">
                            Appointments
                          </Typography>
                          <Typography variant="h6">{staff.appointments}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Today's Schedule */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Today's Schedule
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Staff</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment, index) => (
                    <TableRow key={index}>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.client}</TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell>{appointment.staff}</TableCell>
                      <TableCell>
                        <Chip
                          label={appointment.status}
                          size="small"
                          color={
                            appointment.status === 'Completed'
                              ? 'success'
                              : appointment.status === 'In Progress'
                              ? 'warning'
                              : 'default'
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OperationsSection; 