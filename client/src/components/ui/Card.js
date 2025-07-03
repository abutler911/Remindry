// src/components/ui/Card.js
import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  padding: 1.25rem 1.5rem 1rem;
  border-bottom: 1px solid #f1f5f9;
  background: #ffffff;
`;

const CardBody = styled.div`
  ${(props) => props.padding === "none" && `padding: 0;`}
  ${(props) => props.padding === "sm" && `padding: 1rem;`}
  ${(props) => props.padding === "md" && `padding: 1.5rem;`}
  ${(props) => props.padding === "lg" && `padding: 2rem;`}
`;

const CardFooter = styled.div`
  padding: 1rem 1.5rem 1.25rem;
  border-top: 1px solid #f1f5f9;
  background: #f8fafc;
`;

const Card = ({
  children,
  className = "",
  header = null,
  footer = null,
  padding = "md",
}) => {
  return (
    <StyledCard className={className}>
      {header && <CardHeader>{header}</CardHeader>}
      <CardBody padding={padding}>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </StyledCard>
  );
};

// StatCard Component
const StatCardContainer = styled(StyledCard)`
  overflow: visible;

  &:hover {
    transform: translateY(-4px);
  }
`;

const StatContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const StatIconContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  ${(props) => {
    switch (props.color) {
      case "blue":
        return "background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);";
      case "green":
        return "background: linear-gradient(135deg, #10b981 0%, #047857 100%);";
      case "orange":
        return "background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);";
      case "purple":
        return "background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);";
      default:
        return "background: linear-gradient(135deg, #6b7280 0%, #374151 100%);";
    }
  }}
`;

const StatCard = ({
  label,
  value,
  icon: Icon,
  color = "blue",
  className = "",
}) => {
  return (
    <StatCardContainer className={className}>
      <StatContent>
        <StatInfo>
          <StatLabel>{label}</StatLabel>
          <StatValue>{value}</StatValue>
        </StatInfo>
        {Icon && (
          <StatIconContainer color={color}>
            <Icon size={24} />
          </StatIconContainer>
        )}
      </StatContent>
    </StatCardContainer>
  );
};

// EmptyState Component
const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out;
`;

const EmptyStateIconContainer = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
`;

const EmptyStateMessage = styled.p`
  font-size: 1rem;
  color: #64748b;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
  max-width: 400px;
`;

const EmptyStateAction = styled.div`
  display: flex;
  justify-content: center;
`;

const EmptyState = ({
  message,
  icon: Icon = null,
  action = null,
  className = "",
}) => {
  return (
    <EmptyStateContainer className={className}>
      {Icon && (
        <EmptyStateIconContainer>
          <Icon size={32} />
        </EmptyStateIconContainer>
      )}
      <EmptyStateMessage>{message}</EmptyStateMessage>
      {action && <EmptyStateAction>{action}</EmptyStateAction>}
    </EmptyStateContainer>
  );
};

export { Card, StatCard, EmptyState };
