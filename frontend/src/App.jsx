import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, CssBaseline, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Homepage from './components/Homepage';
import MyGoals from './components/MyGoals';
import Spending from './components/Spending';
import Investing from './components/Investing';
import Education from './components/Education';
import NetWorth from './components/NetWorth';
import Register from './pages/Register';
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
  const navItems = [
    { name: 'Net Worth', path: '/net-worth', icon: '💰' },
    { name: 'Goals', path: '/my-goals', icon: '🎯' },
    { name: 'Spending', path: '/spending', icon: '💸' },
    { name: 'Investing', path: '/investing', icon: '📈' }
  ];

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
          <AppBar position="fixed">
            <Container maxWidth="lg">
              <Toolbar sx={{ height: 72, justifyContent: 'space-between', px: 8 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Link to="/">
                    <img src={logo} alt="Logo" style={{ height: '48px', marginRight: '2rem' }} />
                  </Link>
                  <Box sx={{ display: 'flex', gap: '2rem' }}>
                    {navItems.map((item) => (
                      <Button
                        key={item.name}
                        component={Link}
                        to={item.path}
                        color="inherit"
                        sx={{
                          fontSize: '1.2rem',
                          fontWeight: 500,
                          '&:hover span': {
                            filter: 'none !important',
                          },
                        }}
                      >
                        <span style={{ filter: 'grayscale(100%)', transition: 'filter 0.3s ease', marginRight: '0.5rem' }}>{item.icon}</span> {item.name}
                      </Button>
                    ))}
                  </Box>
                </Box>
                <Button
                  component={Link}
                  to="/education"
                  variant="contained"
                  sx={{
                    background: '#d8654f',
                    color: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    '&:hover': {
                      background: '#c84b31',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  Education Center
                </Button>
              </Toolbar>
            </Container>
          </AppBar>
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
