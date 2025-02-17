import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@mui/material";

const SignupButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleSignUp = async () => {
    console.log("🔍 Signup Attempt: Initiating Auth0 Signup...");

    try {
      await loginWithRedirect({
        appState: {
          returnTo: "/profile",
        },
        authorizationParams: {
          screen_hint: "signup",
        },
      });
    } catch (error) {
      console.error("🚨 Auth0 Signup Error:", error);
    }
  };

  return (
    !isAuthenticated && (
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleSignUp}
        sx={{ textTransform: "none", fontSize: "1rem", padding: "10px 20px" }}
      >
        Sign Up
      </Button>
    )
  );
};

export default SignupButton;