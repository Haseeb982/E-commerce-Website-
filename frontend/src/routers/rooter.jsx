import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/home';
import CategoryPage from '../pages/category/categoryPage';
import Search from '../pages/search/search';
import ShopPage from '../pages/shop/shopPage';
import SingleProduct from '../pages/shop/productDetails/singleProduct';
import Login from '../components/login';
import Register from '../components/register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/categories/:categoryName',
        element: <CategoryPage />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/shop',
        element: <ShopPage />,
      },
      {
        path: '/shop/:id',
        element: <SingleProduct />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);

export default router;
