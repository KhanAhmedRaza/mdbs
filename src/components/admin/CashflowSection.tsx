import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from '@mui/material';

const CashflowSection = () => {
  const storeData = [
    { 
      store: 'Raleigh',
      revenue: 15300,
      expenses: 5800,
      netProfit: 9500,
      monthlyData: [8200, 9100, 10500, 12300, 14200, 15300],
      payments: {
        cash: 4590,
        creditCard: 7650,
        zelle: 3060,
      }
    },
    { 
      store: 'Charlotte',
      revenue: 8600,
      expenses: 3200,
      netProfit: 5400,
      monthlyData: [4500, 5200, 6100, 7300, 8000, 8600],
      payments: {
        cash: 2580,
        creditCard: 4300,
        zelle: 1720,
      }
    },
    { 
      store: 'Durham',
      revenue: 4500,
      expenses: 1900,
      netProfit: 2600,
      monthlyData: [2200, 2800, 3100, 3800, 4200, 4500],
      payments: {
        cash: 1350,
        creditCard: 2250,
        zelle: 900,
      }
    },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Cashflow by Store
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Store</TableCell>
              <TableCell align="right">Revenue</TableCell>
              <TableCell align="right">Expenses</TableCell>
              <TableCell align="right">Net Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storeData.map((row) => (
              <TableRow key={row.store}>
                <TableCell component="th" scope="row">
                  {row.store}
                </TableCell>
                <TableCell align="right">${row.revenue.toLocaleString()}</TableCell>
                <TableCell align="right">${row.expenses.toLocaleString()}</TableCell>
                <TableCell align="right">${row.netProfit.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Payment Methods Breakdown
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Store</TableCell>
              <TableCell align="right">Cash</TableCell>
              <TableCell align="right">Credit Card</TableCell>
              <TableCell align="right">Zelle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storeData.map((row) => (
              <TableRow key={row.store}>
                <TableCell component="th" scope="row">
                  {row.store}
                </TableCell>
                <TableCell align="right">${row.payments.cash.toLocaleString()}</TableCell>
                <TableCell align="right">${row.payments.creditCard.toLocaleString()}</TableCell>
                <TableCell align="right">${row.payments.zelle.toLocaleString()}</TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell><strong>Total</strong></TableCell>
              <TableCell align="right">
                <strong>
                  ${storeData.reduce((sum, store) => sum + store.payments.cash, 0).toLocaleString()}
                </strong>
              </TableCell>
              <TableCell align="right">
                <strong>
                  ${storeData.reduce((sum, store) => sum + store.payments.creditCard, 0).toLocaleString()}
                </strong>
              </TableCell>
              <TableCell align="right">
                <strong>
                  ${storeData.reduce((sum, store) => sum + store.payments.zelle, 0).toLocaleString()}
                </strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Monthly Trends
      </Typography>

      <Grid container spacing={3}>
        {storeData.map((store) => (
          <Grid item xs={12} md={4} key={store.store}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {store.store} - 6 Month Trend
                </Typography>
                <Box sx={{ 
                  height: 200, 
                  bgcolor: 'grey.100',
                  display: 'flex',
                  alignItems: 'flex-end',
                  p: 2,
                  gap: 2
                }}>
                  {store.monthlyData.map((value, index) => (
                    <Box
                      key={index}
                      sx={{
                        flex: 1,
                        bgcolor: 'primary.main',
                        height: `${(value / store.monthlyData[5]) * 100}%`,
                        minWidth: 20,
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    6 months ago
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Current
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CashflowSection; 