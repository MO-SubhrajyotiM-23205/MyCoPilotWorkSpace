import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useAlert } from '../../contexts/AlertContext';

const GlobalAlert = () => {
  const { alert, hideAlert } = useAlert();

  if (!alert) return null;

  return (
    <Snackbar
      open={!!alert}
      onClose={hideAlert}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ mt: 8 }}
    >
      <Alert 
        onClose={hideAlert} 
        severity={alert.type}
        sx={{ width: '100%' }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalAlert;