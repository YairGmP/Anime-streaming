import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Crear un tema personalizado
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#556cd6', // Color principal
    },
    secondary: {
      main: '#19857b', // Color secundario
    },
    error: {
      main: red.A400, // Color de error
    },
    background: {
      default: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
      paper: '#fff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          height: '100vh',
          background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        },
      },
    },
  },
});

export default theme;
