// client/src/components/auth/ProtectedApp.js
import React from "react";
import { useAuth } from "./AuthProvider";
import LoginForm from "./LoginForm";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedApp = ({ children }) => {
  const { isAuthenticated, loading, login } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return children;
};

export default ProtectedApp;
