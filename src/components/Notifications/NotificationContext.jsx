import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

// Replace with your backend URL
const socket = io('https://be-ims.onrender.com');

// Create the context
export const NotificationContext = createContext();

// Create the provider
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  useEffect(() => {
    // Listen for the 'productAlert' event
    socket.on('productAlert', (message) => {
      setNotifications((prevNotifications) => [...prevNotifications, message]);
      setHasNewNotification(true); // Flag that there's a new notification
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off('productAlert');
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, hasNewNotification, setHasNewNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
