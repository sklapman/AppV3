import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import App from "./App.jsx";
import { theme } from "./theme/theme";
import { Auth0Provider } from "@auth0/auth0-react";

// Load environment variables
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

// Debugging: Log Auth0 environment variables
console.log("🔍 Auth0 Debug Variables:");
console.log("VITE_AUTH0_DOMAIN:", domain);
console.log("VITE_AUTH0_CLIENT_ID:", clientId);
console.log("VITE_AUTH0_CALLBACK_URL:", redirectUri);

// Ensure required environment variables are set
if (!domain || !clientId || !redirectUri) {
  console.error("🚨 Missing Auth0 environment variables. Check your .env file.");
}

// Create root container
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

// Render application
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: `${window.location.origin}/callback` }}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);