// src/components/reminders/ReminderDetailModal.js
import React from "react";
import styled from "styled-components";
import {
  X,
  Send,
  Edit,
  Calendar,
  DollarSign,
  Users,
  MessageSquare,
} from "lucide-react";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: modalSlideIn 0.3s ease-out;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #f1f5f9;
`;

const HeaderLeft = styled.div`
  flex: 1;
  min-width: 0;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
  word-wrap: break-word;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: 1rem;
  flex-shrink: 0;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${(props) => (props.isActive ? "#dcfce7" : "#fee2e2")};
  color: ${(props) => (props.isActive ? "#166534" : "#991b1b")};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #64748b;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f1f5f9;
    color: #334155;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const DetailSection = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #6b7280;
  }
`;

const DetailValue = styled.div`
  font-size: 1rem;
  color: #1f2937;
  line-height: 1.5;
`;

const MessageBox = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #374151;
  white-space: pre-wrap;
  word-wrap: break-word;
  min-height: 60px;
`;

const RecipientsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const RecipientChip = styled.span`
  background: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #c7d2fe;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  display: flex;
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
  flex: 1;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  @media (max-width: 640px) {
    flex: none;
    width: 100%;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(Button)`
  background: white;
  color: #475569;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover:not(:disabled) {
    background: #f8fafc;
    border-color: #cbd5e1;
    color: #334155;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const EmptyState = styled.div`
  color: #9ca3af;
  font-style: italic;
  font-size: 0.875rem;
`;

// Utility function to format dates with context
const formatDate = (dateString) => {
  if (!dateString) return "No due date set";

  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (diffDays === 0) return `${formattedDate} (Today)`;
  if (diffDays === 1) return `${formattedDate} (Tomorrow)`;
  if (diffDays === -1) return `${formattedDate} (Yesterday)`;
  if (diffDays < -1)
    return `${formattedDate} (${Math.abs(diffDays)} days overdue)`;
  if (diffDays > 1) return `${formattedDate} (In ${diffDays} days)`;

  return formattedDate;
};

const ReminderDetailModal = ({ isOpen, onClose, reminder, onSend, onEdit }) => {
  if (!isOpen || !reminder) return null;

  const handleSend = () => {
    onSend(reminder._id);
    onClose();
  };

  const handleEdit = () => {
    onEdit(reminder);
    // Note: onClose is handled in the parent component (Dashboard.js)
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <HeaderLeft>
            <ModalTitle>{reminder.title}</ModalTitle>
          </HeaderLeft>
          <HeaderActions>
            <StatusBadge isActive={reminder.isActive}>
              {reminder.isActive ? "Active" : "Inactive"}
            </StatusBadge>
            <CloseButton onClick={onClose} aria-label="Close reminder details">
              <X size={20} />
            </CloseButton>
          </HeaderActions>
        </ModalHeader>

        <ModalBody>
          <DetailSection>
            <DetailLabel>
              <Calendar size={16} />
              Due Date
            </DetailLabel>
            <DetailValue>{formatDate(reminder.dueDate)}</DetailValue>
          </DetailSection>

          {reminder.amount && (
            <DetailSection>
              <DetailLabel>
                <DollarSign size={16} />
                Amount
              </DetailLabel>
              <DetailValue>${reminder.amount}</DetailValue>
            </DetailSection>
          )}

          <DetailSection>
            <DetailLabel>
              <Users size={16} />
              Recipients ({reminder.recipients?.length || 0})
            </DetailLabel>
            {reminder.recipients && reminder.recipients.length > 0 ? (
              <RecipientsList>
                {reminder.recipients.map((recipient, index) => (
                  <RecipientChip key={index}>{recipient.name}</RecipientChip>
                ))}
              </RecipientsList>
            ) : (
              <EmptyState>No recipients selected</EmptyState>
            )}
          </DetailSection>

          <DetailSection>
            <DetailLabel>
              <MessageSquare size={16} />
              Message
            </DetailLabel>
            {reminder.message ? (
              <MessageBox>{reminder.message}</MessageBox>
            ) : (
              <MessageBox>
                <EmptyState>No message provided</EmptyState>
              </MessageBox>
            )}
          </DetailSection>

          <ActionButtons>
            <PrimaryButton onClick={handleSend}>
              <Send size={16} />
              Send Now
            </PrimaryButton>
            <SecondaryButton onClick={handleEdit}>
              <Edit size={16} />
              Edit Reminder
            </SecondaryButton>
          </ActionButtons>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ReminderDetailModal;
