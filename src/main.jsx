import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary.jsx'
import { NotificationProvider } from './components/Notifications/NotificationContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <NotificationProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </NotificationProvider>
    </ErrorBoundary>
  </StrictMode>,
)
