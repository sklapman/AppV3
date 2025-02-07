import React from 'react';
import { Card, CardActionArea, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddGoalCard = ({ onClick }) => (
  <Card 
    sx={{ 
      height: '100%', 
      minHeight: 200,
      display: 'flex',
      cursor: 'pointer',
      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
    }}
  >
    <CardActionArea 
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        p: 3
      }}
    >
      <AddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
      <Typography variant="h6" color="primary">
        Add New Goal
      </Typography>
    </CardActionArea>
  </Card>
);

export default AddGoalCard;
