import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // Switch to 'dark' for dark mode support
    primary: {
      main: '#1976d2', // Adjust primary color
    },
    secondary: {
      main: '#ff4081', // Adjust secondary color
    },
    background: {
      default: '#f4f6f8', // Background color for the app
      paper: '#ffffff', // Background color for components
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 500 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    button: { textTransform: 'none' },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 'lg',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded buttons
          textTransform: 'none', // No uppercase text
        },
      },
    },
  },
});

export default theme;