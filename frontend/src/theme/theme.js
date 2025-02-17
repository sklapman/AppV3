import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#d8654f',
      light: '#f29465',
      dark: '#c84b31'
    },
    secondary: {
      main: '#ff9f61',
      light: '#ffb58a',
      dark: '#e3864c'
    },
    background: {
      default: '#fdfbf9',
      paper: '#ffffff'
    },
    text: {
      primary: '#2d3436',
      secondary: '#636e72'
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica Neue", Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: 'rgba(0, 58, 112, 0.9)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
          borderBottom: '1px solid rgba(224, 224, 224, 0.9)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 24px',
          fontSize: '1.2rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          borderRadius: 8,
        },
      },
    },
  },
});
