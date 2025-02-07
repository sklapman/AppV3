import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton, 
  LinearProgress, 
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const PersonalGoalCard = ({ goal, onEdit, onDelete }) => {
  const getGoalTypeColor = (type) => {
    const colors = {
      'HEALTH': 'success',
      'CAREER': 'primary',
      'EDUCATION': 'info',
      'LIFESTYLE': 'warning',
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
          label={goal.goal_type.replace('_', ' ')}
          color={getGoalTypeColor(goal.goal_type)}
          size="small"
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle1">
          Goal Type: {goal.goal_type.replace('_', ' ').toUpperCase()}
        </Typography>

        {goal.description && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            {goal.description}
          </Typography>
        )}

        {goal.milestones && goal.milestones.length > 0 && (
          <List dense sx={{ mb: 2 }}>
            {goal.milestones.map((milestone, index) => (
              <ListItem key={index} disableGutters>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  {milestone.completed ? 
                    <CheckCircleIcon color="success" fontSize="small" /> : 
                    <RadioButtonUncheckedIcon fontSize="small" />
                  }
                </ListItemIcon>
                <ListItemText 
                  primary={milestone.title}
                  sx={{ 
                    textDecoration: milestone.completed ? 'line-through' : 'none',
                    color: milestone.completed ? 'text.secondary' : 'text.primary'
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="primary">
              Overall Progress
            </Typography>
            <Typography variant="body2" color="primary">
              {goal.progress}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={goal.progress}
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
          <Typography variant="caption" color="textSecondary" display="block">
            Deadline: {new Date(goal.deadline).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PersonalGoalCard;
