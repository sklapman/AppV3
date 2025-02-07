import React from 'react';
import { Grid, Card, Typography, CardActionArea, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import GoalsIcon from '@mui/icons-material/EmojiEvents';
import FinancialIcon from '@mui/icons-material/AccountBalance';
import SpendingIcon from '@mui/icons-material/AttachMoney';
import InvestingIcon from '@mui/icons-material/TrendingUp';
import SchoolIcon from '@mui/icons-material/School';

function Homepage() {
  const sections = [
    {
      title: 'Financial Goals',
      link: '/my-goals',
      icon: <GoalsIcon sx={{ fontSize: 72, color: 'rgba(255, 255, 255, 0.9)' }} />,
      description: 'Set and track your financial milestones',
      background: '#d8654f' // Solid autumn red
    },
    {
      title: 'Net Worth',
      link: '/net-worth',
      icon: <FinancialIcon sx={{ fontSize: 72, color: 'rgba(255, 255, 255, 0.9)' }} />,
      description: 'View your net worth status',
      background: '#e3864c' // Solid autumn orange
    },
    {
      title: 'Spending',
      link: '/spending',
      icon: <SpendingIcon sx={{ fontSize: 72, color: 'rgba(255, 255, 255, 0.9)' }} />,
      description: 'Track your spending habits',
      background: '#c84b31' // Solid autumn brown
    },
    {
      title: 'Investing',
      link: '/investing',
      icon: <InvestingIcon sx={{ fontSize: 72, color: 'rgba(255, 255, 255, 0.9)' }} />,
      description: 'Manage your investments',
      background: '#ff9f61' // Solid autumn peach
    },
  ];

  return (
    <Box sx={{ pt: 4, pb: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              color: 'primary.main',  // revert to primary color
              fontWeight: 700,
              mb: 2
            }}
          >
            Welcome to Your Financial Journey
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary', // revert to text secondary color
              maxWidth: 800,
              mx: 'auto'
            }}
          >
            Plan, track, and achieve your financial goals with our professional tools
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {sections.map((section) => (
            <Grid item xs={12} sm={6} md={3} key={section.title}>
              <Card
                sx={{
                  height: '100%',
                  background: section.background,
                  color: 'white',
                  overflow: 'hidden',
                  position: 'relative',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
                    '& .section-bg': {
                      transform: 'scale(1.05)',
                    }
                  }
                }}
              >
                <Box
                  className="section-bg"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    transition: 'transform 0.3s ease-in-out'
                  }}
                />
                <CardActionArea
                  component={Link}
                  to={section.link}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    position: 'relative',
                    '&:hover': {
                      '& .MuiSvgIcon-root': {
                        transform: 'scale(1.1)',
                      }
                    }
                  }}
                >
                  <Box
                    sx={{
                      height: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}
                  >
                    {React.cloneElement(section.icon, {
                      sx: {
                        fontSize: 72,
                        transition: 'transform 0.3s ease-in-out',
                        color: 'rgba(255, 255, 255, 0.9)'
                      }
                    })}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      mb: 1,
                      fontSize: '1.5rem',
                      textAlign: 'center'
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      opacity: 0.9,
                      fontWeight: 400,
                      fontSize: '1.1rem',
                      textAlign: 'center'
                    }}
                  >
                    {section.description}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Education Center Card */}
        <Card
          sx={{
            background: '#d8654f', // Solid autumn red
            color: 'white',
            overflow: 'hidden',
            position: 'relative',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              '& .education-bg': {
                transform: 'scale(1.05)',
              },
              background: '#c84b31', // Darker autumn red on hover
              transition: 'all 0.3s ease'
            }
          }}
        >
          <Box
            className="education-bg"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: 'url("/education-pattern.png")',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
          <CardActionArea
            component={Link}
            to="/education"
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 5,
              gap: 4,
              position: 'relative',
              '&:hover': {
                '& .MuiSvgIcon-root': {
                  transform: 'scale(1.1)',
                }
              }
            }}
          >
            <SchoolIcon
              sx={{
                fontSize: 80,
                transition: 'transform 0.3s ease-in-out',
                color: 'rgba(255, 255, 255, 0.9)'
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  mb: 1
                }}
              >
                Financial Education Center
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  opacity: 0.9,
                  maxWidth: '80%',
                  fontWeight: 400
                }}
              >
                Expand your financial knowledge with our comprehensive learning resources, guides, and tutorials
              </Typography>
            </Box>
          </CardActionArea>
        </Card>
      </Container>
    </Box>
  );
}

export default Homepage;
