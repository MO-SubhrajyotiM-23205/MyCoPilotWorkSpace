import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'info', duration = 5000) => {
    setAlert({ message, type, id: Date.now() });
    
    if (duration > 0) {
      setTimeout(() => {
        setAlert(null);
      }, duration);
    }
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const showSuccess = (message, duration = 3000) => showAlert(message, 'success', duration);
  const showError = (message, duration = 5000) => showAlert(message, 'error', duration);
  const showWarning = (message, duration = 4000) => showAlert(message, 'warning', duration);
  const showInfo = (message, duration = 3000) => showAlert(message, 'info', duration);

  return (
    <AlertContext.Provider value={{
      alert,
      showAlert,
      hideAlert,
      showSuccess,
      showError,
      showWarning,
      showInfo
    }}>
      {children}
    </AlertContext.Provider>
  );
};