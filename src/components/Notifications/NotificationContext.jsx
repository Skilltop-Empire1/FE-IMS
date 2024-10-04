import React, { createContext, useState, useEffect } from 'react'
import io from 'socket.io-client'
import { jwtDecode } from 'jwt-decode' // Ensure jwt_decode is imported correctly

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [hasNewNotification, setHasNewNotification] = useState(false)
  const [alertMessage, setAlertMessage] = useState('') // Store the alert message
  const [isConnected, setIsConnected] = useState(false) // Track socket connection status

  // Retrieve and decode JWT token from localStorage
  const token = localStorage.getItem('token')
  let userId = null

  // Decode the token to extract userId if the token exists
  if (token) {
    try {
      const decodedToken = jwtDecode(token) // Correct usage of jwt_decode
      userId = decodedToken?.id // Assuming 'id' is the field storing userId
    } catch (error) {
      console.error('Error decoding token:', error)
    }
  }

  useEffect(() => {
    if (userId) {
      // Connect to WebSocket using socket.io-client
      const socket = io('https://be-ims.onrender.com', {
        withCredentials: true, // Support CORS if necessary
      })

      // Register the user when the socket connection is established
      socket.on('connect', () => {
        setIsConnected(true) // Update connection status

        // Emit the "register" event to register the userId with the server
        socket.emit('register', userId)
      })

      // Listen for "productAlert" event from the server
      socket.on('productAlert', (data) => {
        setAlertMessage(data.message) // Update alert message
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          data.message,
        ]) // Add to notifications
        setHasNewNotification(true) // Set flag for new notification
      })

      // Handle socket disconnect
      socket.on('disconnect', () => {
        setIsConnected(false) // Update connection status
      })

      // Cleanup on component unmount
      return () => {
        socket.disconnect()
      }
    }
  }, [userId])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        hasNewNotification,
        setHasNewNotification,
        alertMessage,
        isConnected,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
