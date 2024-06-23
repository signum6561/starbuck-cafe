import { MenuBarProvider } from '@context/MenuBarContext';
import AuthLayout from '@layout/AuthLayout';
import DefaultLayout from '@layout/DefaultLayout';
import Login from '@pages/Auth/Login';
import Register from '@pages/Auth/Register';
import CustomerDetail from '@pages/CustomerDetail';
import CustomerEdit from '@pages/CustomerEdit';
import CustomerNew from '@pages/CustomerNew';
import Customers from '@pages/Customers';
import Dashboard from '@pages/Dashboard';
import InDevelop from '@pages/InDevelop';
import NotFound from '@pages/NotFound';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <AuthLayout isPublic>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthLayout isPublic>
        <Register />
      </AuthLayout>
    ),
  },
  {
    path: '',
    element: (
      <AuthLayout>
        <MenuBarProvider>
          <DefaultLayout />
        </MenuBarProvider>
      </AuthLayout>
    ),
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/customers',
        element: <Customers />,
      },
      {
        path: '/customers/:id/detail',
        element: <CustomerDetail />,
      },
      {
        path: '/customers/:id/edit',
        element: <CustomerEdit />,
      },
      {
        path: '/customers/new',
        element: <CustomerNew />,
      },
      {
        path: '/invoices',
        element: <InDevelop />,
      },
      {
        path: '/products',
        element: <InDevelop />,
      },
      {
        path: '/catagories',
        element: <InDevelop />,
      },
      {
        path: '/coupons',
        element: <InDevelop />,
      },
      {
        path: '/staff',
        element: <InDevelop />,
      },
      {
        path: '/department',
        element: <InDevelop />,
      },
      {
        path: '/settings',
        element: <InDevelop />,
      },
      {
        path: '/about',
        element: <InDevelop />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
