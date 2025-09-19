import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import TopBar from '../navigation/TopBar';
import SideBar from '../navigation/SideBar';
import { useApp } from '../../contexts/AppContext';

const Layout = () => {
  const { sidebarOpen, topbarVisible } = useApp();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <TopBar />
      <SideBar />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: topbarVisible ? '64px' : 0,
          marginLeft: { xs: 0, sm: sidebarOpen ? '240px' : 0 },
          transition: (theme) => theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          width: { xs: '100%', sm: sidebarOpen ? 'calc(100% - 240px)' : '100%' },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;