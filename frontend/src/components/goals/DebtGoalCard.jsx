import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, LinearProgress, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

const DebtGoalCard = ({ goal, onEdit, onDelete }) => {
  const calculateProgress = (initial, current) => {
    return ((initial - current) / initial) * 100;
  };

  const getDebtTypeColor = (type) => {
    const colors = {
      'CREDIT_CARD': 'error',
      'STUDENT_LOAN': 'warning',
      'MORTGAGE': 'info',
      'CAR_LOAN': 'success',
      'OTHER': 'default'
    };
    return colors[type] || 'default';
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
        
        <Chip 
          icon={<MoneyOffIcon />}
          label={goal.debt_type.replace('_', ' ')}
          color={getDebtTypeColor(goal.debt_type)}
          size="small"
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle1">
          Debt Type: {goal.debt_type.replace('_', ' ').toUpperCase()}
        </Typography>

        {goal.description && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            {goal.description}
          </Typography>
        )}

        <Box sx={{ mt: 'auto' }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Interest Rate: {goal.interest_rate}%
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="primary">
              Paid Off
            </Typography>
            <Typography variant="body2" color="primary">
              {Math.round(calculateProgress(goal.initial_amount, goal.current_amount))}%
            </Typography>
          </Box>
          
          <LinearProgress 
            variant="determinate" 
            value={calculateProgress(goal.initial_amount, goal.current_amount)}
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
            ${goal.current_amount.toLocaleString()} / ${goal.initial_amount.toLocaleString()}
          </Typography>
          
          <Typography variant="caption" color="textSecondary" display="block">
            Target Payoff: {new Date(goal.deadline).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DebtGoalCard;
