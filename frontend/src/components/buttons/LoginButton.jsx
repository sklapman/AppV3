import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@mui/material";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
    });
  };

  return (
    !isAuthenticated && (
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleLogin}
        sx={{ textTransform: "none", fontSize: "1rem", padding: "10px 20px" }}
      >
        Log In
      </Button>
    )
  );
};

export default LoginButton;