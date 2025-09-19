import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [topbarVisible, setTopbarVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const toggleTopbar = () => setTopbarVisible(prev => !prev);

  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { ...notification, id }]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AppContext.Provider value={{
      sidebarOpen,
      topbarVisible,
      loading,
      notifications,
      toggleSidebar,
      toggleTopbar,
      setLoading,
      addNotification,
      removeNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};