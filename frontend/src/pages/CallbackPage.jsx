import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Box, Typography } from "@mui/material";

const CallbackPage = () => {
  const { isAuthenticated, error, user, isLoading } = useAuth0();
  const navigate = useNavigate();

  // Debugging logs
  useEffect(() => {
    console.log("🔍 Auth0 Debug Status:");
    console.log("✅ isAuthenticated:", isAuthenticated);
    console.log("❌ Error:", error);
    console.log("👤 User:", user);
  }, [isAuthenticated, error, user]);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("✅ Authentication successful! Redirecting...");
      navigate("/"); // Redirect to homepage or last visited page
    }
    if (error) {
      console.error("🚨 Authentication error:", error);
      navigate("/"); // Redirect to homepage in case of error
    }
  }, [isAuthenticated, error, navigate]);

  // Handle loading state
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: 2
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Completing authentication...
        </Typography>
      </Box>
    );
  }

  return null; // Nothing to display once redirected
};

export default CallbackPage;