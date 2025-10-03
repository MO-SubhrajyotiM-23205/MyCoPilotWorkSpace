import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Button,
  Box,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { apiService, authService } from '../services/apiService';
import { useAlert } from '../contexts/AlertContext';

const ApiTest = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(authService.getCurrentUser());
  const { showSuccess, showError } = useAlert();

  const testApiCall = async (method, endpoint, data = null) => {
    setLoading(true);
    
    let result;
    switch (method) {
      case 'GET':
        result = await apiService.get(endpoint);
        break;
      case 'POST':
        result = await apiService.post(endpoint, data || { test: 'data' });
        break;
      case 'PUT':
        result = await apiService.put(endpoint, data || { test: 'updated' });
        break;
      case 'DELETE':
        result = await apiService.delete(endpoint);
        break;
      default:
        result = { success: false, error: { message: 'Invalid method' } };
    }
    
    const newResult = {
      id: Date.now(),
      method,
      endpoint,
      timestamp: new Date().toLocaleTimeString(),
      success: result.success,
      status: result.status,
      data: result.success ? result.data : result.error,
      errorType: result.success ? null : result.error?.type
    };
    
    if (result.success) {
      showSuccess(`${method} ${endpoint} - Success`);
    } else {
      showError(`${method} ${endpoint} - ${result.error?.message || 'Failed'}`);
    }
    
    setResults(prev => [newResult, ...prev.slice(0, 9)]);
    setLoading(false);
  };

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          API Test Page
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user && (
            <Typography variant="body2">
              Welcome, {user.name || user.employeeCode}
            </Typography>
          )}
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Test API Calls
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button 
                variant="contained" 
                onClick={() => testApiCall('GET', '/users')}
                disabled={loading}
              >
                GET /users
              </Button>
              
              <Button 
                variant="contained" 
                onClick={() => testApiCall('POST', '/users')}
                disabled={loading}
              >
                POST /users
              </Button>
              
              <Button 
                variant="contained" 
                onClick={() => testApiCall('PUT', '/users/1')}
                disabled={loading}
              >
                PUT /users/1
              </Button>
              
              <Button 
                variant="contained" 
                onClick={() => testApiCall('DELETE', '/users/1')}
                disabled={loading}
              >
                DELETE /users/1
              </Button>
              
              <Button 
                variant="contained" 
                color="warning"
                onClick={() => testApiCall('GET', '/protected')}
                disabled={loading}
              >
                Test Protected Route
              </Button>
            </Box>
            
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CircularProgress />
              </Box>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, maxHeight: 600, overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              API Results
            </Typography>
            
            {results.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No API calls made yet
              </Typography>
            ) : (
              results.map((result) => (
                <Card key={result.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2">
                        {result.method} {result.endpoint}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {result.timestamp}
                      </Typography>
                    </Box>
                    
                    <Alert 
                      severity={result.success ? 'success' : 'error'} 
                      sx={{ mb: 1 }}
                    >
                      Status: {result.status} - {result.success ? 'Success' : result.errorType}
                    </Alert>
                    
                    <Typography variant="body2" component="pre" sx={{ 
                      backgroundColor: 'background.paper', 
                      p: 1, 
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      overflow: 'auto'
                    }}>
                      {JSON.stringify(result.data, null, 2)}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApiTest;