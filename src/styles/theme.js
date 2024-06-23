import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#016343',
    },
    secondary: {
      main: '#1e3932',
    },
    green: {
      main: '#97d8b1',
    },
    contrast: {
      main: '#fff',
    },
    red: {
      main: '#e84338',
      contrastText: '#fff',
    },
  },
  typography: {
    htmlFontSize: 10,
  },
});
