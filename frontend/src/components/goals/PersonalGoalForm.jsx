import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  TextField, 
  Button, 
  Typography, 
  IconButton, 
  Box,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const PersonalGoalForm = ({ onSubmit, onClose, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal_type: 'PERSONAL',
    target_amount: '',
    current_amount: '',
    progress: 0,
    milestones: []
  });
  const [newMilestone, setNewMilestone] = useState('');

  const GOAL_TYPES = [
    { value: 'PERSONAL', label: 'Personal Goal' },
    { value: 'FITNESS', label: 'Fitness Goal' },
    { value: 'CAREER', label: 'Career Goal' },
    { value: 'OTHER', label: 'Other' }
  ];

  useEffect(() => {
    const defaultFormData = {
      title: '',
      description: '',
      goal_type: 'PERSONAL',
      target_amount: '',
      current_amount: '',
      progress: 0,
      milestones: []
    };

    if (!initialData) {
      setFormData(defaultFormData);
    } else {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        goal_type: initialData.goal_type || 'PERSONAL',
        target_amount: initialData.target_amount || '',
        current_amount: initialData.current_amount || '',
        progress: initialData.progress || 0,
        milestones: initialData.milestones || []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddMilestone = () => {
    if (newMilestone.trim()) {
      setFormData(prev => ({
        ...prev,
        milestones: [...prev.milestones, { title: newMilestone, completed: false }]
      }));
      setNewMilestone('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit('PERSONAL', formData);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Personal Goal</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              required
              label="Goal Type"
              name="goal_type"
              value={formData.goal_type}
              onChange={handleChange}
              margin="normal"
            >
              {GOAL_TYPES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* Add other personal-specific fields */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Milestones
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                label="Add Milestone"
                value={newMilestone}
                onChange={(e) => setNewMilestone(e.target.value)}
              />
              <Button
                onClick={handleAddMilestone}
                variant="outlined"
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            </Box>
            <List>
              {formData.milestones.map((milestone, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Checkbox
                      checked={milestone.completed}
                      onChange={() => {
                        const newMilestones = [...formData.milestones];
                        newMilestones[index].completed = !newMilestones[index].completed;
                        setFormData({ ...formData, milestones: newMilestones });
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={milestone.title} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => {
                        const newMilestones = formData.milestones.filter((_, i) => i !== index);
                        setFormData({ ...formData, milestones: newMilestones });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
              >
                {initialData ? 'Update Goal' : 'Create Goal'}
              </Button>
              <Button 
                type="button"
                variant="outlined"
                onClick={onClose}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default PersonalGoalForm;
