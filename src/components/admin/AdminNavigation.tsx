import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  useTheme,
  Divider,
  Typography,
  Button,
} from '@mui/material';
import {
  Dashboard,
  AttachMoney,
  Inventory,
  Assessment,
  Campaign,
  People,
  Menu as MenuIcon,
  ChevronLeft,
  MonetizationOn,
  Logout,
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;

const AdminNavigation = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const router = useRouter();
  const { logout } = useAuth();

  const menuItems = [
    { label: 'Dashboard', icon: <Dashboard />, path: '/admin' },
    { label: 'Finance', icon: <AttachMoney />, path: '/admin/finance' },
    { label: 'Revenue', icon: <MonetizationOn />, path: '/admin/revenue' },
    { label: 'Inventory', icon: <Inventory />, path: '/admin/inventory' },
    { label: 'Reports', icon: <Assessment />, path: '/admin/reports' },
    { label: 'Marketing', icon: <Campaign />, path: '/admin/marketing' },
    { label: 'Operations', icon: <People />, path: '/admin/operations' },
  ];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : theme.spacing(7),
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : theme.spacing(7),
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end',
          padding: theme.spacing(0, 1),
          ...theme.mixins.toolbar,
        }}>
          {open && (
            <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
              Admin Panel
            </Typography>
          )}
          <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              passHref
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem
                button
                selected={router.pathname === item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.label} />}
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <Logout />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default AdminNavigation; 