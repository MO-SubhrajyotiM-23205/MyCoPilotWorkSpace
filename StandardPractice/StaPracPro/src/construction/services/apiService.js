import axios from 'axios';
import { authService } from './MyZoneAuthService.js';

const API_BASE_URL = '/api';

// API client for general API calls
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler based on status codes
const handleApiError = (error) => {
  const status = error.response?.status;
  const message = error.response?.data?.message || error.message || 'An error occurred';
  
  const errorResponse = {
    status,
    message,
    data: error.response?.data,
    isNetworkError: !error.response
  };

  switch (status) {
    case 400:
      errorResponse.type = 'BAD_REQUEST';
      errorResponse.userMessage = 'Invalid request. Please check your input.';
      break;
    case 401:
      errorResponse.type = 'UNAUTHORIZED';
      errorResponse.userMessage = 'Session expired. Please login again.';
      // Clear token and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      setTimeout(() => window.location.href = '/login', 100);
      break;
    case 403:
      errorResponse.type = 'FORBIDDEN';
      errorResponse.userMessage = 'Access denied. You do not have permission.';
      break;
    case 404:
      errorResponse.type = 'NOT_FOUND';
      errorResponse.userMessage = 'Resource not found.';
      break;
    case 422:
      errorResponse.type = 'VALIDATION_ERROR';
      errorResponse.userMessage = 'Validation failed. Please check your input.';
      break;
    case 429:
      errorResponse.type = 'RATE_LIMIT';
      errorResponse.userMessage = 'Too many requests. Please try again later.';
      break;
    case 500:
      errorResponse.type = 'SERVER_ERROR';
      errorResponse.userMessage = 'Server error. Please try again later.';
      break;
    case 502:
    case 503:
    case 504:
      errorResponse.type = 'SERVICE_UNAVAILABLE';
      errorResponse.userMessage = 'Service temporarily unavailable.';
      break;
    default:
      errorResponse.type = 'UNKNOWN_ERROR';
      errorResponse.userMessage = errorResponse.isNetworkError 
        ? 'Network error. Please check your connection.' 
        : 'An unexpected error occurred.';
  }

  return errorResponse;
};

// API client interceptors
apiClient.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('authToken');
    const tokenType = localStorage.getItem('tokenType') || 'Bearer';
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    
    // Check if token is expired
    if (token && tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
      // Token expired, get new token
      try {
        const response = await authService.getNewToken();
        token = response.data.access_token;
      } catch (error) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    // If no token, redirect to login
    if (!token) {
      window.location.href = '/login';
      return Promise.reject(new Error('No authentication token'));
    }
    
    config.headers.Authorization = `${tokenType} ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle token refresh on 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const response = await authService.getNewToken();
        const newToken = response.data.access_token;
        const tokenType = response.data.token_type || 'Bearer';
        originalRequest.headers.Authorization = `${tokenType} ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(handleApiError(error));
  }
);

// Export auth service for backward compatibility
export { authService };

// API service with automatic token handling
export const apiService = {
  get: async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, config);
      return { success: true, data: response.data, status: response.status };
    } catch (error) {
      return { success: false, error, status: error.status };
    }
  },

  post: async (url, data, config = {}) => {
    try {
      const response = await apiClient.post(url, data, config);
      return { success: true, data: response.data, status: response.status };
    } catch (error) {
      return { success: false, error, status: error.status };
    }
  },

  put: async (url, data, config = {}) => {
    try {
      const response = await apiClient.put(url, data, config);
      return { success: true, data: response.data, status: response.status };
    } catch (error) {
      return { success: false, error, status: error.status };
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await apiClient.delete(url, config);
      return { success: true, data: response.data, status: response.status };
    } catch (error) {
      return { success: false, error, status: error.status };
    }
  },

  patch: async (url, data, config = {}) => {
    try {
      const response = await apiClient.patch(url, data, config);
      return { success: true, data: response.data, status: response.status };
    } catch (error) {
      return { success: false, error, status: error.status };
    }
  }
};

export default apiService;