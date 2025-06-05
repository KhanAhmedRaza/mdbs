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
  Button,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
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
      id={`marketing-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const MarketingSection = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedCampaignType, setSelectedCampaignType] = useState('lapsed');

  const lapsedCustomers = [
    { id: 'C001', name: 'John Smith', lastVisit: '2023-12-15', email: 'john@example.com' },
    { id: 'C002', name: 'Sarah Wilson', lastVisit: '2023-12-10', email: 'sarah@example.com' },
    { id: 'C003', name: 'Mike Johnson', lastVisit: '2023-12-05', email: 'mike@example.com' },
  ];

  const upcomingBirthdays = [
    { id: 'C004', name: 'David Brown', date: '2024-03-15', email: 'david@example.com' },
    { id: 'C005', name: 'Emma Davis', date: '2024-03-18', email: 'emma@example.com' },
  ];

  const activeCampaigns = [
    { id: 'CAM001', name: 'Spring Special', code: 'SPRING25', discount: '25%', used: 45, expires: '2024-04-30' },
    { id: 'CAM002', name: 'Beard Week', code: 'BEARD20', discount: '20%', used: 28, expires: '2024-03-31' },
    { id: 'CAM003', name: 'First Timer', code: 'FRESH20', discount: '20%', used: 67, expires: '2024-12-31' },
  ];

  const topCustomers = [
    { id: 'C006', name: 'Robert Chen', spent: 850, visits: 12, lastVisit: '2024-03-01' },
    { id: 'C007', name: 'James Wilson', spent: 720, visits: 10, lastVisit: '2024-02-28' },
    { id: 'C008', name: 'Lisa Anderson', spent: 680, visits: 8, lastVisit: '2024-03-05' },
  ];

  const referralData = [
    { referrer: 'user001', name: 'Alex Thompson', referrals: 3, reward: '$15 Credit' },
    { referrer: 'user002', name: 'Maria Garcia', referrals: 2, reward: '$10 Credit' },
    { referrer: 'user003', name: 'Chris Lee', referrals: 4, reward: '$20 Credit' },
  ];

  const reviewStats = {
    total: 245,
    average: 4.6,
    breakdown: {
      5: 156,
      4: 67,
      3: 15,
      2: 5,
      1: 2,
    },
    responseRate: '92%',
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Marketing & Customer Engagement
      </Typography>

      <Tabs
        value={tabValue}
        onChange={(_, newValue) => setTabValue(newValue)}
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
      >
        <Tab label="Campaigns & Offers" />
        <Tab label="Customer Analytics" />
        <Tab label="Referral Program" />
        <Tab label="Reviews" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Campaign Manager
          </Typography>
          
          <FormControl sx={{ minWidth: 200, mb: 3 }}>
            <InputLabel>Campaign Type</InputLabel>
            <Select
              value={selectedCampaignType}
              label="Campaign Type"
              onChange={(e) => setSelectedCampaignType(e.target.value)}
            >
              <MenuItem value="lapsed">Lapsed Customers</MenuItem>
              <MenuItem value="birthday">Birthday/Anniversary</MenuItem>
              <MenuItem value="promo">Promo Code</MenuItem>
            </Select>
          </FormControl>

          {selectedCampaignType === 'lapsed' && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Last Visit</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lapsedCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.lastVisit}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        <Button size="small" variant="outlined">
                          Send Reminder
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Active Campaigns
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Campaign</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Times Used</TableCell>
                  <TableCell>Expires</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>{campaign.name}</TableCell>
                    <TableCell>
                      <Chip label={campaign.code} size="small" />
                    </TableCell>
                    <TableCell>{campaign.discount}</TableCell>
                    <TableCell>{campaign.used}</TableCell>
                    <TableCell>{campaign.expires}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customer Segments (Last 30 Days)
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box>
                    <Typography variant="h4" color="primary">342</Typography>
                    <Typography variant="body2">New Customers</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" color="secondary">901</Typography>
                    <Typography variant="body2">Repeat Customers</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Average Lifetime Value: $180
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Top Spending Customers
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Total Spent</TableCell>
                    <TableCell align="right">Visits</TableCell>
                    <TableCell>Last Visit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell align="right">${customer.spent}</TableCell>
                      <TableCell align="right">{customer.visits}</TableCell>
                      <TableCell>{customer.lastVisit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Referral Program Status
          </Typography>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                Current Reward: $10 for referrer and referee
              </Typography>
            </CardContent>
          </Card>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Referrer</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Referrals</TableCell>
                  <TableCell>Reward Earned</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {referralData.map((row) => (
                  <TableRow key={row.referrer}>
                    <TableCell>{row.referrer}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.referrals}</TableCell>
                    <TableCell>{row.reward}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Review Statistics
                </Typography>
                <Typography variant="h3" color="primary" gutterBottom>
                  {reviewStats.average}★
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Total Reviews: {reviewStats.total}
                </Typography>
                <Typography variant="body2">
                  Response Rate: {reviewStats.responseRate}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Rating Breakdown
                </Typography>
                {Object.entries(reviewStats.breakdown).reverse().map(([rating, count]) => (
                  <Box key={rating} sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ minWidth: 20 }}>
                        {rating}★
                      </Typography>
                      <Box
                        sx={{
                          flex: 1,
                          height: 8,
                          bgcolor: 'primary.main',
                          borderRadius: 1,
                          width: `${(count / reviewStats.total) * 100}%`,
                        }}
                      />
                      <Typography variant="body2">
                        {count}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default MarketingSection; 