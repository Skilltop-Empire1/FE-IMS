import React, { createContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../redux/slices/userSlice';
import io from 'socket.io-client';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  // Retrieve userId from Redux
  const userId = useSelector(selectUserId); // use Redux to get userId
  console.log(userId);

  useEffect(() => {
    if (userId) {
      const socket = io('https://be-ims.onrender.com', {
        query: { userId }, // Including the userId in the query params
      });
  
      socket.on('register', (message) => {
        setNotifications((prevNotifications) => [...prevNotifications, message]);
        setHasNewNotification(true);
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
