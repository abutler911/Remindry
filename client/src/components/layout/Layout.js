// src/components/layout/Layout.js - Improved Layout
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout = ({ children, activeTab, onTabChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="app-layout">
      <Header
        onMobileMenuToggle={handleMobileMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <Navbar
        activeTab={activeTab}
        onTabChange={onTabChange}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={handleMobileMenuClose}
      />

      <main className="app-main">
        <div className="main-container">
          <div className="content-wrapper">{children}</div>
        </div>
      </main>

      {/* Page overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div className="page-overlay" onClick={handleMobileMenuClose} />
      )}
    </div>
  );
};

export default Layout;
