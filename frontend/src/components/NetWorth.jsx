import React, { useState } from 'react';
import { Typography, Paper, Box, Grid, Divider, Zoom, Button, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from './common/PageHeader';
import NetWorthItem from './networth/NetWorthItem';
import NetWorthGraph from './networth/NetWorthGraph';
import OCRUpload from './networth/OCRUpload';
import AddItemModal from './networth/AddItemModal';
import { defaultNetWorthData } from '../data/defaultNetWorthData';
import { netWorth as netWorthEdu } from '../data/edu_netWorth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import EditItemModal from './networth/EditItemModal';

function NetWorth() {
  const [items, setItems] = useState(defaultNetWorthData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEduExpanded, setIsEduExpanded] = useState(true);
  const [addingType, setAddingType] = useState('assets'); // Add this new state
  const [editingItem, setEditingItem] = useState(null);

  const handleOpenAddModal = (type) => {
    setAddingType(type);
    setIsAddModalOpen(true);
  };

  const handleAddItem = (newItem) => {
    // Ensure new items are by default included on Goals Page
    setItems([...items, { ...newItem, id: Date.now(), includeOnGoals: true }]);
  };

  const handleToggleExclude = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, excluded: !item.excluded } : item
    ));
  };

  const handleToggleIncludeOnGoals = (id) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, includeOnGoals: !item.includeOnGoals }
        : item
    ));
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleSaveEdit = (editedItem) => {
    setItems(items.map(item => 
      item.id === editedItem.id ? editedItem : item
    ));
    setEditingItem(null);
  };

  const calculateNetWorth = () => {
    const included = items.filter(item => !item.excluded);
    const totalAssets = included
      .filter(item => item.type === 'assets')
      .reduce((sum, item) => sum + item.value, 0);
    const totalLiabilities = included
      .filter(item => item.type === 'liabilities')
      .reduce((sum, item) => sum + item.value, 0);
    return totalAssets - totalLiabilities;
  };

  const calculateTotals = () => {
    const included = items.filter(item => !item.excluded);
    const totalAssets = included
      .filter(item => item.type === 'assets')
      .reduce((sum, item) => sum + item.value, 0);
    const totalLiabilities = included
      .filter(item => item.type === 'liabilities')
      .reduce((sum, item) => sum + item.value, 0);
    return { totalAssets, totalLiabilities };
  };

  return (
    <>
      <PageHeader title="Net Worth" icon={AccountBalanceIcon} />
      
      {/* Educational Content */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2,
            cursor: 'pointer',
            '&:hover': { opacity: 0.8 }
          }}
          onClick={() => setIsEduExpanded(!isEduExpanded)}
        >
          <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" color="primary.main" sx={{ flexGrow: 1 }}>
            Understanding Net Worth
          </Typography>
          {isEduExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
        
        <Collapse in={isEduExpanded}>
          <Typography variant="body1" paragraph>
            {netWorthEdu.description}
          </Typography>
          <Button
            component={Link}
            to="/education"
            state={{ initialSection: "Net Worth" }}
            variant="outlined"
            color="primary"
            sx={{ mt: 1 }}
          >
            Learn More in Education Center
          </Button>
        </Collapse>
      </Paper>

      {/* Graph and Summary Section */}
      <Box sx={{ mb: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <NetWorthGraph items={items} />
          <Divider sx={{ my: 3 }} />
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography variant="h4" align="center" gutterBottom>
                Net Worth: ${calculateNetWorth().toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" align="center" gutterBottom color="success.main">
                  Total Assets
                </Typography>
                <Typography variant="h5" align="center" color="success.main">
                  ${calculateTotals().totalAssets.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" align="center" gutterBottom color="error.main">
                  Total Liabilities
                </Typography>
                <Typography variant="h5" align="center" color="error.main">
                  ${calculateTotals().totalLiabilities.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Items List Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AttachMoneyIcon sx={{ mr: 1 }} color="success" />
              <Typography variant="h6">Assets</Typography>
            </Box>
            <Grid container spacing={2}>
              {items
                .filter(item => item.type === 'assets')
                .map(item => (
                  <Grid item xs={12} key={item.id}>
                    <NetWorthItem
                      item={item}
                      onToggleExclude={handleToggleExclude}
                      onDelete={handleDeleteItem}
                      onEdit={handleEditItem}
                      onToggleIncludeOnGoals={handleToggleIncludeOnGoals}
                    />
                  </Grid>
                ))}
            </Grid>
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={() => handleOpenAddModal('assets')}
              fullWidth
              sx={{
                mt: 2,
                borderRadius: 2,
                padding: '12px 24px',
                textTransform: 'none'
              }}
            >
              Add New Asset
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MoneyOffIcon sx={{ mr: 1 }} color="error" />
              <Typography variant="h6">Liabilities</Typography>
            </Box>
            <Grid container spacing={2}>
              {items
                .filter(item => item.type === 'liabilities')
                .map(item => (
                  <Grid item xs={12} key={item.id}>
                    <NetWorthItem
                      item={item}
                      onToggleExclude={handleToggleExclude}
                      onDelete={handleDeleteItem}
                      onEdit={handleEditItem}
                      onToggleIncludeOnGoals={handleToggleIncludeOnGoals}
                    />
                  </Grid>
                ))}
            </Grid>
            <Button
              variant="contained"
              color="error"
              startIcon={<AddIcon />}
              onClick={() => handleOpenAddModal('liabilities')}
              fullWidth
              sx={{
                mt: 2,
                borderRadius: 2,
                padding: '12px 24px',
                textTransform: 'none'
              }}
            >
              Add New Liability
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Information Box */}
      <Box sx={{ mt: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            background: 'linear-gradient(135deg, rgba(94, 53, 177, 0.1) 0%, rgba(26, 35, 126, 0.1) 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(94, 53, 177, 0.2)'
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, color: '#1a237e' }}>
            Getting Started with Net Worth Tracking
          </Typography>
          <Typography variant="body1" paragraph>
            Your net worth is the total value of your assets (what you own) minus your liabilities (what you owe). 
            It's a key indicator of your financial health and helps you track your progress over time.
          </Typography>
          <Typography variant="body1" paragraph>
            To get started:
          </Typography>
          <Box component="ul" sx={{ ml: 2 }}>
            <Typography component="li" variant="body1" paragraph>
              Delete the example items shown above by clicking the trash icon
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Add your own assets (homes, vehicles, investments, savings) and liabilities (mortgages, loans, credit cards)
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Use either the manual entry or screenshot upload feature to add your items
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Check back regularly to update values and track your progress
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Add Item Modal */}
      <AddItemModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddItem}
        initialType={addingType}
      />

      {/* Edit Item Modal */}
      <EditItemModal
        open={Boolean(editingItem)}
        onClose={() => setEditingItem(null)}
        onEdit={handleSaveEdit}
        item={editingItem}
      />
    </>
  );
}

export default NetWorth;