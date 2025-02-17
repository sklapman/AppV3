import React from "react";
import { CircularProgress, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/common/Footer";

const CallbackPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <CircularProgress size={60} sx={{ mt: 4 }} />
      <Footer />
    </Box>
  );
};

export default CallbackPage;