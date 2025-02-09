import React, { useState, useCallback } from 'react';
import { Box, Paper, Typography, Button, TextField, MenuItem, IconButton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
import { performOCR } from '../../utils/OCR';

function OCRUpload({ onAdd }) {
  const [ocrResult, setOcrResult] = useState('');
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [extractedData, setExtractedData] = useState({ name: '', value: '', category: '', type: 'assets' });

  const processFile = async (file) => {
    setUploading(true);
    try {
      // Create preview
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      
      // Perform OCR
      const text = await performOCR(file);
      setOcrResult(text);
    } catch (error) {
      console.error('OCR failed:', error);
    }
    setUploading(false);
  };

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length > 0) {
      processFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    multiple: false
  });

  const handleScreenshotCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      stream.getTracks().forEach(track => track.stop());
      
      canvas.toBlob((blob) => {
        processFile(blob);
      }, 'image/png');
    } catch (err) {
      console.error('Screenshot capture failed:', err);
    }
  };

  const handleClearImage = () => {
    setPreviewUrl(null);
    setOcrResult('');
    setExtractedData({ name: '', value: '', category: '', type: 'assets' });
  };

  const handleSubmitExtracted = () => {
    if (extractedData.name && extractedData.value) {
      onAdd({ ...extractedData, value: parseFloat(extractedData.value) });
      handleClearImage();
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {!previewUrl ? (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center' }}>
          <Box
            {...getRootProps()}
            sx={{
              width: '100%',
              height: 200,
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'grey.300',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              p: 3,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'action.hover'
              }
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="body1" align="center" gutterBottom>
              {isDragActive
                ? 'Drop your image here'
                : 'Drag and drop an image here, or click to select'}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Supports PNG, JPG
            </Typography>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Button
              startIcon={<PhotoCameraIcon />}
              onClick={handleScreenshotCapture}
              variant="outlined"
              fullWidth
            >
              Capture Screenshot
            </Button>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mt: 1, 
                p: 1, 
                bgcolor: 'info.soft', 
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'info.main' 
              }}
            >
              Note: You'll need to grant browser permission to capture screenshots. 
              Your browser will prompt you to select the area or tab you want to capture.
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ position: 'relative', mb: 3 }}>
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              width: '100%',
              maxHeight: '300px',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
          <IconButton
            onClick={handleClearImage}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'background.paper'
            }}
          >
            <ClearIcon />
          </IconButton>
        </Box>
      )}

      {uploading && (
        <Typography align="center" sx={{ my: 2 }}>
          Processing image...
        </Typography>
      )}

      {ocrResult && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">Extracted Text:</Typography>
          <Box sx={{ p: 1, mb: 2, bgcolor: '#f5f5f5' }}>
            {ocrResult}
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              value={extractedData.name}
              onChange={(e) => setExtractedData({ ...extractedData, name: e.target.value })}
              size="small"
            />
            <TextField
              label="Value"
              type="number"
              value={extractedData.value}
              onChange={(e) => setExtractedData({ ...extractedData, value: e.target.value })}
              size="small"
            />
            <TextField
              select
              label="Type"
              value={extractedData.type}
              onChange={(e) => setExtractedData({ ...extractedData, type: e.target.value })}
              size="small"
            >
              <MenuItem value="assets">Asset</MenuItem>
              <MenuItem value="liabilities">Liability</MenuItem>
            </TextField>
            <Button variant="contained" onClick={handleSubmitExtracted}>
              Add Item
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default OCRUpload;
