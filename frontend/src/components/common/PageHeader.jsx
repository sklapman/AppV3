import React from 'react';
import { Box, Typography } from '@mui/material';

function PageHeader({ title, icon: Icon }) {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '10vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#d8654f',
        backgroundImage: 'url("/path/to/your-texture.png")', // Add your texture image path here
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: '#ffffff',
        textAlign: 'center',
        p: 2,
        position: 'relative',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        mb: 4
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        {Icon && <Icon sx={{ fontSize: 30, color: '#ffffff' }} />} {/* Updated icon color */}
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 600 }}> {/* Reduced font weight */}
        {title}
      </Typography>
    </Box>
  );
}

export default PageHeader;
