import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home'
import ProductPage from './pages/Product';
import RootLayout from './components/RootLayout';
import ErrorPage from './pages/ErrorPage';
import ProductDetail from './components/ProductDetail';
// createBrowserRouter와 BrowserRouter의 차이

const router = createBrowserRouter([
  {path: '/', 
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  children: [
    {index: true, element: <HomePage />},
    {path: 'product', element: <ProductPage />},
    {path: 'product/:id',element: <ProductDetail />}
  ]},
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
