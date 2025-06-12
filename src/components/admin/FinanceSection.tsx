import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Download as DownloadIcon, Sync as SyncIcon } from '@mui/icons-material';

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
      id={`finance-tabpanel-${index}`}
      {...other}
      style={{ backgroundColor: '#ffffff' }}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const FinanceSection = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedStore, setSelectedStore] = useState('all');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [plPeriod, setPlPeriod] = useState('month');

  const monthlyData = [
    { month: 'Dec 2024', revenue: 20800, expenses: 8200 },
    { month: 'Jan 2025', revenue: 21500, expenses: 8500 },
    { month: 'Feb 2025', revenue: 22100, expenses: 8800 },
    { month: 'Mar 2025', revenue: 23400, expenses: 9100 },
    { month: 'Apr 2025', revenue: 22300, expenses: 8700 },
    { month: 'May 2025', revenue: 24580, expenses: 9420 },
  ];

  const incomeData = [
    { date: '2025-05-15', source: 'Beard Trims', amount: 420, store: 'Raleigh' },
    { date: '2025-05-16', source: 'Haircuts', amount: 610, store: 'Charlotte' },
    { date: '2025-05-16', source: 'Hair Color', amount: 520, store: 'Durham' },
    { date: '2025-05-17', source: 'Beard Trims', amount: 380, store: 'Raleigh' },
    { date: '2025-05-17', source: 'Haircuts', amount: 580, store: 'Charlotte' },
  ];

  const expenseData = [
    { date: '2025-05-16', category: 'Supplies', amount: 180, store: 'Raleigh' },
    { date: '2025-05-18', category: 'Staff Wages', amount: 2200, store: 'Charlotte' },
    { date: '2025-05-18', category: 'Utilities', amount: 450, store: 'Durham' },
    { date: '2025-05-19', category: 'Marketing', amount: 300, store: 'Raleigh' },
    { date: '2025-05-20', category: 'Equipment', amount: 800, store: 'Charlotte' },
  ];

  const plData = [
    { month: 'April 2025', revenue: 22300, expenses: 8700, netProfit: 13600 },
    { month: 'May 2025', revenue: 24580, expenses: 9420, netProfit: 15160 },
    { month: 'June 2025', revenue: 23800, expenses: 9100, netProfit: 14700 },
  ];

  return (
    <Box sx={{ backgroundColor: '#ffffff', borderRadius: 1, boxShadow: 1 }}>
      <Tabs
        value={tabValue}
        onChange={(_, newValue) => setTabValue(newValue)}
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: '#ffffff',
          '& .MuiTab-root': {
            color: 'text.primary',
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
        }}
      >
        <Tab label="Financial Summary" />
        <Tab label="Income & Expenses" />
        <Tab label="P&L Report" />
        <Tab label="Tax & Export" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Revenue (Month)
                </Typography>
                <Typography variant="h4">
                  ${monthlyData[5].revenue.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Expenses
                </Typography>
                <Typography variant="h4">
                  ${monthlyData[5].expenses.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Net Profit
                </Typography>
                <Typography variant="h4">
                  ${(monthlyData[5].revenue - monthlyData[5].expenses).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Tax Estimate (Quarter)
                </Typography>
                <Typography variant="h4">
                  $2,800
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  6-Month Financial Overview
                </Typography>
                <Box sx={{ height: 300, mt: 2 }}>
                  {monthlyData.map((data, index) => (
                    <Box key={data.month} sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        {data.month}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              height: 24,
                              bgcolor: 'primary.main',
                              width: `${(data.revenue / 25000) * 100}%`,
                            }}
                          />
                          <Typography variant="caption">
                            Revenue: ${data.revenue.toLocaleString()}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              height: 24,
                              bgcolor: 'error.main',
                              width: `${(data.expenses / 25000) * 100}%`,
                            }}
                          />
                          <Typography variant="caption">
                            Expenses: ${data.expenses.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Store</InputLabel>
                <Select
                  value={selectedStore}
                  label="Store"
                  onChange={(e) => setSelectedStore(e.target.value)}
                >
                  <MenuItem value="all">All Stores</MenuItem>
                  <MenuItem value="raleigh">Raleigh</MenuItem>
                  <MenuItem value="charlotte">Charlotte</MenuItem>
                  <MenuItem value="durham">Durham</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Income
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Store</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incomeData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.source}</TableCell>
                      <TableCell align="right">${row.amount}</TableCell>
                      <TableCell>{row.store}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Expenses
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Store</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenseData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell align="right">${row.amount}</TableCell>
                      <TableCell>{row.store}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 3 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Period</InputLabel>
            <Select
              value={plPeriod}
              label="Period"
              onChange={(e) => setPlPeriod(e.target.value)}
            >
              <MenuItem value="month">Monthly</MenuItem>
              <MenuItem value="quarter">Quarterly</MenuItem>
              <MenuItem value="year">Yearly</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Period</TableCell>
                <TableCell align="right">Revenue</TableCell>
                <TableCell align="right">Expenses</TableCell>
                <TableCell align="right">Net Profit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plData.map((row) => (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell align="right">${row.revenue.toLocaleString()}</TableCell>
                  <TableCell align="right">${row.expenses.toLocaleString()}</TableCell>
                  <TableCell align="right">${row.netProfit.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Export CSV
          </Button>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Export PDF
          </Button>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Export for Tax Tools
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Export P&L Report
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    fullWidth
                  >
                    Export Transactions CSV
                  </Button>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Compatible with TurboTax and QuickBooks (coming soon)
                </Typography>
                <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
                  Disclaimer: This is not a tax-filing tool
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Automation Settings
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={<Switch />}
                    label="Remind me about quarterly taxes"
                  />
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<SyncIcon />}
                  disabled
                  fullWidth
                >
                  Add Bank Account Sync
                </Button>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                  Bank sync feature coming soon
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default FinanceSection; 