import React from 'react';
import { Paper, Typography, Switch, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function NetWorthItem({ item, onToggleExclude, onDelete }) {
  return (
    <Paper sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="subtitle1">{item.name}</Typography>
        <Typography variant="body2" color="text.secondary">{item.category}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6">${item.value.toLocaleString()}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Exclude</Typography>
          <Switch
            checked={item.excluded}
            onChange={() => onToggleExclude(item.id)}
            size="small"
          />
        </Box>
        <IconButton onClick={() => onDelete(item.id)} size="small">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default NetWorthItem;
