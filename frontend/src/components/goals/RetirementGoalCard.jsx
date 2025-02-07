import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, LinearProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SavingsIcon from '@mui/icons-material/Savings';

const RetirementGoalCard = ({ goal, onEdit, onDelete }) => {
  const calculateProgress = (current, target) => {
    return (current / target) * 100;
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">{goal.title}</Typography>
          <Box>
            <IconButton onClick={() => onEdit(goal)} size="small">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(goal)} size="small" color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SavingsIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="subtitle2" color="primary">
            Target Retirement Age: {goal.retirement_age}
          </Typography>
        </Box>

        {goal.description && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            {goal.description}
          </Typography>
        )}

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Annual Contribution: ${goal.annual_contribution?.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Expected Return: {goal.expected_return_rate}%
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="primary">
              Progress
            </Typography>
            <Typography variant="body2" color="primary">
              {Math.round(calculateProgress(goal.current_amount, goal.target_amount))}%
            </Typography>
          </Box>
          
          <LinearProgress 
            variant="determinate" 
            value={calculateProgress(goal.current_amount, goal.target_amount)}
            sx={{ 
              height: 8, 
              borderRadius: 4,
              mb: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
              }
            }}
          />
          
          <Typography variant="h6" color="primary" gutterBottom>
            ${goal.current_amount?.toLocaleString()} / ${goal.target_amount?.toLocaleString()}
          </Typography>
          
          <Typography variant="caption" color="textSecondary" display="block">
            Target Date: {new Date(goal.deadline).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RetirementGoalCard;
