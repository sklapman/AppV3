import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  TextField, 
  Button, 
  Typography, 
  IconButton, 
  Box,
  MenuItem 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const FinancialGoalForm = ({ onSubmit, onClose, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal_type: 'EMERGENCY',
    target_amount: '',
    current_amount: '',
    deadline: null
  });

  const GOAL_TYPES = [
    { value: 'EMERGENCY', label: 'Emergency Fund' },
    { value: 'HOME', label: 'Home Purchase' },
    { value: 'EDUCATION', label: 'Education' },
    { value: 'OTHER', label: 'Other Savings' }
  ];

  useEffect(() => {
    const defaultFormData = {
      title: '',
      description: '',
      goal_type: 'EMERGENCY',
      target_amount: '',
      current_amount: '',
      deadline: null
    };

    if (!initialData) {
      setFormData(defaultFormData);
    } else {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        goal_type: initialData.goal_type || 'EMERGENCY',
        target_amount: initialData.target_amount || '',
        current_amount: initialData.current_amount || '',
        deadline: initialData.deadline ? new Date(initialData.deadline) : null
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, deadline: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title?.trim()) {
      return alert('Title is required');
    }
    if (!formData.target_amount) {
      return alert('Target amount is required');
    }

    // Format the data
    const submitData = {
      ...formData,
      title: formData.title.trim(),
      target_amount: parseFloat(formData.target_amount),
      current_amount: formData.current_amount ? parseFloat(formData.current_amount) : 0,
      goal_type: formData.goal_type || 'EMERGENCY'
    };

    onSubmit('SAVINGS', submitData);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Financial Goal</Typography>
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="number"
              label="Target Amount"
              value={formData.target_amount}
              onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
              margin="normal"
              InputProps={{
                startAdornment: '$'
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Current Amount"
              value={formData.current_amount}
              onChange={(e) => setFormData({ ...formData, current_amount: e.target.value })}
              margin="normal"
              InputProps={{
                startAdornment: '$'
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Deadline (Optional)"
                value={formData.deadline}
                onChange={handleDateChange}
                slotProps={{ 
                  textField: { 
                    fullWidth: true, 
                    margin: "normal",
                    helperText: "Optional" 
                  } 
                }}
              />
            </LocalizationProvider>
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

export default FinancialGoalForm;
