import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@redux/store.jsx';
import GlobalStyles from './styles/GlobalStyles.jsx';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routes/index.jsx';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </GlobalStyles>
  </React.StrictMode>,
);
