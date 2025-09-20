import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CustomThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import EmailTest from './pages/EmailTest';
import Login from './pages/Login';
import ApiTest from './pages/ApiTest';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <CustomThemeProvider>
          <AppProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="home" element={<Dashboard />} />
                  <Route path="email" element={<EmailTest />} />
                  <Route path="api-test" element={<ApiTest />} />
                  <Route path="sms" element={<div>SMS Test Page</div>} />
                  <Route path="settings" element={<div>Settings Page</div>} />
                </Route>
              </Routes>
            </Router>
          </AppProvider>
        </CustomThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;