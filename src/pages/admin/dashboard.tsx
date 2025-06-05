import React, { useState } from 'react';
import {
  Box,
  Container,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Assessment as ReportsIcon,
  Campaign as MarketingIcon,
  People as CustomersIcon,
  Person as StaffIcon,
  Event as SchedulingIcon,
  Star as ReviewsIcon,
  Share as ReferralsIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import KPISection from '../../components/admin/KPISection';
import CashflowSection from '../../components/admin/CashflowSection';
import InventorySection from '../../components/admin/InventorySection';
import ReportsSection from '../../components/admin/ReportsSection';
import MarketingSection from '../../components/admin/MarketingSection';
import OperationsSection from '../../components/admin/OperationsSection';
import RevenueSection from '../../components/admin/RevenueSection';
import FinanceSection from '../../components/admin/FinanceSection';

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
      id={`dashboard-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [userRole] = useState('admin'); // In real app, this would come from auth context

  const notifications = [
    { id: 1, message: 'New booking: John Smith at 2:30 PM' },
    { id: 2, message: 'Low inventory alert: Clippers (2 remaining)' },
    { id: 3, message: 'Cancellation: Emma Davis at 4:00 PM' },
  ];

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, allowed: ['admin', 'manager', 'barber'], tabIndex: 0 },
    { text: 'Marketing', icon: <MarketingIcon />, allowed: ['admin'], tabIndex: 1 },
    { text: 'Operations', icon: <StaffIcon />, allowed: ['admin', 'manager'], tabIndex: 2 },
    { text: 'Finance', icon: <AttachMoneyIcon />, allowed: ['admin'], tabIndex: 3 },
    { text: 'Revenue', icon: <TrendingUpIcon />, allowed: ['admin'], tabIndex: 4 },
    { text: 'Inventory', icon: <InventoryIcon />, allowed: ['admin', 'manager'], tabIndex: 5 },
    { text: 'Reports', icon: <ReportsIcon />, allowed: ['admin', 'manager'], tabIndex: 6 },
    { text: 'Customers', icon: <CustomersIcon />, allowed: ['admin', 'manager'], tabIndex: -1 },
    { text: 'Scheduling', icon: <SchedulingIcon />, allowed: ['admin', 'manager', 'barber'], tabIndex: -1 },
    { text: 'Reviews', icon: <ReviewsIcon />, allowed: ['admin', 'manager'], tabIndex: -1 },
    { text: 'Referrals', icon: <ReferralsIcon />, allowed: ['admin', 'manager'], tabIndex: -1 },
    { text: 'Settings', icon: <SettingsIcon />, allowed: ['admin'], tabIndex: -1 },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuItemClick = (tabIndex: number) => {
    if (tabIndex >= 0) {
      setTabValue(tabIndex);
    }
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MD Barber Club Admin
          </Typography>
          <IconButton
            color="inherit"
            onClick={(e) => setNotificationsAnchor(e.currentTarget)}
          >
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              item.allowed.includes(userRole) && (
                <ListItem 
                  button 
                  key={item.text}
                  onClick={() => handleMenuItemClick(item.tabIndex)}
                  selected={item.tabIndex === tabValue}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              )
            ))}
          </List>
        </Box>
      </Drawer>

      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={() => setNotificationsAnchor(null)}
      >
        {notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={() => setNotificationsAnchor(null)}>
            {notification.message}
          </MenuItem>
        ))}
      </Menu>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="xl">
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Overview" />
              <Tab label="Marketing" />
              <Tab label="Operations" />
              <Tab label="Finance" />
              <Tab label="Revenue" />
              <Tab label="Inventory" />
              <Tab label="Reports" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <KPISection />
            <Box sx={{ mt: 4 }}>
              <CashflowSection />
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <MarketingSection />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <OperationsSection />
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <FinanceSection />
          </TabPanel>

          <TabPanel value={tabValue} index={4}>
            <RevenueSection />
          </TabPanel>

          <TabPanel value={tabValue} index={5}>
            <InventorySection />
          </TabPanel>

          <TabPanel value={tabValue} index={6}>
            <ReportsSection />
          </TabPanel>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard; 