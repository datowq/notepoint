import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create the context object
export const AuthContext = createContext();

const URL = import.meta.env.VITE_URL;

// Create the context provider
export const AuthProvider = ({ children }) => {

  // this is a dummy state used to make some components re-render after a login/logout
  const [change, setChange] = useState(false);
  const expireTime = 3600;
  // Define the authentication functions
  const login = (username) => {
    localStorage.setItem("currentUser", username);
    setChange(!change);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("timestamp");
    setChange(!change);
  };

  const setCredentials = (accessToken, refreshToken, timestamp) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("timestamp", timestamp);
    setChange(!change);
  }

  const isLoggedIn = () => {
    if (localStorage.getItem("currentUser")) {
      return true;
    }
    return false;
  }

  const spotifyIsSynced = () => {
    if (localStorage.getItem("accessToken")) {
      return true;
    }
    return false;
  }

  const hasTokenExpired = () => {
    const accessToken = localStorage.getItem("accessToken");
    const timestamp = localStorage.getItem("timestamp");
    if (!accessToken || accessToken === 'undefined' || !timestamp || timestamp === 'undefined') {
      return false;
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed / 1000) > Number(expireTime);
  };

  const refreshToken = async () => {
    try {
      if (!localStorage.getItem("refreshToken") ||
        localStorage.getItem("refreshToken") === 'undefined' ||
        (Date.now() - Number(localStorage.getItem("timestamp")) / 1000) < 1000
      ) {
        console.error('No refresh token available');
        logout();
        return;
      }
  
      // Use `/refresh_token` endpoint from our Node app
      const { data } = await axios.get(URL + `/spotify/refreshtoken?refresh_token=${localStorage.getItem("refreshToken")}`);
  
      window.localStorage.setItem("accessToken", data.access_token);
      window.localStorage.setItem("timestamp", Date.now());
  
      window.location.reload();
  
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (hasTokenExpired()) {
        refreshToken();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Provide the authentication state and functions to children components
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, setCredentials, spotifyIsSynced }}>
      {children}
    </AuthContext.Provider>
  );
};