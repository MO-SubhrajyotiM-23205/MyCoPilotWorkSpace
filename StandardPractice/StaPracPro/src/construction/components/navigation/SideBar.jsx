import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Box
} from '@mui/material';
import {
  Home,
  Settings,
  Email,
  Sms,
  Dashboard,
  Visibility,
  ChevronLeft
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

const DRAWER_WIDTH = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Home', icon: <Home />, path: '/home' },
  { text: 'Email Test', icon: <Email />, path: '/email' },
  { text: 'SMS Test', icon: <Sms />, path: '/sms' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

const SideBar = () => {
  const navigate = useNavigate();
  const { sidebarOpen, topbarVisible, toggleSidebar, toggleTopbar } = useApp();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={sidebarOpen}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        display: { xs: sidebarOpen ? 'block' : 'none', sm: 'block' },
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          marginTop: topbarVisible ? '64px' : 0,
          height: topbarVisible ? 'calc(100vh - 64px)' : '100vh',
          position: { xs: 'fixed', sm: 'relative' },
          zIndex: { xs: 1200, sm: 'auto' },
        },
      }}
    >
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton onClick={toggleSidebar}>
          <ChevronLeft />
        </IconButton>
        {!topbarVisible && (
          <IconButton onClick={toggleTopbar}>
            <Visibility />
          </IconButton>
        )}
      </Box>
      
      <Divider />
      
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;