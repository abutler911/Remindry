// src/components/layout/Header.js
import React from "react";
import styled from "styled-components";
import { Menu } from "lucide-react";

const AppHeader = styled.header`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.75rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 4rem;
`;

const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #4a5568;
  transition: all 0.2s ease;

  &:hover {
    background: #f7fafc;
    color: #2d3748;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  @media (max-width: 768px) {
    display: flex;
  }

  ${(props) =>
    props.isOpen &&
    `
    background: #edf2f7;
    color: #2d3748;
  `}
`;

const BrandTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Header = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  return (
    <AppHeader>
      <HeaderContainer>
        <HeaderLeft>
          <MobileMenuButton
            onClick={onMobileMenuToggle}
            isOpen={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={24} />
          </MobileMenuButton>
          <BrandTitle>DadBot</BrandTitle>
        </HeaderLeft>
      </HeaderContainer>
    </AppHeader>
  );
};

export default Header;
