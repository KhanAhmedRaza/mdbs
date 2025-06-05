import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Grid,
  Chip,
  Button,
  LinearProgress,
} from '@mui/material';

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
      id={`revenue-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const RevenueSection = () => {
  const [tabValue, setTabValue] = useState(0);

  const pricingRules = [
    {
      id: 'PR001',
      name: 'Friday Evening Premium',
      condition: 'Friday after 6 PM',
      adjustment: '+$5',
      status: 'Active',
    },
    {
      id: 'PR002',
      name: 'Tuesday Morning Special',
      condition: 'Tuesday 9 AM - 12 PM',
      adjustment: '-15%',
      status: 'Active',
    },
    {
      id: 'PR003',
      name: 'Weekend Premium',
      condition: 'Saturday & Sunday',
      adjustment: '+$8',
      status: 'Inactive',
    },
  ];

  const upsellData = [
    {
      barber: 'Michael Brown',
      service: 'Haircut',
      upsells: 45,
      topCombo: 'Beard Trim',
      conversionRate: 28,
    },
    {
      barber: 'Jessica Martinez',
      service: 'Beard Trim',
      upsells: 38,
      topCombo: 'Haircut',
      conversionRate: 32,
    },
    {
      barber: 'William Taylor',
      service: 'Hair Color',
      upsells: 25,
      topCombo: 'Scalp Treatment',
      conversionRate: 22,
    },
  ];

  const membershipPlans = [
    {
      id: 'MP001',
      name: 'Basic',
      services: '2 Cuts + 1 Beard Trim',
      price: 50,
      subscribers: 124,
      churnRate: 5,
    },
    {
      id: 'MP002',
      name: 'Premium',
      services: '3 Cuts + 2 Beard Trims',
      price: 75,
      subscribers: 86,
      churnRate: 8,
    },
    {
      id: 'MP003',
      name: 'VIP',
      services: 'Unlimited Cuts & Trims',
      price: 120,
      subscribers: 45,
      churnRate: 12,
    },
  ];

  const popularCombos = [
    {
      combo: 'Haircut + Facial',
      count: 156,
      revenue: 4680,
      conversion: 35,
    },
    {
      combo: 'Beard Trim + Scalp Massage',
      count: 98,
      revenue: 2450,
      conversion: 28,
    },
    {
      combo: 'Hair Color + Treatment',
      count: 67,
      revenue: 3350,
      conversion: 42,
    },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Revenue Optimization
      </Typography>

      <Tabs
        value={tabValue}
        onChange={(_, newValue) => setTabValue(newValue)}
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
      >
        <Tab label="Dynamic Pricing" />
        <Tab label="Upsell Analytics" />
        <Tab label="Memberships" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6" gutterBottom>
          Price Adjustment Rules
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rule Name</TableCell>
                <TableCell>Condition</TableCell>
                <TableCell>Adjustment</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pricingRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>{rule.name}</TableCell>
                  <TableCell>{rule.condition}</TableCell>
                  <TableCell>
                    <Chip
                      label={rule.adjustment}
                      color={rule.adjustment.startsWith('+') ? 'error' : 'success'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={rule.status}
                      color={rule.status === 'Active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Staff Upsell Performance
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Barber</TableCell>
                    <TableCell>Base Service</TableCell>
                    <TableCell align="right">Upsells</TableCell>
                    <TableCell>Top Combo</TableCell>
                    <TableCell>Conversion Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upsellData.map((data) => (
                    <TableRow key={data.barber}>
                      <TableCell>{data.barber}</TableCell>
                      <TableCell>{data.service}</TableCell>
                      <TableCell align="right">{data.upsells}</TableCell>
                      <TableCell>{data.topCombo}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={data.conversionRate}
                              sx={{ height: 8, borderRadius: 1 }}
                            />
                          </Box>
                          <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="text.secondary">
                              {data.conversionRate}%
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Popular Service Combinations
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Combination</TableCell>
                    <TableCell align="right">Total Sales</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                    <TableCell>Conversion Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {popularCombos.map((combo) => (
                    <TableRow key={combo.combo}>
                      <TableCell>{combo.combo}</TableCell>
                      <TableCell align="right">{combo.count}</TableCell>
                      <TableCell align="right">${combo.revenue}</TableCell>
                      <TableCell>{combo.conversion}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {membershipPlans.map((plan) => (
            <Grid item xs={12} md={4} key={plan.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {plan.name} Plan
                  </Typography>
                  <Typography variant="h4" color="primary" gutterBottom>
                    ${plan.price}/mo
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {plan.services}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Active Subscribers: {plan.subscribers}
                    </Typography>
                    <Typography variant="body2" color="error">
                      Churn Rate: {plan.churnRate}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default RevenueSection; 