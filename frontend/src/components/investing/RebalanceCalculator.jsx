import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

function RebalanceCalculator({ currentAllocation, targetAllocation }) {
  const [amount, setAmount] = useState('');
  const [results, setResults] = useState(null);

  const calculateRebalancing = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount) return;

    const calculations = targetAllocation.map(target => ({
      asset: target.name,
      amount: (numAmount * (target.value / 100)).toFixed(2)
    }));

    setResults(calculations);
  };

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Rebalancing Calculator
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={calculateRebalancing}>
          Calculate
        </Button>
      </Box>
      
      {results && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Recommended Allocation:
          </Typography>
          {results.map((result, index) => (
            <Typography key={index}>
              {result.asset}: ${result.amount}
            </Typography>
          ))}
        </Box>
      )}
    </Paper>
  );
}

export default RebalanceCalculator;
