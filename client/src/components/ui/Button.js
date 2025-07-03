// src/components/ui/Button.js
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  text-decoration: none;
  white-space: nowrap;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  /* Size variants */
  ${(props) =>
    props.size === "sm" &&
    `
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  `}

  ${(props) =>
    props.size === "md" &&
    `
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  `}
  
  ${(props) =>
    props.size === "lg" &&
    `
    padding: 1rem 2rem;
    font-size: 1rem;
  `}
  
  /* Width variant */
  ${(props) =>
    props.fullWidth &&
    `
    width: 100%;
  `}
  
  /* Primary variant */
  ${(props) =>
    props.variant === "primary" &&
    `
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `}
  
  /* Secondary variant */
  ${(props) =>
    props.variant === "secondary" &&
    `
    background: white;
    color: #475569;
    border: 1px solid #e2e8f0;
    
    &:hover:not(:disabled) {
      background: #f8fafc;
      border-color: #cbd5e1;
      color: #334155;
      transform: translateY(-1px);
    }
  `}
  
  /* Icon variant */
  ${(props) =>
    props.variant === "icon" &&
    `
    background: #f8fafc;
    color: #475569;
    border: 1px solid #e2e8f0;
    padding: 0.5rem;
    
    &:hover:not(:disabled) {
      background: #f1f5f9;
      border-color: #cbd5e1;
      color: #334155;
      transform: scale(1.05);
    }
  `}
  
  /* Danger variant */
  ${(props) =>
    props.variant === "danger" &&
    `
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    }
  `}
  
  /* Outline danger variant */
  ${(props) =>
    props.variant === "outline-danger" &&
    `
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
    
    &:hover:not(:disabled) {
      background: #fee2e2;
      border-color: #fca5a5;
      transform: translateY(-1px);
    }
  `}
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon = null,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </StyledButton>
  );
};

export default Button;
