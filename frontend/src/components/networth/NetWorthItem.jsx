import React from 'react';
import { Card, CardContent, Typography, IconButton, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const NetWorthItem = ({ item, onToggleExclude, onDelete, onEdit, onToggleIncludeOnGoals }) => {
  return (
    <Card variant="outlined" sx={{ opacity: item.excluded ? 0.5 : 1 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', py: 1 }}>
        <Box>
          <Typography variant="subtitle1">{item.name}</Typography>
          <Typography variant="caption" color="textSecondary">
            {item.category || 'Uncategorized'}
          </Typography>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              size="small" 
              onClick={() => onToggleIncludeOnGoals(item.id)}
              color={item.includeOnGoals === false ? 'default' : 'primary'}
              startIcon={item.includeOnGoals === false ? <BookmarkBorderIcon /> : <BookmarkIcon />}
              sx={{ fontSize: '0.75rem' }}
            >
              Include in Goals
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NetWorthItem;
