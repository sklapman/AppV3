import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const RetirementGoalForm = ({ onSubmit, onClose, initialData = null }) => {
  const defaultFormData = {
    title: '',
    description: '',
    retirement_age: '',
    target_amount: '',
    current_amount: '',
    initial_amount: '',
    annual_contribution: '',
    expected_return_rate: '',
    deadline: null
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    const defaultFormData = {
      title: '',
      description: '',
      goal_type: 'RETIREMENT',
      target_amount: '',
      current_amount: '',
      retirement_age: '',
      deadline: null
    };

    if (!initialData) {
      setFormData(defaultFormData);
    } else {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        goal_type: initialData.goal_type || 'RETIREMENT',
        target_amount: initialData.target_amount || '',
        current_amount: initialData.current_amount || '',
        retirement_age: initialData.retirement_age || '',
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
    onSubmit('retirement', formData);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Retirement Goal</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="number"
              label="Target Amount"
              name="target_amount"
              value={formData.target_amount}
              onChange={handleChange}
              margin="normal"
              InputProps={{ startAdornment: '$' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="number"
              label="Current Amount"
              name="current_amount"
              value={formData.current_amount}
              onChange={handleChange}
              margin="normal"
              InputProps={{ startAdornment: '$' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="number"
              label="Retirement Age"
              name="retirement_age"
              value={formData.retirement_age}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="number"
              label="Annual Contribution"
              name="annual_contribution"
              value={formData.annual_contribution}
              onChange={handleChange}
              margin="normal"
              InputProps={{ startAdornment: '$' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="number"
              label="Expected Return Rate"
              name="expected_return_rate"
              value={formData.expected_return_rate}
              onChange={handleChange}
              margin="normal"
              InputProps={{ endAdornment: '%' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Deadline"
                value={formData.deadline}
                onChange={handleDateChange}
                slotProps={{ textField: { fullWidth: true, margin: "normal", required: true } }}
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

export default RetirementGoalForm;
