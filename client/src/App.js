// src/App.js
import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./theme.js";
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedApp from "./components/auth/ProtectedApp";
import Dashboard from "./Dashboard";

function App() {
  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* styled-components ThemeProvider */}
      <AuthProvider>
        <ProtectedApp>
          <Dashboard />
        </ProtectedApp>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
