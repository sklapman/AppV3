import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        p: 6,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              Financial Plan App
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Empowering you to take control of your financial future through education and tools.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" href="https://linkedin.com/" target="_blank">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="primary" href="https://github.com/" target="_blank">
                <GitHubIcon />
              </IconButton>
              <IconButton color="primary" href="mailto:contact@example.com">
                <EmailIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/my-goals" color="inherit">
                Goals
              </Link>
              <Link component={RouterLink} to="/net-worth" color="inherit">
                Net Worth
              </Link>
              <Link component={RouterLink} to="/spending" color="inherit">
                Spending
              </Link>
              <Link component={RouterLink} to="/investing" color="inherit">
                Investing
              </Link>
              <Link component={RouterLink} to="/education" color="inherit">
                Education Center
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit">Help Center</Link>
              <Link href="#" color="inherit">Privacy Policy</Link>
              <Link href="#" color="inherit">Terms of Service</Link>
              <Link href="#" color="inherit">Contact Support</Link>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          © {currentYear} Financial Plan App. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
