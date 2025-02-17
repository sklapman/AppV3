import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Typography, Avatar, Button, Box } from "@mui/material";

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth0();

  if (!isAuthenticated) {
    return (
      <Container sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h4">You need to log in to view your profile.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ textAlign: "center", mt: 8 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <Avatar src={user.picture} alt={user.name} sx={{ width: 100, height: 100 }} />
        <Typography variant="h4">{user.name}</Typography>
        <Typography variant="body1">{user.email}</Typography>
        <Button variant="contained" color="primary" onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </Button>
      </Box>
    </Container>
  );
};

export default ProfilePage;