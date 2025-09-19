import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';
import { useApp } from '../../contexts/AppContext';

const TopBar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { sidebarOpen, topbarVisible, toggleSidebar, toggleTopbar } = useApp();

  if (!topbarVisible) return null;

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: '100%'
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={toggleSidebar}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          React Standard App
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" onClick={toggleTheme} title="Toggle Theme">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          
          <IconButton color="inherit" onClick={toggleTopbar} title="Hide Topbar">
            <VisibilityOff />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;