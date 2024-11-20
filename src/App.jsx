import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './utilities/ProtectedRoute'
import { NotificationProvider } from './components/Notifications/NotificationContext'
import store from './redux/store'
import { setCredentials } from './redux/slices/AuthSlice'
import Loader from './components/loaderElement/Loader' // Ensure this path is correct
// import Invoice from './pages/Invoice/Invoice'

// Lazy load components
const Login = lazy(() => import('./pages/login/Login'))
const Signup = lazy(() => import('./pages/signup/Signup'))
const AppLayout = lazy(() => import('./components/appLayout/AppLayout'))
const Account = lazy(() => import('./pages/accounts/Account'))
const Home = lazy(() => import('./pages/home/Home'))
const Categories = lazy(() => import('./pages/categories/Categories'))
const Products = lazy(() => import('./pages/products/Products'))
const SalesRecord = lazy(() => import('./pages/salesRecord/SalesRecord'))
const Invoice = lazy(() => import('./pages/Invoice/Invoice'))
const Settings = lazy(() => import('./pages/settings/Settings'))
const Stores = lazy(() => import('./pages/stores/Stores'))
const NotFound = lazy(() => import('./pages/notFound/NotFound'))
const AddProduct = lazy(() => import('./pages/addProduct/AddProduct'))
const Staff = lazy(() => import('./pages/addStaff/Staff'))
const AddStaff = lazy(() => import('./pages/addStaff/AddStaff'))
const CreateStore = lazy(() => import('./pages/createStore/CreateStore'))
const MobileWarning = lazy(() => import('./pages/mobileWarning/MobileWarning'))
const PasswordReset = lazy(() => import('./pages/Password reset/PasswordReset'))
const PasswordConfirmation = lazy(
  () => import('./pages/Password reset/PasswordConfirmation'),
)
const AddSaleRecord = lazy(
  () => import('./pages/addSalesRecord/AddSalesRecord'),
)

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/signup',
    element: (
      <Suspense fallback={<Loader />}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: '/mobile-warning',
    element: (
      <Suspense fallback={<Loader />}>
        <MobileWarning />
      </Suspense>
    ),
  },
  {
    path: '/passwordReset',
    element: (
      <Suspense fallback={<Loader />}>
        <PasswordReset />
      </Suspense>
    ),
  },
  {
    path: '/passwordConfirmation',
    element: (
      <Suspense fallback={<Loader />}>
        <PasswordConfirmation />
      </Suspense>
    ),
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <AppLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'accounts',
        element: (
          <Suspense fallback={<Loader />}>
            <Account />
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<Loader />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: 'salesRecords',
        element: (
          <Suspense fallback={<Loader />}>
            <SalesRecord />
          </Suspense>
        ),
      },
      {
        path: 'invoice',
        element: (
          <Suspense fallback={<Loader />}>
            <Invoice />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<Loader />}>
            <Settings />
          </Suspense>
        ),
      },
      {
        path: 'stores',
        element: (
          <Suspense fallback={<Loader />}>
            <Stores />
          </Suspense>
        ),
      },
      {
        path: 'categories',
        element: (
          <Suspense fallback={<Loader />}>
            <Categories />
          </Suspense>
        ),
      },
      {
        path: 'addProduct',
        element: (
          <Suspense fallback={<Loader />}>
            <AddProduct />
          </Suspense>
        ),
      },
      {
        path: 'staff',
        element: (
          <Suspense fallback={<Loader />}>
            <Staff />
          </Suspense>
        ),
      },
      {
        path: 'addStaff',
        element: (
          <Suspense fallback={<Loader />}>
            <AddStaff />
          </Suspense>
        ),
      },
      {
        path: 'createStore',
        element: (
          <Suspense fallback={<Loader />}>
            <CreateStore />
          </Suspense>
        ),
      },
      {
        path: 'addSaleRecord',
        element: (
          <Suspense fallback={<Loader />}>
            <AddSaleRecord />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    ),
  },
])

function App() {
  const token = localStorage.getItem('token')
  if (token) {
    store.dispatch(setCredentials({ token }))
  }

 

  return (

      <RouterProvider router={router} />

  )
}

export default App
