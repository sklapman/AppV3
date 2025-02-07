import React from 'react';
import { Box, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';

function EducationHeader({ showBackLink = false }) {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '12vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a237e 20%, #5e35b1 80%)',
        color: 'white',
        textAlign: 'center',
        p: 2,
        position: 'relative',
        borderRadius: '0 0 16px 16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        mb: 4
      }}
    >
      {showBackLink && (
        <Link 
          to="/education" 
          style={{ 
            position: 'absolute', 
            left: 16, 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: 'white',
            textDecoration: 'none'
          }}
        >
          ← Back to Education Center
        </Link>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <SchoolIcon sx={{ fontSize: 24 }} />
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Financial Education Center
      </Typography>
    </Box>
  );
}

export default EducationHeader;
