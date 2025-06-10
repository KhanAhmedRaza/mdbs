import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  People,
  AttachMoney,
  EventAvailable,
  Star,
  Loyalty,
} from '@mui/icons-material';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend, color }) => {
  const theme = useTheme();
  
  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
      elevation={2}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -15,
          right: -15,
          opacity: 0.1,
          transform: 'rotate(15deg)',
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="h4"
        component="div"
        sx={{ color: color || theme.palette.primary.main }}
      >
        {value}
      </Typography>
      {trend && (
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: trend.startsWith('+')
              ? theme.palette.success.main
              : theme.palette.error.main,
          }}
        >
          {trend} vs last month
        </Typography>
      )}
    </Paper>
  );
};

const KPISection: React.FC = () => {
  const theme = useTheme();

  const kpiData = [
    {
      title: 'Total Bookings',
      value: '1,243',
      icon: <EventAvailable sx={{ fontSize: 80 }} />,
      trend: '+12.5%',
    },
    {
      title: 'Revenue',
      value: '$24,580',
      icon: <AttachMoney sx={{ fontSize: 80 }} />,
      trend: '+8.2%',
      color: theme.palette.success.main,
    },
    {
      title: 'Active Customers',
      value: '856',
      icon: <People sx={{ fontSize: 80 }} />,
      trend: '+5.3%',
    },
    {
      title: 'Customer Rating',
      value: '4.8',
      icon: <Star sx={{ fontSize: 80 }} />,
      color: '#FFB400',
    },
    {
      title: 'Member Growth',
      value: '+15%',
      icon: <TrendingUp sx={{ fontSize: 80 }} />,
      color: theme.palette.info.main,
    },
    {
      title: 'Loyalty Points',
      value: '45.2K',
      icon: <Loyalty sx={{ fontSize: 80 }} />,
      color: theme.palette.secondary.main,
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Key Performance Indicators
      </Typography>
      <Grid container spacing={3}>
        {kpiData.map((kpi, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <KPICard {...kpi} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KPISection; 