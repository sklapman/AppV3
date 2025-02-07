import React, { useState } from 'react';
import { Typography, Paper, Box, Grid, Divider } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PageHeader from './common/PageHeader';
import AddItemForm from './networth/AddItemForm';
import NetWorthItem from './networth/NetWorthItem';
import NetWorthGraph from './networth/NetWorthGraph';

function NetWorth() {
  const [items, setItems] = useState([]);

  const handleAddItem = (newItem) => {
    setItems([...items, { ...newItem, id: Date.now() }]);
  };

  const handleToggleExclude = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, excluded: !item.excluded } : item
    ));
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateNetWorth = () => {
    const included = items.filter(item => !item.excluded);
    const totalAssets = included
      .filter(item => item.type === 'assets')
      .reduce((sum, item) => sum + item.value, 0);
    const totalLiabilities = included
      .filter(item => item.type === 'liabilities')
      .reduce((sum, item) => sum + item.value, 0);
    return totalAssets - totalLiabilities;
  };

  return (
    <>
      <PageHeader title="Net Worth" icon={AccountBalanceIcon} />
      <Box sx={{ mt: 3 }}>
        <NetWorthGraph items={items} />
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Total Net Worth: ${calculateNetWorth().toLocaleString()}
          </Typography>
        </Paper>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AttachMoneyIcon sx={{ mr: 1 }} />
            <Typography variant="h5" gutterBottom>
              Assets
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <AddItemForm type="assets" onAdd={handleAddItem} />
          <Grid container spacing={2}>
            {items
              .filter(item => item.type === 'assets')
              .map(item => (
                <Grid item xs={12} key={item.id}>
                  <NetWorthItem
                    item={item}
                    onToggleExclude={handleToggleExclude}
                    onDelete={handleDeleteItem}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <MoneyOffIcon sx={{ mr: 1 }} />
            <Typography variant="h5" gutterBottom>
              Liabilities
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <AddItemForm type="liabilities" onAdd={handleAddItem} />
          <Grid container spacing={2}>
            {items
              .filter(item => item.type === 'liabilities')
              .map(item => (
                <Grid item xs={12} key={item.id}>
                  <NetWorthItem
                    item={item}
                    onToggleExclude={handleToggleExclude}
                    onDelete={handleDeleteItem}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default NetWorth;