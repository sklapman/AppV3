import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PageHeader from './common/PageHeader';

function Spending() {
  return (
    <>
      <PageHeader title="Spending Plan" icon={AttachMoneyIcon} />
      <Box
        component={Paper}
        sx={{
          p: 4,
          borderRadius: 3,
          background: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          '& > *:not(:last-child)': {
            mb: 3
          }
        }}
      >
        <Typography variant="h4" gutterBottom>
          Spending
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create a peaceful path for managing your expenses.
        </Typography>
      </Box>
    </>
  );
}

export default Spending;