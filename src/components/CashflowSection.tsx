import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import { Store } from '../types/tenant';

interface CashflowData {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
  trend: number;
}

interface CashflowSectionProps {
  stores: Store[];
}

const CashflowSection: React.FC<CashflowSectionProps> = ({ stores }) => {
  const theme = useTheme();
  const [selectedStore, setSelectedStore] = useState<string>(stores[0]?.id || '');

  // Sample data - in a real app, this would come from an API
  const cashflowData: CashflowData[] = [
    {
      date: '2024-03-01',
      revenue: 5200,
      expenses: 3100,
      profit: 2100,
      trend: 8.5,
    },
    {
      date: '2024-03-02',
      revenue: 4800,
      expenses: 2900,
      profit: 1900,
      trend: -2.1,
    },
    {
      date: '2024-03-03',
      revenue: 6100,
      expenses: 3400,
      profit: 2700,
      trend: 12.4,
    },
    {
      date: '2024-03-04',
      revenue: 5500,
      expenses: 3200,
      profit: 2300,
      trend: 5.2,
    },
    {
      date: '2024-03-05',
      revenue: 5900,
      expenses: 3300,
      profit: 2600,
      trend: 7.8,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Cashflow Analysis
        </Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="store-select-label">Select Store</InputLabel>
          <Select
            labelId="store-select-label"
            id="store-select"
            value={selectedStore}
            label="Select Store"
            onChange={(e) => setSelectedStore(e.target.value)}
          >
            {stores.map((store) => (
              <MenuItem key={store.id} value={store.id}>
                {store.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Revenue</TableCell>
              <TableCell align="right">Expenses</TableCell>
              <TableCell align="right">Profit</TableCell>
              <TableCell align="right">Trend</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cashflowData.map((row) => (
              <TableRow key={row.date}>
                <TableCell>{formatDate(row.date)}</TableCell>
                <TableCell align="right">{formatCurrency(row.revenue)}</TableCell>
                <TableCell align="right">{formatCurrency(row.expenses)}</TableCell>
                <TableCell align="right">{formatCurrency(row.profit)}</TableCell>
                <TableCell align="right">
                  <Chip
                    icon={row.trend > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                    label={`${row.trend > 0 ? '+' : ''}${row.trend}%`}
                    size="small"
                    color={row.trend > 0 ? 'success' : 'error'}
                    sx={{ minWidth: 80 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="body2" color="textSecondary">
          Last updated: {new Date().toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default CashflowSection; 