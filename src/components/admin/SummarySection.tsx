import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const SummarySection = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Summary Reports
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Monthly Financial Summary</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                View detailed monthly financial reports
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Preview Report</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Top Performing Stores</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Compare store performance metrics
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Preview Report</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WarningIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Inventory Reorder Alert</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                View items below threshold quantity
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Preview Report</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SummarySection; 