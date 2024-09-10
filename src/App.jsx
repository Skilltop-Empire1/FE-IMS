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

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: 'signup', element: <Signup /> },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'accounts', element: <Account /> },
      { path: 'products', element: <Products /> },
      { path: 'salesRecord', element: <SalesRecord /> },
      { path: 'settings', element: <Settings /> },
      { path: 'stores', element: <Stores /> },
      { path: 'categories', element: <Categories /> },
      { path: 'addProduct', element: <AddProduct /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
