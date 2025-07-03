// src/components/layout/Header.js - Redesigned Header
import React from "react";
import { Settings, Menu, Wrench, Bell } from "lucide-react";

const Header = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? "menu-open" : ""}`}
            onClick={onMobileMenuToggle}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={24} />
          </button>

          <div className="brand">
            <div className="brand-icon">
              <Wrench size={28} />
            </div>
            <div className="brand-text">
              <h1 className="brand-title">DadBot</h1>
              <span className="brand-subtitle">Command Center</span>
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="header-stats">
            <span className="status-indicator online"></span>
            <span className="status-text">System Online</span>
          </div>

          <div className="header-actions">
            <button className="header-btn notification-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            <button className="header-btn settings-btn">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
