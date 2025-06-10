import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Campaign as CampaignIcon,
  Email as EmailIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  WhatsApp as WhatsAppIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

interface CampaignCard {
  id: string;
  title: string;
  type: string;
  status: 'active' | 'scheduled' | 'completed';
  progress: number;
  reach: number;
  engagement: number;
  conversions: number;
}

const MarketingSection: React.FC = () => {
  const theme = useTheme();

  const campaigns: CampaignCard[] = [
    {
      id: '1',
      title: 'Summer Special Offers',
      type: 'Email',
      status: 'active',
      progress: 65,
      reach: 2500,
      engagement: 45,
      conversions: 120,
    },
    {
      id: '2',
      title: 'Instagram Story Campaign',
      type: 'Social',
      status: 'active',
      progress: 80,
      reach: 5000,
      engagement: 75,
      conversions: 250,
    },
    {
      id: '3',
      title: 'Referral Program',
      type: 'WhatsApp',
      status: 'scheduled',
      progress: 0,
      reach: 1000,
      engagement: 0,
      conversions: 0,
    },
    {
      id: '4',
      title: 'Facebook Ads',
      type: 'Social',
      status: 'completed',
      progress: 100,
      reach: 10000,
      engagement: 60,
      conversions: 450,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return theme.palette.success.main;
      case 'scheduled':
        return theme.palette.info.main;
      case 'completed':
        return theme.palette.grey[500];
      default:
        return theme.palette.primary.main;
    }
  };

  const getCampaignIcon = (type: string) => {
    switch (type) {
      case 'Email':
        return <EmailIcon />;
      case 'Social':
        return <CampaignIcon />;
      case 'WhatsApp':
        return <WhatsAppIcon />;
      default:
        return <CampaignIcon />;
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Marketing Campaigns</Typography>
        <Button variant="contained" startIcon={<CampaignIcon />}>
          New Campaign
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Social Media Overview */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Social Media Overview</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <InstagramIcon sx={{ fontSize: 40, color: '#E1306C' }} />
                    <Typography variant="h6">Instagram</Typography>
                    <Typography variant="body2" color="textSecondary">
                      5.2K Followers
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <FacebookIcon sx={{ fontSize: 40, color: '#4267B2' }} />
                    <Typography variant="h6">Facebook</Typography>
                    <Typography variant="body2" color="textSecondary">
                      3.8K Likes
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <WhatsAppIcon sx={{ fontSize: 40, color: '#25D366' }} />
                    <Typography variant="h6">WhatsApp</Typography>
                    <Typography variant="body2" color="textSecondary">
                      1.2K Subscribers
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Campaign Cards */}
        {campaigns.map((campaign) => (
          <Grid item xs={12} md={6} key={campaign.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {getCampaignIcon(campaign.type)}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {campaign.title}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Chip
                    label={campaign.status}
                    size="small"
                    sx={{ 
                      backgroundColor: getStatusColor(campaign.status),
                      color: 'white',
                      mr: 1 
                    }}
                  />
                  <Chip
                    label={campaign.type}
                    size="small"
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={campaign.progress}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">
                      Reach
                    </Typography>
                    <Typography variant="h6">
                      {campaign.reach.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">
                      Engagement
                    </Typography>
                    <Typography variant="h6">
                      {campaign.engagement}%
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">
                      Conversions
                    </Typography>
                    <Typography variant="h6">
                      {campaign.conversions}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button size="small">View Details</Button>
                <Button size="small" color="primary">
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MarketingSection; 