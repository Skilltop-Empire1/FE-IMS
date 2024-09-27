import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';


export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  // Retrieve and decode JWT token from localStorage
  const token = localStorage.getItem('token');
  let userId = null;

  // Decode the token to extract userId if the token exists
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken?.id; // Assuming 'id' is the field storing userId
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  useEffect(() => {
    if (userId) {
      const socket = io('https://be-ims.onrender.com', {
        query: { userId }, // Pass userId in the query params
        withCredentials: true,
      });

      // Listen for the 'connect' event to get the socket id
      socket.on('connect', () => {
        console.log(`User ${userId} connected with socket id: ${socket.id}`);
      });

      socket.emit('register', (message) => {
        setNotifications((prevNotifications) => [...prevNotifications, message]);
        setHasNewNotification(true);
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [userId]);

  return (
    <NotificationContext.Provider
      value={{ notifications, hasNewNotification, setHasNewNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
