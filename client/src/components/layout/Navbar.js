// src/components/layout/Navbar.js
import React from "react";
import styled from "styled-components";
import { Calendar, MessageSquare, Users, BarChart3 } from "lucide-react";

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

const AppNav = styled.nav.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: white;
  border-right: 1px solid #e2e8f0;
  z-index: 45;
  transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease;

  @media (min-width: 769px) {
    top: 64px;
    height: calc(100vh - 64px);
    transform: translateX(0);
  }
`;

const NavContainer = styled.div`
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const NavMobileHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;

  @media (min-width: 769px) {
    display: none;
  }
`;

const NavHeaderTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
  flex: 1;
`;

const NavCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #718096;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #f7fafc;
    color: #4a5568;
  }
`;

const NavTabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const getColorStyles = (color, isActive) => {
  const colors = {
    blue: {
      bg: isActive ? "rgba(59, 130, 246, 0.1)" : "transparent",
      border: isActive ? "#3b82f6" : "transparent",
      icon: isActive ? "#3b82f6" : "#64748b",
      text: isActive ? "#1e40af" : "#475569",
    },
    green: {
      bg: isActive ? "rgba(16, 185, 129, 0.1)" : "transparent",
      border: isActive ? "#10b981" : "transparent",
      icon: isActive ? "#10b981" : "#64748b",
      text: isActive ? "#047857" : "#475569",
    },
    orange: {
      bg: isActive ? "rgba(245, 158, 11, 0.1)" : "transparent",
      border: isActive ? "#f59e0b" : "transparent",
      icon: isActive ? "#f59e0b" : "#64748b",
      text: isActive ? "#d97706" : "#475569",
    },
    purple: {
      bg: isActive ? "rgba(139, 92, 246, 0.1)" : "transparent",
      border: isActive ? "#8b5cf6" : "transparent",
      icon: isActive ? "#8b5cf6" : "#64748b",
      text: isActive ? "#7c3aed" : "#475569",
    },
  };
  return colors[color] || colors.blue;
};

const NavTab = styled.button.withConfig({
  shouldForwardProp: (prop) => !["color", "isActive"].includes(prop),
})`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  background: ${(props) => getColorStyles(props.color, props.isActive).bg};
  border: 2px solid
    ${(props) => getColorStyles(props.color, props.isActive).border};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${(props) =>
      props.isActive
        ? getColorStyles(props.color, true).bg
        : "rgba(0, 0, 0, 0.02)"};
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px
      ${(props) => getColorStyles(props.color, props.isActive).border}33;
  }
`;

const NavTabIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => !["color", "isActive"].includes(prop),
})`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.isActive ? getColorStyles(props.color, true).icon + "15" : "#f1f5f9"};
  color: ${(props) => getColorStyles(props.color, props.isActive).icon};
  transition: all 0.2s ease;
`;

const NavTabContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const NavTabLabel = styled.span.withConfig({
  shouldForwardProp: (prop) => !["color", "isActive"].includes(prop),
})`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => getColorStyles(props.color, props.isActive).text};
  transition: color 0.2s ease;
`;

const NavTabDescription = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
`;

const NavTabIndicator = styled.div.withConfig({
  shouldForwardProp: (prop) => !["color", "isActive"].includes(prop),
})`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: ${(props) => getColorStyles(props.color, true).icon};
  border-radius: 50%;
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  transition: opacity 0.2s ease;
`;

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
    <AppNav isOpen={isMobileMenuOpen}>
      <NavContainer>
        <NavMobileHeader>
          <NavHeaderTitle>Navigation</NavHeaderTitle>
          <NavCloseButton onClick={onMobileMenuClose} aria-label="Close menu">
            ×
          </NavCloseButton>
        </NavMobileHeader>

        <NavTabs>
          {navItems.map(({ id, label, icon: Icon, description, color }) => (
            <NavTab
              key={id}
              onClick={() => handleTabClick(id)}
              color={color}
              isActive={activeTab === id}
              aria-current={activeTab === id ? "page" : undefined}
            >
              <NavTabIcon color={color} isActive={activeTab === id}>
                <Icon size={20} />
              </NavTabIcon>
              <NavTabContent>
                <NavTabLabel color={color} isActive={activeTab === id}>
                  {label}
                </NavTabLabel>
                <NavTabDescription>{description}</NavTabDescription>
              </NavTabContent>
              <NavTabIndicator color={color} isActive={activeTab === id} />
            </NavTab>
          ))}
        </NavTabs>
      </NavContainer>
    </AppNav>
  );
};

export default Navbar;
