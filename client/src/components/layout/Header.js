// src/components/layout/Header.js
import React from "react";
import { Menu } from "lucide-react";

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

          <h1 className="brand-title">DadBot</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
