import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    isAuthenticated && (
      <Button 
        variant="outlined" 
        color="error" 
        onClick={handleLogout}
        sx={{ textTransform: "none", fontSize: "1rem", padding: "10px 20px" }}
      >
        Log Out
      </Button>
    )
  );
};

export default LogoutButton;