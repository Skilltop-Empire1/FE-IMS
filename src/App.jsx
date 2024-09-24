import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import AppLayout from './components/appLayout/AppLayout'
import Account from './pages/accounts/Account'
import Home from './pages/home/Home'
import Categories from './pages/categories/Categories'
import Products from './pages/products/Products'
import SalesRecord from './pages/salesRecord/SalesRecord'
import Settings from './pages/settings/Settings'
import Stores from './pages/stores/Stores'
import NotFound from './pages/notFound/NotFound'
import AddProduct from './pages/addProduct/AddProduct'
import Staff from './pages/addStaff/Staff'
import AddStaff from './pages/addStaff/AddStaff'
import CreateStore from './pages/createStore/CreateStore'
import ProtectedRoute from './utilities/ProtectedRoute'
import MobileWarning from './pages/mobileWarning/MobileWarning'
import store from './redux/store'
import { setCredentials } from './redux/slices/AuthSlice'
import PasswordReset from './pages/Password reset/PasswordReset'
import PasswordConfirmation from './pages/Password reset/PasswordConfirmation'
import AddSaleRecord from './pages/addSalesRecord/AddSalesRecord'

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: 'signup', element: <Signup /> },
  { path: '/mobile-warning', element: <MobileWarning /> },
  { path: 'passwordReset', element: <PasswordReset /> },
  { path: 'passwordConfirmation', element: <PasswordConfirmation /> },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'accounts', element: <Account /> },
      { path: 'products', element: <Products /> },
      { path: 'salesRecords', element: <SalesRecord /> },
      { path: 'settings', element: <Settings /> },
      { path: 'stores', element: <Stores /> },
      { path: 'categories', element: <Categories /> },
      { path: 'addProduct', element: <AddProduct /> },
      { path: 'staff', element: <Staff /> },
      { path: 'addStaff', element: <AddStaff /> },
      { path: 'createStore', element: <CreateStore /> },
      { path: 'addSaleRecord', element: <AddSaleRecord /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])

function App() {
  const token = localStorage.getItem('token')
  if (token) {
    store.dispatch(setCredentials({ token }))
  }
  return <RouterProvider router={router} />
}

export default App
