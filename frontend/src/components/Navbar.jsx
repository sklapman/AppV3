import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Container, 
  Box, 
  IconButton, 
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import PaymentsIcon from "@mui/icons-material/Payments";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SchoolIcon from "@mui/icons-material/School";
import logo from "../logo.png";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./buttons/LoginButton.jsx";
import LogoutButton from "./buttons/LogoutButton.jsx";
import SignupButton from "./buttons/SignupButton.jsx";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { isAuthenticated } = useAuth0();

  const navItems = [
    { name: "Net Worth", path: "/net-worth", icon: <AccountBalanceIcon /> },
    { name: "Goals", path: "/my-goals", icon: <TrackChangesIcon /> },
    { name: "Spending", path: "/spending", icon: <PaymentsIcon /> },
    { name: "Investing", path: "/investing", icon: <ShowChartIcon /> }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const buttonStyles = {
    height: "40px",
    padding: "0 16px",
    fontSize: "0.875rem",
    minWidth: "120px",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.name} 
            component={Link} 
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{ 
              color: "inherit", 
              textDecoration: "none",
              "&:hover": {
                bgcolor: "action.hover"
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        <ListItem 
          component={Link} 
          to="/education"
          onClick={handleDrawerToggle}
          sx={{ 
            color: "white",
            bgcolor: "primary.main",
            mt: 2,
            "&:hover": {
              bgcolor: "primary.dark"
            }
          }}
        >
          <ListItemIcon>
            <SchoolIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Education Center" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          height: "64px",
          zIndex: (theme) => theme.zIndex.drawer + 1 
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ height: "64px", justifyContent: "space-between" }}>
            {/* Left Side: Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link to="/">
                <img src={logo} alt="Logo" style={{ height: "48px" }} />
              </Link>
              
              {/* Desktop Navigation Links */}
              {!isMobile && (
                <Box sx={{ display: "flex", gap: "1rem", ml: 4 }}>
                  {navItems.map((item) => (
                    <Button
                      key={item.name}
                      component={Link}
                      to={item.path}
                      color="inherit"
                      startIcon={item.icon}
                      sx={{
                        ...buttonStyles,
                        "&:hover": {
                          bgcolor: "rgba(0, 0, 0, 0.04)"
                        }
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>

            {/* Right Side: Auth Buttons */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {!isAuthenticated ? (
                <>
                  <SignupButton />
                  <LoginButton />
                </>
              ) : (
                <LogoutButton />
              )}
              
              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              )}
              
              {/* Desktop "Education Center" Button */}
              {!isMobile && (
                <Button
                  component={Link}
                  to="/education"
                  variant="contained"
                  startIcon={<SchoolIcon />}
                  sx={{
                    ...buttonStyles,
                    background: "primary.main",
                    color: "#ffffff",
                    "&:hover": {
                      background: "primary.dark"
                    }
                  }}
                >
                  Education Center
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better mobile performance
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;