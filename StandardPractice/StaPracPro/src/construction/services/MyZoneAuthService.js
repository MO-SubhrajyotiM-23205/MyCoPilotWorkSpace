import axios from 'axios';

const API_BASE_URL = '/api';
const TOKEN_URL = `${API_BASE_URL}/HrmsApi/Token`;
const EMP_ACCESS_INFO_URL = `${API_BASE_URL}/HrmsApi/api/EmployeeAccessiblity`;
const EMP_AUTHORIZATION_INFO_URL = `${API_BASE_URL}/api/auth/app`;

// Auth client for authentication calls
const authClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

// Error handler
const handleApiError = (error) => {
  const status = error.response?.status;
  const message = error.response?.data?.message || error.message || 'An error occurred';
  
  return {
    status,
    message,
    data: error.response?.data,
    isNetworkError: !error.response,
    type: status === 401 ? 'UNAUTHORIZED' : 'ERROR',
    userMessage: status === 401 ? 'Invalid credentials' : message
  };
};

authClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(handleApiError(error))
);

export const authService = {
  // Three-stage authentication flow
  login: async (userCredentials) => {
    try {
      // Stage 1: Generate token
      const tokenData = new URLSearchParams({
        grant_Type: 'password',
        UserName: 'myzone',
        Password: 'myzone_123'
      });
      
      const tokenResponse = await authClient.post(TOKEN_URL, tokenData);
      const { access_token, token_type, expires_in } = tokenResponse.data;
      const tempToken = access_token;
      const tempTokenType = token_type || 'Bearer';
      
      // Stage 2: Check employee access
      const accessResponse = await authClient.get(`${EMP_ACCESS_INFO_URL}/${userCredentials.employeeCode}`, {
        headers: {
          'Authorization': `${tempTokenType} ${tempToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      const accessData = Array.isArray(accessResponse.data) ? accessResponse.data[0] : accessResponse.data;
      if (accessData.BusinessApps !== 'No') {
        return { 
          success: false, 
          error: {
            type: 'ACCESS_DENIED',
            message: accessData.Msg || 'Business Apps access required',
            userMessage: accessData.Msg || 'You do not have permission to access this application'
          }
        };
      }
      
      // Stage 3: Validate user credentials
      const authResponse = await authClient.post(EMP_AUTHORIZATION_INFO_URL, {
        EmployeeCode: userCredentials.employeeCode,
        ApplicationGuid: "29F1E750-6D62-4BF0-85F2-571BA61A7364",
        AppIpAddress: "192.168.99.45",
        Password: userCredentials.password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (authResponse.data.ResponseCode !== 0) {
        return { 
          success: false, 
          error: {
            type: 'INVALID_CREDENTIALS',
            message: authResponse.data.ResponseMessage,
            userMessage: authResponse.data.ResponseMessage
          }
        };
      }
      
      // Store authentication data
      localStorage.setItem('authToken', access_token);
      localStorage.setItem('tokenType', tempTokenType);
      localStorage.setItem('tokenExpiry', Date.now() + (expires_in * 1000));
      localStorage.setItem('user', JSON.stringify({ 
        employeeCode: userCredentials.employeeCode,
        accessInfo: accessData,
        authInfo: authResponse.data
      }));
      
      return { 
        success: true, 
        data: {
          token: tokenResponse.data,
          access: accessResponse.data,
          authorization: authResponse.data
        }
      };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  getNewToken: async () => {
    const tokenData = new URLSearchParams({
      grant_Type: 'password',
      UserName: 'myzone',
      Password: 'myzone_123'
    });
    
    const response = await authClient.post(TOKEN_URL, tokenData);
    const { access_token, token_type, expires_in } = response.data;
    
    localStorage.setItem('authToken', access_token);
    localStorage.setItem('tokenType', token_type || 'Bearer');
    localStorage.setItem('tokenExpiry', Date.now() + (expires_in * 1000));
    
    return response;
  },

  logout: async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  isAuthenticated: () => !!localStorage.getItem('authToken'),

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};