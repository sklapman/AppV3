import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, CssBaseline, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Homepage from './components/Homepage';
import MyGoals from './components/MyGoals';
import Spending from './components/Spending';
import Investing from './components/Investing';
import Education from './components/Education';
import NetWorth from './components/NetWorth';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import logo from './logo.png';

const theme = createTheme({
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            minHeight: '100vh',
            backgroundColor: 'background.default',
            backgroundImage: 'url("/path/to/your-texture.png")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            paddingTop: '72px'
          }}
        >
          <Navbar />
          <Container style={{ marginTop: '2rem' }}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/education" element={<Education />} />
              <Route path="/my-goals" element={<MyGoals />} />
              <Route path="/spending" element={<Spending />} />
              <Route path="/investing" element={<Investing />} />
              <Route path="/net-worth" element={<NetWorth />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
