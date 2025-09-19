import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import Dashboard from './pages/Dashboard';

function TestApp() {
  return (
    <CustomThemeProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Router>
      </AppProvider>
    </CustomThemeProvider>
  );
}

export default TestApp;