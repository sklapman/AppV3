import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Paper } from '@mui/material';

const categories = {
  assets: ['Cash', 'Real Estate', 'Stocks - US', 'Stocks - International', 'Bonds', 'Crypto', 'Other Assets'],
  liabilities: ['Credit Cards', 'Loans', 'Mortgage', 'Other Debts']
};

function AddItemForm({ type, onAdd }) {
  const [item, setItem] = useState({ name: '', value: '', category: '', excluded: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...item, value: parseFloat(item.value), type });
    setItem({ name: '', value: '', category: '', excluded: false });
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            required
            size="small"
            fullWidth
          />
          <TextField
            label="Value"
            type="number"
            value={item.value}
            onChange={(e) => setItem({ ...item, value: e.target.value })}
            required
            size="small"
            fullWidth
          />
          <TextField
            select
            label="Category"
            value={item.category}
            onChange={(e) => setItem({ ...item, category: e.target.value })}
            required
            size="small"
            fullWidth
          >
            {categories[type].map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" fullWidth>
            Add {type === 'assets' ? 'Asset' : 'Liability'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default AddItemForm;
