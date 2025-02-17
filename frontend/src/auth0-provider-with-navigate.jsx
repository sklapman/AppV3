import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();
  
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!(domain && clientId && redirectUri)) {
    console.error("⚠️ Missing Auth0 environment variables! Check your .env file.");
    return null;
  }

  const onRedirectCallback = (appState) => {
    if (typeof navigate === "function") {
      navigate(appState?.returnTo || window.location.pathname);
    } else {
      console.warn("⚠️ Navigate function is undefined. Ensure BrowserRouter wraps the app.");
    }
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};