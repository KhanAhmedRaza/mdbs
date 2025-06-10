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
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Tab,
  Tabs,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

interface InventoryItem {
  id: string;
  name: string;
  category: 'Equipment' | 'Products' | 'Supplies';
  quantity: number;
  minQuantity: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
  location: string;
}

const InventorySection: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  // Sample data - in a real app, this would come from an API
  const inventoryData: InventoryItem[] = [
    {
      id: '1',
      name: 'Professional Hair Clippers',
      category: 'Equipment',
      quantity: 8,
      minQuantity: 5,
      status: 'In Stock',
      lastUpdated: '2024-03-05',
      location: 'Storage Room A',
    },
    {
      id: '2',
      name: 'Barber Chairs',
      category: 'Equipment',
      quantity: 3,
      minQuantity: 4,
      status: 'Low Stock',
      lastUpdated: '2024-03-04',
      location: 'Main Floor',
    },
    {
      id: '3',
      name: 'Hair Products',
      category: 'Products',
      quantity: 25,
      minQuantity: 10,
      status: 'In Stock',
      lastUpdated: '2024-03-05',
      location: 'Storage Room B',
    },
    {
      id: '4',
      name: 'Disposable Razors',
      category: 'Supplies',
      quantity: 0,
      minQuantity: 50,
      status: 'Out of Stock',
      lastUpdated: '2024-03-03',
      location: 'Storage Room A',
    },
    {
      id: '5',
      name: 'Styling Combs',
      category: 'Supplies',
      quantity: 15,
      minQuantity: 20,
      status: 'Low Stock',
      lastUpdated: '2024-03-05',
      location: 'Main Floor',
    },
  ];

  const getStatusColor = (status: string): 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'error';
      default:
        return 'success';
    }
  };

  const getStatusIcon = (status: string): React.ReactElement => {
    switch (status) {
      case 'In Stock':
        return <CheckCircleIcon fontSize="small" />;
      case 'Low Stock':
        return <WarningIcon fontSize="small" />;
      case 'Out of Stock':
        return <ErrorIcon fontSize="small" />;
      default:
        return <CheckCircleIcon fontSize="small" />;
    }
  };

  const filteredData = inventoryData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === 0 || 
      (activeTab === 1 && item.category === 'Equipment') ||
      (activeTab === 2 && item.category === 'Products') ||
      (activeTab === 3 && item.category === 'Supplies');
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Inventory Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="small"
        >
          Add Item
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All Items" />
          <Tab label="Equipment" />
          <Tab label="Products" />
          <Tab label="Supplies" />
        </Tabs>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search inventory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell align="right">
                  {item.quantity}
                  {item.quantity <= item.minQuantity && (
                    <Typography
                      component="span"
                      color="error"
                      sx={{ ml: 1, fontSize: '0.75rem' }}
                    >
                      (Min: {item.minQuantity})
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getStatusIcon(item.status) || undefined}
                    label={item.status}
                    size="small"
                    color={getStatusColor(item.status)}
                  />
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  {new Date(item.lastUpdated).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="error">
          {filteredData.filter(item => item.status === 'Out of Stock').length} items out of stock
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Last updated: {new Date().toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default InventorySection; 