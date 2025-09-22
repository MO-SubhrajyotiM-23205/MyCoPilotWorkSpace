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
  ChevronLeft,
  Api
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

const DRAWER_WIDTH = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Home', icon: <Home />, path: '/home' },
  { text: 'API Test', icon: <Api />, path: '/api-test' },
  { text: 'Email Test', icon: <Email />, path: '/email' },
  { text: 'Advisory Talktime', icon: <Visibility />, path: '/advisory-talktime' },
  { text: 'SMS Test', icon: <Sms />, path: '/sms' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
        {menuItems.map((item) => {
          const selected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={selected}
                onClick={() => navigate(item.path)}
                sx={(theme) => selected ? ({
                  backgroundColor: theme.palette.action.selected,
                  '&:hover': { backgroundColor: theme.palette.action.selectedOpacity }
                }) : undefined}
              >
                <ListItemIcon sx={selected ? { color: 'primary.main' } : undefined}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={selected ? { fontWeight: 600 } : undefined} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default SideBar;