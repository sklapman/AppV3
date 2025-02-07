import React from 'react';
import { Paper, Box, Grid } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PageHeader from './common/PageHeader';
import AssetAllocationChart from './investing/AssetAllocationChart';
import RebalanceCalculator from './investing/RebalanceCalculator';

function Investing() {
  const currentAllocation = [
    { name: 'Stocks', value: 65 },
    { name: 'Bonds', value: 25 },
    { name: 'Cash', value: 10 }
  ];

  const targetAllocation = [
    { name: 'Stocks', value: 70 },
    { name: 'Bonds', value: 25 },
    { name: 'Cash', value: 5 }
  ];

  return (
    <>
      <PageHeader title="Investment Strategy" icon={TrendingUpIcon} />
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <AssetAllocationChart data={currentAllocation} title="Current Allocation" />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <AssetAllocationChart data={targetAllocation} title="Target Allocation" />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <RebalanceCalculator 
              currentAllocation={currentAllocation}
              targetAllocation={targetAllocation}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Investing;