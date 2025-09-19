import React from 'react';
import { Typography, Grid, Paper, Box, Button, Switch, FormControlLabel } from '@mui/material';
import { Email, Sms, Settings, Dashboard as DashboardIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  const cards = [
    { title: 'Email Service', icon: <Email />, description: 'Send emails using EmailJS' },
    { title: 'SMS Service', icon: <Sms />, description: 'Send SMS messages' },
    { title: 'Settings', icon: <Settings />, description: 'App configuration' },
    { title: 'Dashboard', icon: <DashboardIcon />, description: 'Main dashboard' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                color="primary"
              />
            }
            label={isDarkMode ? 'Dark Mode' : 'Light Mode'}
          />
          <Button
            variant="outlined"
            startIcon={isDarkMode ? <Brightness7 /> : <Brightness4 />}
            onClick={toggleTheme}
          >
            {isDarkMode ? 'Light' : 'Dark'} Theme
          </Button>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', height: 150 }}>
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {card.icon}
              </Box>
              <Typography variant="h6" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;