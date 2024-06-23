import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@redux/store.js';
import GlobalStyles from './styles/GlobalStyles.jsx';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routes/index.jsx';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme.js';
import AuthProvider from '@context/AuthContext.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Provider store={store}>
            <RouterProvider router={router} />
            <ToastContainer position='bottom-right' />
          </Provider>
        </AuthProvider>
      </ThemeProvider>
    </GlobalStyles>
  </React.StrictMode>,
);
