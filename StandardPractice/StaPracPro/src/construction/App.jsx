import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CustomThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import { AlertProvider } from './contexts/AlertContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import GlobalAlert from './components/common/GlobalAlert';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import EmailTest from './pages/EmailTest';
import Login from './pages/Login';
import ApiTest from './pages/ApiTest';
import AdvisoryTalktime from './pages/AdvisoryTalktime';
import TestMyAPI from './pages/TestMyAPI';

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
            <AlertProvider>
              <Router>
                <GlobalAlert />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                </Route>
                <Route path="/home" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                </Route>
                <Route path="/email" element={<Layout />}>
                  <Route index element={<EmailTest />} />
                </Route>
                <Route path="/api-test" element={<Layout />}>
                  <Route index element={<ApiTest />} />
                </Route>
                <Route path="/advisory-talktime" element={<Layout />}>
                  <Route index element={<AdvisoryTalktime />} />
                </Route>
                <Route path="/test-my-api" element={<Layout />}>
                  <Route index element={<TestMyAPI />} />
                </Route>
                <Route path="/sms" element={<Layout />}>
                  <Route index element={<div>SMS Test Page</div>} />
                </Route>
                <Route path="/settings" element={<Layout />}>
                  <Route index element={<div>Settings Page</div>} />
                </Route>
              </Routes>
              </Router>
            </AlertProvider>
          </AppProvider>
        </CustomThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;