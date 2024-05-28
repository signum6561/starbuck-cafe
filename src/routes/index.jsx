import { MenuBarProvider } from '@context/MenuBarContext';
import DefaultLayout from '@layout/DefaultLayout';
import Login from '@pages/Auth/Login';
import Register from '@pages/Auth/Register';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: (
      <MenuBarProvider defaultValue={false}>
        <DefaultLayout />
      </MenuBarProvider>
    ),
    children: [
      {
        path: '/dashboard',
        element: <h1>Dashboard</h1>,
      },
      {
        path: '/customers',
        element: <h1>Customer</h1>,
      },
      {
        path: '/invoices',
        element: <h1>Invoices</h1>,
      },
    ],
  },
]);
