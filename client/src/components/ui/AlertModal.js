// src/components/ui/AlertModal.js
import React from "react";
import styled from "styled-components";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import Modal from "./Modal";

const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem 0;
`;

const AlertIconContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  ${(props) => {
    switch (props.type) {
      case "success":
        return `
          background: #f0fdf4;
          color: #16a34a;
        `;
      case "error":
        return `
          background: #fef2f2;
          color: #dc2626;
        `;
      case "warning":
        return `
          background: #fffbeb;
          color: #d97706;
        `;
      default:
        return `
          background: #eff6ff;
          color: #2563eb;
        `;
    }
  }}
`;

const AlertMessage = styled.p`
  font-size: 1.125rem;
  color: #374151;
  margin: 0;
  line-height: 1.6;
  max-width: 400px;
`;

const AlertButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;

  &:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const AlertModal = ({
  isOpen,
  onClose,
  title = "Notification",
  message = "",
  type = "info", // 'success', 'error', 'warning', 'info'
  buttonText = "OK",
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={32} />;
      case "error":
        return <XCircle size={32} />;
      case "warning":
        return <AlertTriangle size={32} />;
      default:
        return <Info size={32} />;
    }
  };

  const actions = <AlertButton onClick={onClose}>{buttonText}</AlertButton>;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      actions={actions}
      size="sm"
      centerActions
    >
      <AlertContent>
        <AlertIconContainer type={type}>{getIcon()}</AlertIconContainer>
        <AlertMessage>{message}</AlertMessage>
      </AlertContent>
    </Modal>
  );
};

export default AlertModal;
