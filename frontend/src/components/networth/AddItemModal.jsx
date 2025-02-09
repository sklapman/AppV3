import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Tabs,
  Tab,
  Box,
  IconButton,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OCRUpload from './OCRUpload';
import AddItemForm from './AddItemForm';

function AddItemModal({ open, onClose, onAdd }) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Choose Entry Method', 'Enter Details'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleClose = () => {
    setActiveStep(0);
    setActiveTab(0);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        Add New Asset or Liability
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'primary.contrastText'
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 ? (
          <>
            <DialogContentText sx={{ mb: 3 }}>
              Choose how you'd like to add your financial information:
            </DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  variant={activeTab === 0 ? "contained" : "outlined"}
                  onClick={() => {
                    setActiveTab(0);
                    handleNext();
                  }}
                  sx={{ p: 3 }}
                >
                  Auto Entry (Screenshot)
                  <br />
                  Upload an image of your statement
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  variant={activeTab === 1 ? "contained" : "outlined"}
                  onClick={() => {
                    setActiveTab(1);
                    handleNext();
                  }}
                  sx={{ p: 3 }}
                >
                  Manual Entry
                  <br />
                  Type in the details yourself
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <Box sx={{ mt: 2 }}>
            {activeTab === 0 ? (
              <OCRUpload onAdd={(item) => {
                onAdd(item);
                handleClose();
              }} />
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <AddItemForm 
                    type="assets" 
                    onAdd={(item) => {
                      onAdd(item);
                      handleClose();
                    }} 
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AddItemForm 
                    type="liabilities" 
                    onAdd={(item) => {
                      onAdd(item);
                      handleClose();
                    }} 
                  />
                </Grid>
              </Grid>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AddItemModal;
