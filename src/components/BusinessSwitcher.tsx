import React from 'react';
import { useRouter } from 'next/router';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { BusinessConfig } from '../types/tenant';

interface BusinessSwitcherProps {
  currentBusinessId: string;
  businesses: BusinessConfig[];
}

const BusinessSwitcher: React.FC<BusinessSwitcherProps> = ({
  currentBusinessId,
  businesses
}) => {
  const router = useRouter();

  const handleChange = (event: any) => {
    const newBusinessId = event.target.value;
    // Update the URL with the new business ID
    const newQuery = { ...router.query, bid: newBusinessId };
    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  return (
    <Box sx={{ minWidth: 200, maxWidth: 300, mb: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="business-switcher-label">Business</InputLabel>
        <Select
          labelId="business-switcher-label"
          id="business-switcher"
          value={currentBusinessId}
          label="Business"
          onChange={handleChange}
        >
          {businesses.map((business) => (
            <MenuItem key={business.id} value={business.id}>
              {business.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BusinessSwitcher; 