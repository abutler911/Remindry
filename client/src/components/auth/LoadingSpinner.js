// client/src/components/auth/LoadingSpinner.js
import React from "react";
import styled, { keyframes } from "styled-components";
import { Shield } from "lucide-react";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const SpinnerContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingText = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingSpinner = () => {
  return (
    <LoadingContainer>
      <SpinnerContainer>
        <Spinner />
        <IconContainer>
          <Shield size={24} />
        </IconContainer>
      </SpinnerContainer>
      <LoadingText>Securing Remindry...</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingSpinner;
