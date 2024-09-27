import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  // Retrieve userId (assume it's stored in localStorage or Redux)
  const userId = localStorage.getItem('userId'); // Adjust this based on where you store user data
  console.log(userId)

  useEffect(() => {
    // Pass the userId as a query parameter when connecting
    const socket = io('https://be-ims.onrender.com', {
      query: { userId }, // Include userId in the query params
    });

    // Listen for 'productAlert' event
    socket.on('productAlert', (message) => {
      setNotifications((prevNotifications) => [...prevNotifications, message]);
      setHasNewNotification(true);
    });

    // Clean up the socket connection
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return (
    <NotificationContext.Provider
      value={{ notifications, hasNewNotification, setHasNewNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
