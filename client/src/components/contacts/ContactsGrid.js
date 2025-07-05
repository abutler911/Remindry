// src/components/contacts/ContactsGrid.js
import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ContactsGridContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #f5576c 75%,
    #4facfe 100%
  );
  background-size: 400% 400%;
  animation: ${keyframes`
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  `} 15s ease infinite;
  position: relative;

  /* Overlay for better card contrast */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(1px);
  }
`;

const ContactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 0 0.5rem;
  }

  /* Staggered animation for cards */
  & > * {
    animation: ${fadeInUp} 0.6s ease-out;
    animation-fill-mode: both;
  }

  & > *:nth-child(1) {
    animation-delay: 0.1s;
  }
  & > *:nth-child(2) {
    animation-delay: 0.2s;
  }
  & > *:nth-child(3) {
    animation-delay: 0.3s;
  }
  & > *:nth-child(4) {
    animation-delay: 0.4s;
  }
  & > *:nth-child(5) {
    animation-delay: 0.5s;
  }
  & > *:nth-child(6) {
    animation-delay: 0.6s;
  }
  & > *:nth-child(n + 7) {
    animation-delay: 0.7s;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export {
  ContactsGridContainer,
  ContactsGrid,
  PageHeader,
  PageTitle,
  AddButton,
};
