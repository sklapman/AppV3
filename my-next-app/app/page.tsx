import { Typography, Box, Button, Grid, Paper } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Written Financial Plan
      </Typography>
      
      <Typography variant="h5" color="text.secondary" paragraph>
        Your personal financial planning assistant that helps you make informed decisions about your money.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Set Your Goals
            </Typography>
            <Typography paragraph>
              Define your financial objectives and create a roadmap to achieve them.
            </Typography>
            <Link href="/my-goals" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
                Get Started
              </Button>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Track Your Net Worth
            </Typography>
            <Typography paragraph>
              Monitor your assets and liabilities to understand your financial position.
            </Typography>
            <Link href="/net-worth" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
                View Net Worth
              </Button>
            </Link>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Learn More
            </Typography>
            <Typography paragraph>
              Access educational resources to improve your financial literacy.
            </Typography>
            <Link href="/education" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
                Start Learning
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
