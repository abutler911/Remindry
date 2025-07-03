// src/components/layout/Navbar.js - Redesigned Navigation
import React from "react";
import {
  Calendar,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Calendar,
    description: "Overview & Stats",
    color: "blue",
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: Users,
    description: "Family Members",
    color: "green",
  },
  {
    id: "reminders",
    label: "Reminders",
    icon: MessageSquare,
    description: "Automated Messages",
    color: "orange",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    description: "Performance Data",
    color: "purple",
  },
];

const Navbar = ({
  activeTab,
  onTabChange,
  isMobileMenuOpen,
  onMobileMenuClose,
}) => {
  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    onMobileMenuClose();
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={onMobileMenuClose} />
      )}

      {/* Navigation */}
      <nav className={`app-nav ${isMobileMenuOpen ? "nav-mobile-open" : ""}`}>
        <div className="nav-container">
          {/* Mobile Menu Header */}
          <div className="nav-mobile-header">
            <h3>Navigation</h3>
            <button onClick={onMobileMenuClose} className="nav-close-btn">
              ×
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="nav-tabs">
            {navItems.map(({ id, label, icon: Icon, description, color }) => (
              <button
                key={id}
                onClick={() => handleTabClick(id)}
                className={`nav-tab nav-tab-${color} ${
                  activeTab === id ? "nav-tab-active" : ""
                }`}
                aria-current={activeTab === id ? "page" : undefined}
              >
                <div className="nav-tab-icon">
                  <Icon size={20} />
                </div>
                <div className="nav-tab-content">
                  <span className="nav-tab-label">{label}</span>
                  <span className="nav-tab-description">{description}</span>
                </div>
                {activeTab === id && <div className="nav-tab-indicator" />}
              </button>
            ))}
          </div>

          {/* Mobile Settings */}
          <div className="nav-mobile-footer">
            <button className="nav-settings-btn">
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
