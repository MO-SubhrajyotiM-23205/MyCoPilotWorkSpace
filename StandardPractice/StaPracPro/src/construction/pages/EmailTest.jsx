import React, { useState } from 'react';
import {
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { emailService } from '../services/emailService';

const EmailTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await emailService.sendContactForm(data);
      setResult(response);
      if (response.success) {
        reset();
      }
    } catch (error) {
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Email Service Test
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          
          <TextField
            fullWidth
            label="Subject"
            margin="normal"
            {...register('subject', { required: 'Subject is required' })}
            error={!!errors.subject}
            helperText={errors.subject?.message}
          />
          
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            margin="normal"
            {...register('message', { required: 'Message is required' })}
            error={!!errors.message}
            helperText={errors.message?.message}
          />
          
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Send Email'}
          </Button>
        </form>
        
        {result && (
          <Alert 
            severity={result.success ? 'success' : 'error'} 
            sx={{ mt: 2 }}
          >
            {result.success ? 'Email sent successfully!' : `Error: ${result.error}`}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default EmailTest;