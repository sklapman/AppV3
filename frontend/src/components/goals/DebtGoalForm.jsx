import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography, IconButton, Box, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const DebtGoalForm = ({ onSubmit, onClose, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    debt_type: 'CREDIT_CARD',
    target_amount: '',
    current_amount: '',
    interest_rate: '',
    minimum_payment: '',
    deadline: null
  });

  useEffect(() => {
    const defaultFormData = {
      title: '',
      description: '',
      debt_type: 'CREDIT_CARD',
      target_amount: '',
      current_amount: '',
      interest_rate: '',
      minimum_payment: '',
      deadline: null
    };

    if (!initialData) {
      setFormData(defaultFormData);
    } else {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        debt_type: initialData.debt_type || 'CREDIT_CARD',
        target_amount: initialData.target_amount || '',
        current_amount: initialData.current_amount || '',
        interest_rate: initialData.interest_rate || '',
        minimum_payment: initialData.minimum_payment || '',
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
    onSubmit('debt', formData);
  };

  const DEBT_TYPES = [
    { value: 'CREDIT_CARD', label: 'Credit Card' },
    { value: 'STUDENT_LOAN', label: 'Student Loan' },
    { value: 'MORTGAGE', label: 'Mortgage' },
    { value: 'CAR_LOAN', label: 'Car Loan' },
    { value: 'OTHER', label: 'Other Debt' }
  ];

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Debt Paydown Goal</Typography>
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
              label="Debt Type"
              name="debt_type"
              value={formData.debt_type}
              onChange={handleChange}
              margin="normal"
            >
              {DEBT_TYPES.map((option) => (
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
              InputProps={{ startAdornment: '$' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="number"
              label="Current Amount"
              value={formData.current_amount}
              onChange={(e) => setFormData({ ...formData, current_amount: e.target.value })}
              margin="normal"
              InputProps={{ startAdornment: '$' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="number"
              label="Interest Rate"
              value={formData.interest_rate}
              onChange={(e) => setFormData({ ...formData, interest_rate: e.target.value })}
              margin="normal"
              InputProps={{ endAdornment: '%' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="number"
              label="Minimum Payment"
              value={formData.minimum_payment}
              onChange={(e) => setFormData({ ...formData, minimum_payment: e.target.value })}
              margin="normal"
              InputProps={{ startAdornment: '$' }}
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

export default DebtGoalForm;
