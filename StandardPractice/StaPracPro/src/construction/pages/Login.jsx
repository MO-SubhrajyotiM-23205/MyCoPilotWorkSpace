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
import { authService } from '../services/MyZoneAuthService';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authStage, setAuthStage] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      setAuthStage('Generating token...');
      const result = await authService.login(data);
      
      if (result.success) {
        setAuthStage('Authentication successful!');
        setTimeout(() => navigate('/dashboard'), 500);
      } else {
        setError(result.error.userMessage || result.error.message || 'Authentication failed');
      }
    } catch (err) {
      setError('An unexpected error occurred during authentication');
    } finally {
      setLoading(false);
      setAuthStage('');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'background.default',
        padding: 2
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 2 }}>
          Three-stage authentication: Token → Access → Authorization
        </Typography>
        
        {authStage && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {authStage}
          </Alert>
        )}
        
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