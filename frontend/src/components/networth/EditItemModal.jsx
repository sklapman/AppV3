import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';

const EditItemModal = ({ open, onClose, onEdit, item }) => {
  const [editedItem, setEditedItem] = useState({
    name: '',
    value: 0,
    type: 'assets',
    category: '',
  });

  useEffect(() => {
    if (item) {
      setEditedItem({
        name: item.name,
        value: item.value,
        type: item.type,
        category: item.category || '',
      });
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({ ...item, ...editedItem });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit {editedItem.type === 'assets' ? 'Asset' : 'Liability'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="Name"
            value={editedItem.name}
            onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Value"
            type="number"
            value={editedItem.value}
            onChange={(e) => setEditedItem({ ...editedItem, value: parseFloat(e.target.value) || 0 })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Category"
            value={editedItem.category}
            onChange={(e) => setEditedItem({ ...editedItem, category: e.target.value })}
            fullWidth
            margin="normal"
          >
            {editedItem.type === 'assets' ? (
              [
                <MenuItem value="Cash">Cash</MenuItem>,
                <MenuItem value="Investments">Investments</MenuItem>,
                <MenuItem value="Property">Property</MenuItem>,
                <MenuItem value="Vehicles">Vehicles</MenuItem>,
                <MenuItem value="Other">Other</MenuItem>
              ]
            ) : (
              [
                <MenuItem value="Credit Cards">Credit Cards</MenuItem>,
                <MenuItem value="Loans">Loans</MenuItem>,
                <MenuItem value="Mortgage">Mortgage</MenuItem>,
                <MenuItem value="Other">Other</MenuItem>
              ]
            )}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditItemModal;
