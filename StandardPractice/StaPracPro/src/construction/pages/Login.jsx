import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/apiService';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    
    // Stage 1: Get token using credentials
    const result = await authService.login(data);
    
    if (result.success) {
      // Stage 2: Token is now stored, redirect to dashboard
      navigate('/');
    } else {
      // Handle different error types
      const { error } = result;
      setError(error.userMessage || error.message);
    }
    
    setLoading(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: 'background.default', px: 2 }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%', mx: 'auto' }}>
        <Typography variant="h4" align="left" gutterBottom>
          Login
        </Typography>
        <Typography variant="body2" align="left" color="text.secondary" sx={{ mb: 2 }}>
          Uses fixed API credentials (myzone/myzone_123)
        </Typography>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Employee Code"
            margin="normal"
            {...register('employeeCode', { 
              required: 'Employee code is required',
              minLength: {
                value: 3,
                message: 'Employee code must be at least 3 characters'
              }
            })}
            error={!!errors.employeeCode}
            helperText={errors.employeeCode?.message}
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;