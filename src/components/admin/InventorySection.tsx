import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Chip,
} from '@mui/material';

const InventorySection = () => {
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [itemTypeFilter, setItemTypeFilter] = useState<string>('all');

  const stores = ['Raleigh', 'Charlotte', 'Durham'];
  const itemTypes = ['Clippers', 'Chairs', 'Towels', 'Razors', 'Supplies'];

  const inventoryData = [
    { id: 1, name: 'Professional Clippers', type: 'Clippers', quantity: 12, condition: 'Good', location: 'Raleigh' },
    { id: 2, name: 'Barber Chairs', type: 'Chairs', quantity: 5, condition: 'Needs Replacement', location: 'Charlotte' },
    { id: 3, name: 'Premium Towels', type: 'Towels', quantity: 200, condition: 'New', location: 'Durham' },
    { id: 4, name: 'Straight Razors', type: 'Razors', quantity: 30, condition: 'Good', location: 'Raleigh' },
    { id: 5, name: 'Electric Trimmers', type: 'Clippers', quantity: 8, condition: 'Good', location: 'Charlotte' },
    { id: 6, name: 'Neck Dusters', type: 'Supplies', quantity: 15, condition: 'Good', location: 'Durham' },
    { id: 7, name: 'Shampoo Chairs', type: 'Chairs', quantity: 3, condition: 'Good', location: 'Raleigh' },
    { id: 8, name: 'Disposal Razors', type: 'Razors', quantity: 150, condition: 'New', location: 'Charlotte' },
    { id: 9, name: 'Hair Dryers', type: 'Supplies', quantity: 6, condition: 'Needs Replacement', location: 'Durham' },
    { id: 10, name: 'Sanitizing UV Cabinet', type: 'Supplies', quantity: 2, condition: 'Good', location: 'Raleigh' },
  ];

  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocationFilter(event.target.value);
  };

  const handleItemTypeChange = (event: SelectChangeEvent) => {
    setItemTypeFilter(event.target.value);
  };

  const filteredInventory = inventoryData.filter(item => {
    const locationMatch = locationFilter === 'all' || item.location === locationFilter;
    const typeMatch = itemTypeFilter === 'all' || item.type === itemTypeFilter;
    return locationMatch && typeMatch;
  });

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Good':
        return 'success';
      case 'Needs Replacement':
        return 'error';
      case 'New':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Equipment Inventory
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Location</InputLabel>
          <Select
            value={locationFilter}
            label="Location"
            onChange={handleLocationChange}
          >
            <MenuItem value="all">All Locations</MenuItem>
            {stores.map((store) => (
              <MenuItem key={store} value={store}>
                {store}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Item Type</InputLabel>
          <Select
            value={itemTypeFilter}
            label="Item Type"
            onChange={handleItemTypeChange}
          >
            <MenuItem value="all">All Items</MenuItem>
            {itemTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Equipment Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell>
                  <Chip 
                    label={item.condition}
                    color={getConditionColor(item.condition) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{item.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InventorySection; 