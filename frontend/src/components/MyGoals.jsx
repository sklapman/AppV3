import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { 
  Typography, 
  Button, 
  MenuItem,
  Grid,
  Modal,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert,
  Divider,
  TextField
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CloseIcon from '@mui/icons-material/Close';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PageHeader from './common/PageHeader';
import {
  RetirementGoalForm,
  FinancialGoalForm,
  PersonalGoalForm,
  AddGoalCard,
  FinancialGoalCard,
  PersonalGoalCard,
  DebtGoalForm,
  DebtGoalCard,
  RetirementProjection
} from './goals';
import { API_BASE_URL } from '../config/api';

const MyGoals = () => {
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [debtGoals, setDebtGoals] = useState([]);
  const [personalGoals, setPersonalGoals] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [goalType, setGoalType] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const showAlert = useCallback((message, severity = 'success') => {
    setAlert({
      open: true,
      message,
      severity
    });
  }, []);

  const mapCategoryToGoalType = (category) => {
    const mapping = {
      'EMERGENCY': 'EMERGENCY',
      'HOME': 'HOME',
      'EDUCATION': 'EDUCATION',
      'OTHER_SAVINGS': 'OTHER',
      'MORTGAGE': 'MORTGAGE',
      'STUDENT_LOAN': 'STUDENT_LOAN',
      'CAR_LOAN': 'CAR_LOAN',
      'CREDIT_CARD': 'CREDIT_CARD',
      'OTHER_DEBT': 'OTHER'
    };
    return mapping[category] || 'OTHER';
  };

  const fetchAllGoals = useCallback(async () => {
    try {
      const token = localStorage.getItem('token'); // Get JWT token
      const response = await axios.get(`${API_BASE_URL}/api/networth-items/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      const items = response.data;
      console.log('API response:', items); // Debug: Log full API response
      
      // Log each item for debugging
      items.forEach(item => {
        console.log(`Item ${item.id} => category: ${item.category}, is_liability: ${item.is_liability}, target_value: ${item.target_value}`);
      });
      
      // Filter assets: adjust filtering if target_value is null by falling back to item.value
      const assets = items.filter(item => 
        !item.is_liability &&
        ['EMERGENCY', 'HOME', 'EDUCATION', 'OTHER_SAVINGS'].includes(item.category)
      );
      
      setSavingsGoals(assets.map(asset => ({
        id: asset.id,
        title: asset.name,
        description: asset.description,
        target_amount: asset.target_value != null ? asset.target_value : asset.value,
        current_amount: Math.abs(asset.value),
        goal_type: asset.category,
        deadline: asset.target_date
      })));

      // Filter and map liabilities to debt goals
      const liabilities = items.filter(item => 
        item.is_liability && 
        ['MORTGAGE', 'STUDENT_LOAN', 'CAR_LOAN', 'CREDIT_CARD', 'OTHER_DEBT'].includes(item.category)
      );
      
      setDebtGoals(liabilities.map(liability => ({
        id: liability.id,
        title: liability.name,
        description: liability.description,
        initial_amount: Math.abs(liability.target_value || liability.value),
        current_amount: Math.abs(liability.value),
        debt_type: liability.category,
        deadline: liability.target_date,
        interest_rate: liability.interest_rate || 0
      })));

    } catch (error) {
      console.error('Error fetching items:', error);
      if (error.response?.status === 401) {
        showAlert('Please log in to view your goals', 'error');
        // Optionally redirect to login page
        // window.location.href = '/login';
      } else {
        showAlert('Error fetching items: ' + (error.response?.data?.detail || error.message), 'error');
      }
    }
  }, [showAlert]);

  useEffect(() => {
    fetchAllGoals();
  }, [fetchAllGoals]);

  const handleEdit = (goal) => {
    const goalWithParsedDate = {
      ...goal,
      deadline: goal.deadline ? new Date(goal.deadline) : null
    };
    setSelectedGoal(goalWithParsedDate);

    let type;
    if (goal.retirement_age !== undefined) type = 'RETIREMENT';
    else if (goal.debt_type !== undefined) type = 'DEBT';
    else if (goal.goal_type === 'EMERGENCY' || goal.goal_type === 'HOME' || goal.goal_type === 'EDUCATION') type = 'SAVINGS';
    else if (goal.progress !== undefined) type = 'PERSONAL';
    else if (goal.goal_type === 'OTHER') type = 'OTHER';
    setGoalType(type);

    setOpenEditModal(true);
  };

  const confirmDelete = (goal) => {
    setGoalToDelete(goal.id);
    setSelectedGoal(goal);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!goalToDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/networth-items/${goalToDelete}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      await fetchAllGoals();
      setDeleteConfirmOpen(false);
      setOpenEditModal(false);
      showAlert('Goal deleted successfully');
    } catch (error) {
      console.error('Error deleting goal:', error);
      showAlert('Error deleting goal', 'error');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGoal) return;

    try {
      const token = localStorage.getItem('token');
      let category = selectedGoal.goal_type;
      if (goalType === 'DEBT') {
        category = selectedGoal.debt_type || 'OTHER_DEBT';
      }

      const formattedGoal = {
        name: selectedGoal.title,
        description: selectedGoal.description || '',
        category: category,
        value: goalType === 'DEBT' ? 
          -Math.abs(parseFloat(selectedGoal.current_amount)) : 
          parseFloat(selectedGoal.current_amount),
        target_value: goalType === 'DEBT' ? 
          0 : 
          parseFloat(selectedGoal.target_amount),
        target_date: selectedGoal.deadline ? 
          new Date(selectedGoal.deadline).toISOString().split('T')[0] : 
          null,
        interest_rate: selectedGoal.interest_rate || null,
        is_liability: goalType === 'DEBT'
      };

      await axios.put(
        `${API_BASE_URL}/api/networth-items/${selectedGoal.id}/`, 
        formattedGoal,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      await fetchAllGoals();
      setOpenEditModal(false);
      setSelectedGoal(null);
      showAlert('Goal updated successfully');
    } catch (error) {
      console.error('Error updating goal:', error);
      showAlert(error?.response?.data?.detail || 'Error updating goal', 'error');
    }
  };

  const handleAddGoal = useCallback((type) => {
    const upperType = type.toUpperCase();
    setGoalType(upperType);
    setSelectedGoal(null);
    setOpenModal(true);
  }, []);

  const handleSubmit = useCallback(async (goalType, formData) => {
    try {
      const token = localStorage.getItem('token');
      if (!formData.title?.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.target_amount) {
        throw new Error('Target amount is required');
      }

      let category = formData.goal_type;
      if (goalType === 'DEBT') {
        category = formData.debt_type || 'OTHER_DEBT';
      }

      const processedData = {
        name: formData.title.trim(),
        description: formData.description || '',
        category: category,
        value: goalType === 'DEBT' ? 
          -Math.abs(parseFloat(formData.current_amount || 0)) : 
          parseFloat(formData.current_amount || 0),
        target_value: goalType === 'DEBT' ? 
          0 : 
          parseFloat(formData.target_amount),
        target_date: formData.deadline ? 
          new Date(formData.deadline).toISOString().split('T')[0] : 
          null,
        interest_rate: formData.interest_rate || null,
        is_liability: goalType === 'DEBT',
        excluded: false
      };

      await axios.post(
        `${API_BASE_URL}/api/networth-items/`,
        processedData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      await fetchAllGoals();
      setOpenModal(false);
      showAlert('Goal created successfully');
    } catch (error) {
      console.error('Error creating goal:', error);
      showAlert(error?.response?.data?.detail || error.message || 'Error creating goal', 'error');
    }
  }, [fetchAllGoals, showAlert]);

  const handleFormSubmit = useCallback((goalType, formData) => {
    handleSubmit(goalType, formData);
  }, [handleSubmit]);

  const renderGoalForm = useCallback(() => {
    switch(goalType) {
      case 'RETIREMENT':
        return (
          <RetirementGoalForm 
            onSubmit={(formData) => handleFormSubmit(goalType, formData)}
            onClose={() => setOpenModal(false)}
            initialData={selectedGoal}
          />
        );
      case 'SAVINGS':
      case 'OTHER':
        return (
          <FinancialGoalForm 
            onSubmit={(formData) => handleFormSubmit(goalType, formData)}
            onClose={() => setOpenModal(false)}
            initialData={selectedGoal}
          />
        );
      case 'DEBT':
        return (
          <DebtGoalForm 
            onSubmit={(formData) => handleFormSubmit('DEBT', formData)}
            onClose={() => setOpenModal(false)}
            initialData={selectedGoal}
          />
        );
      case 'PERSONAL':
        return (
          <PersonalGoalForm 
            onSubmit={(formData) => handleFormSubmit('PERSONAL', formData)}
            onClose={() => setOpenModal(false)}
            initialData={selectedGoal}
          />
        );
      default:
        return null;
    }
  }, [goalType, selectedGoal, handleFormSubmit, setOpenModal]);

  const modalStyle = useMemo(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 800,
    maxHeight: '90vh',
    overflow: 'auto',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  }), []);

  return (
    <>
      <PageHeader title="My Goals" icon={AccountBalanceIcon} />
      
      <RetirementProjection />

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountBalanceWalletIcon sx={{ mr: 2, color: 'primary.main' }} />
          Savings Goals
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AddGoalCard onClick={() => handleAddGoal('SAVINGS')} />
          </Grid>
          {savingsGoals.map(goal => (
            <Grid item xs={12} sm={6} md={4} key={goal.id}>
              <FinancialGoalCard goal={goal} onEdit={handleEdit} onDelete={confirmDelete} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <MoneyOffIcon sx={{ mr: 2, color: 'primary.main' }} />
          Debt Paydown Goals
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AddGoalCard onClick={() => handleAddGoal('DEBT')} />
          </Grid>
          {debtGoals.map(goal => (
            <Grid item xs={12} sm={6} md={4} key={goal.id}>
              <DebtGoalCard goal={goal} onEdit={handleEdit} onDelete={confirmDelete} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <EmojiEventsIcon sx={{ mr: 2, color: 'primary.main' }} />
          Personal Goals
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AddGoalCard onClick={() => handleAddGoal('PERSONAL')} />
          </Grid>
          {personalGoals.map(goal => (
            <Grid item xs={12} sm={6} md={4} key={goal.id}>
              <PersonalGoalCard goal={goal} onEdit={handleEdit} onDelete={confirmDelete} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="add-goal-modal"
      >
        <Box sx={modalStyle}>
          {renderGoalForm()}
        </Box>
      </Modal>

      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        aria-labelledby="edit-goal-modal"
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Edit Goal</Typography>
            <IconButton onClick={() => setOpenEditModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedGoal && (
            <form onSubmit={handleEditSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={selectedGoal.title}
                    onChange={(e) => setSelectedGoal({...selectedGoal, title: e.target.value})}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Goal Type"
                    name="goal_type"
                    value={selectedGoal.goal_type}
                    onChange={(e) => setSelectedGoal({...selectedGoal, goal_type: e.target.value})}
                    margin="normal"
                  >
                    <MenuItem value="EMERGENCY">Emergency Fund</MenuItem>
                    <MenuItem value="HOME">Home Purchase</MenuItem>
                    <MenuItem value="EDUCATION">Education</MenuItem>
                    <MenuItem value="OTHER">Other Savings</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    name="description"
                    value={selectedGoal.description}
                    onChange={(e) => setSelectedGoal({...selectedGoal, description: e.target.value})}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Target Amount"
                    name="target_amount"
                    value={selectedGoal.target_amount}
                    onChange={(e) => setSelectedGoal({...selectedGoal, target_amount: e.target.value})}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Current Amount"
                    name="current_amount"
                    value={selectedGoal.current_amount}
                    onChange={(e) => setSelectedGoal({...selectedGoal, current_amount: e.target.value})}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Deadline"
                      value={selectedGoal.deadline}
                      onChange={(date) => setSelectedGoal({...selectedGoal, deadline: date})}
                      slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
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
                      Save Changes
                    </Button>
                    <Button 
                      type="button"
                      variant="outlined"
                      color="error"
                      onClick={() => confirmDelete(selectedGoal)}
                    >
                      Delete Goal
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
        </Box>
      </Modal>

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Financial Goal?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Are you sure you want to delete this goal?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteConfirmOpen(false)} 
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirmed} 
            color="error"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={alert.open} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MyGoals;
