import React from "react";
import styled from "styled-components";
import { Menu } from "lucide-react";

const AppHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #f1f5f9;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, sans-serif;
`;

const HeaderContainer = styled.div`
  max-width: 1440px;
  height: 72px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  color: #4b5563;

  &:hover {
    background-color: #f3f4f6;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const BrandGroup = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`;

const Brand = styled.h1`
  font-family: "Space Grotesk", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  letter-spacing: -0.5px;
`;

const Tagline = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  color: #374151;
`;

const Header = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  return (
    <AppHeader>
      <HeaderContainer>
        <Left>
          <MobileMenuButton
            onClick={onMobileMenuToggle}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={22} />
          </MobileMenuButton>
          <BrandGroup>
            <Brand>Remindry</Brand>
            <Tagline>Your command center for what matters.</Tagline>
          </BrandGroup>
        </Left>
        <Right>
          <Avatar>AB</Avatar>
        </Right>
      </HeaderContainer>
    </AppHeader>
  );
};

export default Header;
