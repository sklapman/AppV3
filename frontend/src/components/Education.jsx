import React, { useState } from 'react';
import { Typography, Button, Box, Container, Grid, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Ensure this import
import SchoolIcon from '@mui/icons-material/School';
import { spending } from '../data/edu_spending';
import { investing } from '../data/edu_investing';
import { goals } from '../data/edu_goals';
import { netWorth } from '../data/edu_netWorth';

function Education() {
  const [selectedSection, setSelectedSection] = useState(null);

  const handleTileClick = (section) => {
    setSelectedSection(section);
  };

  const sections = [
    { title: "Goals", resource: goals },
    { title: "Net Worth", resource: netWorth },
    { title: "Spending", resource: spending },
    { title: "Investing", resource: investing }
  ];

  return (
    <Box sx={{ pt: 4, pb: 8 }}>
      <Box
        sx={{
          width: '100%',
          minHeight: '15vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fcc2a0 20%, #f29465 80%)', // Updated pastel gradient
          color: '#5c4d4d', // Warm gray-brown text color
          textAlign: 'center',
          p: 2,
          position: 'relative',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <SchoolIcon sx={{ fontSize: 30 }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Financial Education Center
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <Typography variant="body1" sx={{ mt: 4, mb: 2 }}>
          Welcome to the Financial Education Center. Here, you will find comprehensive information on various financial topics, designed to help you understand the basics and advanced concepts of managing your finances effectively.
        </Typography>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {sections.map((section, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: selectedSection === section.title ? '#ffa8b7' : '#ffffff', // Updated pastel color
                  color: selectedSection === section.title ? '#ffffff' : '#2d3436', // Updated text color
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  borderRadius: '8px',
                  '&:hover': {
                    background: '#ffd0d9', // Updated hover color
                    color: '#2d3436', // Updated hover text color
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
                  }
                }}
                onClick={() => handleTileClick(section.title)}
              >
                <Typography variant="h6">{section.title}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {selectedSection && (
          <Box sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
              <Typography variant="body1">
                {sections.find(section => section.title === selectedSection).resource.description}
              </Typography>
            </Paper>
            {sections.find(section => section.title === selectedSection).resource.content.map((item, idx) => (
              <Accordion key={idx} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{item.heading}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">{item.text}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
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
                  Further Reading
                </Typography>
                <Grid container spacing={2}>
                  {sections.find(section => section.title === selectedSection).resource.advancedLinks.map((link, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Button
                        fullWidth
                        variant="contained"
                        href={link.url}
                        target="_blank"
                        rel="noopener"
                        sx={{
                          py: 1.5,
                          px: 3,
                          textTransform: 'none',
                          background: 'linear-gradient(135deg, #5e35b1 20%, #1a237e 80%)',
                          color: 'white',
                          borderRadius: '8px',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #4527a0 20%, #311b92 80%)',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease'
                          }
                        }}
                      >
                        {link.text}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Education;
