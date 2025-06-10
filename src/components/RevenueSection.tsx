import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as MoneyIcon,
  Receipt as ReceiptIcon,
  Person as PersonIcon,
  LocalOffer as OfferIcon,
} from '@mui/icons-material';

const RevenueSection: React.FC = () => {
  const theme = useTheme();

  const revenueStats = {
    totalRevenue: 24580,
    lastMonth: 22450,
    growth: 9.5,
    averageTicket: 45,
    repeatCustomers: 68,
    topServices: [
      { name: 'Haircut & Styling', revenue: 8500 },
      { name: 'Beard Trim', revenue: 4200 },
      { name: 'Color Treatment', revenue: 6800 },
      { name: 'Shaving', revenue: 3100 },
    ],
    recentTransactions: [
      { id: '1', service: 'Full Service', amount: 75, time: '2 hours ago' },
      { id: '2', service: 'Haircut', amount: 35, time: '3 hours ago' },
      { id: '3', service: 'Beard Trim', amount: 25, time: '4 hours ago' },
      { id: '4', service: 'Hair Color', amount: 120, time: '5 hours ago' },
    ],
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Revenue Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Revenue Overview Cards */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Revenue
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MoneyIcon sx={{ fontSize: 40, color: theme.palette.success.main, mr: 2 }} />
                <Typography variant="h4">
                  {formatCurrency(revenueStats.totalRevenue)}
                </Typography>
                <Chip
                  icon={<TrendingUpIcon />}
                  label={`+${revenueStats.growth}%`}
                  color="success"
                  size="small"
                  sx={{ ml: 2 }}
                />
              </Box>
              <Typography variant="body2" color="textSecondary">
                vs. {formatCurrency(revenueStats.lastMonth)} last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Key Metrics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Average Ticket
                  </Typography>
                  <Typography variant="h6">
                    {formatCurrency(revenueStats.averageTicket)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Repeat Customers
                  </Typography>
                  <Typography variant="h6">
                    {revenueStats.repeatCustomers}%
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Services */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Top Services by Revenue
            </Typography>
            <List>
              {revenueStats.topServices.map((service, index) => (
                <React.Fragment key={service.name}>
                  <ListItem>
                    <ListItemText
                      primary={service.name}
                      secondary={`Revenue: ${formatCurrency(service.revenue)}`}
                    />
                    <Chip
                      label={`#${index + 1}`}
                      size="small"
                      color={index === 0 ? 'primary' : 'default'}
                    />
                  </ListItem>
                  {index < revenueStats.topServices.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <List>
              {revenueStats.recentTransactions.map((transaction, index) => (
                <React.Fragment key={transaction.id}>
                  <ListItem>
                    <ListItemText
                      primary={transaction.service}
                      secondary={transaction.time}
                    />
                    <Typography variant="body1" color="primary">
                      {formatCurrency(transaction.amount)}
                    </Typography>
                  </ListItem>
                  {index < revenueStats.recentTransactions.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RevenueSection; 