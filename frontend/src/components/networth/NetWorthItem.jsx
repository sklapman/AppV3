import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const NetWorthItem = ({ item, onToggleExclude, onDelete, onEdit }) => {
  return (
    <Card variant="outlined" sx={{ opacity: item.excluded ? 0.5 : 1 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
        <Box>
          <Typography variant="subtitle1">{item.name}</Typography>
          <Typography variant="caption" color="textSecondary">
            {item.category || 'Uncategorized'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            ${item.value.toLocaleString()}
          </Typography>
          <IconButton size="small" onClick={() => onEdit(item)} sx={{ mr: 1 }}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => onToggleExclude(item.id)} sx={{ mr: 1 }}>
            {item.excluded ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(item.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NetWorthItem;
