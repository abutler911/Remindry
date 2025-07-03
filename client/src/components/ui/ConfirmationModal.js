// src/components/ui/ConfirmationModal.js
import React from "react";
import styled from "styled-components";
import { AlertTriangle, Trash2, Info, CheckCircle } from "lucide-react";
import Modal from "./Modal";

const ConfirmationContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem 0;
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  ${(props) => {
    switch (props.variant) {
      case "danger":
        return `
          background: #fef2f2;
          color: #dc2626;
        `;
      case "warning":
        return `
          background: #fffbeb;
          color: #d97706;
        `;
      case "info":
        return `
          background: #eff6ff;
          color: #2563eb;
        `;
      case "success":
        return `
          background: #f0fdf4;
          color: #16a34a;
        `;
      default:
        return `
          background: #f3f4f6;
          color: #6b7280;
        `;
    }
  }}
`;

const ConfirmationMessage = styled.p`
  font-size: 1.125rem;
  color: #374151;
  margin: 0;
  line-height: 1.6;
  max-width: 400px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  min-width: 100px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-1px);
  }
`;

const DangerButton = styled(Button)`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(Button)`
  background: white;
  color: #475569;
  border: 1px solid #e2e8f0;

  &:hover:not(:disabled) {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`;

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "info", // 'danger', 'warning', 'info', 'success'
  loading = false,
}) => {
  const getIcon = () => {
    switch (variant) {
      case "danger":
        return <Trash2 size={32} />;
      case "warning":
        return <AlertTriangle size={32} />;
      case "success":
        return <CheckCircle size={32} />;
      default:
        return <Info size={32} />;
    }
  };

  const getConfirmButton = () => {
    if (variant === "danger") {
      return (
        <DangerButton onClick={onConfirm} disabled={loading}>
          {loading ? "Processing..." : confirmText}
        </DangerButton>
      );
    }

    return (
      <PrimaryButton onClick={onConfirm} disabled={loading}>
        {loading ? "Processing..." : confirmText}
      </PrimaryButton>
    );
  };

  const actions = (
    <ButtonContainer>
      {getConfirmButton()}
      <SecondaryButton onClick={onClose} disabled={loading}>
        {cancelText}
      </SecondaryButton>
    </ButtonContainer>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      actions={actions}
      size="sm"
      centerActions
    >
      <ConfirmationContent>
        <IconContainer variant={variant}>{getIcon()}</IconContainer>
        <ConfirmationMessage>{message}</ConfirmationMessage>
      </ConfirmationContent>
    </Modal>
  );
};

export default ConfirmationModal;
