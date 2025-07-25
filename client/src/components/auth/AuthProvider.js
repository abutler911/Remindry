// client/src/components/auth/AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check for existing token on app load
  useEffect(() => {
    checkExistingAuth();
  }, []);

  const checkExistingAuth = async () => {
    try {
      const storedToken = localStorage.getItem("remindry_token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      // Verify token with server
      const response = await fetch(`${API_BASE}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.ok) {
        setToken(storedToken);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("remindry_token");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("remindry_token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (password) => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      // Prevent hang on empty response
      let data = {};
      try {
        data = await response.json();
      } catch (e) {
        console.warn("⚠️ No response body returned from login");
      }

      if (!response.ok) {
        throw new Error(data?.error || "Login failed");
      }

      // Store token and update state
      localStorage.setItem("remindry_token", data.token);
      setToken(data.token);
      setIsAuthenticated(true);

      if (data.expiresIn) {
        setTimeout(() => {
          logout();
        }, data.expiresIn);
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("remindry_token");
    setToken(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    loading,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
