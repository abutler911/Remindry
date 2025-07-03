// src/components/reminders/ReminderCard.js
import React from "react";
import styled, { keyframes, css } from "styled-components";
import { Send, Edit, Trash2 } from "lucide-react";

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
`;

// Styled Components
const ReminderDetailCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.5s ease-out;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 12px;
  }
`;

const ReminderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ReminderTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  line-height: 1.3;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const ReminderStatus = styled.div`
  display: flex;
  align-items: center;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;

  ${(props) =>
    props.isActive
      ? css`
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);

          &:hover {
            animation: ${pulse} 0.6s ease-in-out;
          }
        `
      : css`
          background: #f1f5f9;
          color: #64748b;
          border: 1px solid #e2e8f0;
        `}
`;

const ReminderBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const ReminderDetails = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
  font-weight: 500;
`;

const ReminderRecipients = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
  font-weight: 500;
`;

const ReminderMessage = styled.p`
  font-size: 0.95rem;
  color: #475569;
  margin: 0;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
  font-style: italic;
  line-height: 1.5;
  position: relative;

  &::before {
    content: '"';
    font-size: 2rem;
    color: #cbd5e1;
    position: absolute;
    left: 0.5rem;
    top: -0.25rem;
    font-family: serif;
  }

  &::after {
    content: '"';
    font-size: 2rem;
    color: #cbd5e1;
    position: absolute;
    right: 0.5rem;
    bottom: -0.75rem;
    font-family: serif;
  }
`;

const ReminderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

// Button Components
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

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const PrimaryButton = styled(Button)`
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
`;

const SecondaryButton = styled(Button)`
  background: white;
  color: #475569;
  border: 1px solid #e2e8f0;

  &:hover:not(:disabled) {
    background: #f8fafc;
    border-color: #cbd5e1;
    color: #334155;
    transform: translateY(-1px);
  }
`;

const DangerButton = styled(Button)`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
  padding: 0.75rem;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const ReminderCard = ({ reminder, onEdit, onDelete, onSend }) => {
  return (
    <ReminderDetailCard>
      <ReminderHeader>
        <ReminderTitle>{reminder.title}</ReminderTitle>
        <ReminderStatus>
          <StatusBadge isActive={reminder.isActive}>
            {reminder.isActive ? "Active" : "Inactive"}
          </StatusBadge>
        </ReminderStatus>
      </ReminderHeader>

      <ReminderBody>
        <ReminderDetails>
          {reminder.amount && `Amount: $${reminder.amount} • `}
          Due:{" "}
          {reminder.dueDate
            ? new Date(reminder.dueDate).toLocaleDateString()
            : "No date set"}
        </ReminderDetails>

        <ReminderRecipients>
          Recipients:{" "}
          {reminder.recipients?.map((r) => r.name).join(", ") ||
            "No recipients"}
        </ReminderRecipients>

        <ReminderMessage>{reminder.message}</ReminderMessage>
      </ReminderBody>

      <ReminderActions>
        <PrimaryButton onClick={() => onSend(reminder._id)}>
          <Send size={16} />
          Send Now
        </PrimaryButton>

        <SecondaryButton onClick={() => onEdit(reminder)}>
          <Edit size={16} />
          Edit
        </SecondaryButton>

        <DangerButton
          onClick={() => onDelete(reminder._id, reminder.title)}
          aria-label={`Delete ${reminder.title}`}
        >
          <Trash2 size={16} />
        </DangerButton>
      </ReminderActions>
    </ReminderDetailCard>
  );
};

export default ReminderCard;
