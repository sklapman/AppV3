import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container, Box, CircularProgress } from "@mui/material";
import Navbar from "./components/Navbar";
import Footer from "./components/common/Footer";
import Homepage from "./components/Homepage";
import ProfilePage from "./pages/ProfilePage";
import CallbackPage from "./pages/CallbackPage";
import MyGoals from "./components/MyGoals";
import Spending from "./components/Spending";
import Investing from "./components/Investing";
import Education from "./components/Education";
import NetWorth from "./components/NetWorth";
import Register from "./pages/Register";

const App = () => {
  const { isLoading } = useAuth0();

  // Show a loading spinner while Auth0 is still initializing
  if (isLoading) {
    return (
      <Box 
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Container component="main" sx={{ pt: 10, pb: 4, flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/education" element={<Education />} />
          <Route path="/my-goals" element={<MyGoals />} />
          <Route path="/spending" element={<Spending />} />
          <Route path="/investing" element={<Investing />} />
          <Route path="/net-worth" element={<NetWorth />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/callback" element={<CallbackPage />} />
        </Routes>
      </Container>
      <Footer />
    </Box>
  );
};

export default App;