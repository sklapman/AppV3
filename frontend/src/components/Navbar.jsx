import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import logo from '../logo.png';

const Navbar = () => {
  const navItems = [
    { name: 'Net Worth', path: '/net-worth', icon: '💰' },
    { name: 'Goals', path: '/my-goals', icon: '🎯' },
    { name: 'Spending', path: '/spending', icon: '💸' },
    { name: 'Investing', path: '/investing', icon: '📈' }
  ];

  return (
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
  );
};

export default Navbar;