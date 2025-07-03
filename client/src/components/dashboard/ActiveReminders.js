// src/components/dashboard/ActiveReminders.js
import React from "react";
import styled, { keyframes } from "styled-components";
import { Send, Edit, MessageSquare, Plus } from "lucide-react";

// Animation keyframes
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

// Styled Components for ActiveReminders
const RemindersContainer = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #f1f5f9;
  background: #ffffff;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RemindersContent = styled.div`
  padding: 1.5rem;
`;

const RemindersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReminderCardContainer = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.4s ease-out;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ReminderInfo = styled.div`
  flex: 1;
  margin-bottom: 1rem;
`;

const ReminderTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
`;

const ReminderDetails = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
`;

const ReminderMessage = styled.p`
  font-size: 0.875rem;
  color: #475569;
  margin: 0;
  font-style: italic;
  padding: 0.75rem;
  background: white;
  border-radius: 8px;
  border-left: 3px solid #3b82f6;
  line-height: 1.4;
`;

const ReminderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

// Button Components
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${(props) =>
    props.size === "sm" ? "0.5rem 1rem" : "0.75rem 1.5rem"};
  border-radius: 8px;
  font-size: ${(props) => (props.size === "sm" ? "0.8rem" : "0.875rem")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

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
  background: #3b82f6;
  color: white;

  &:hover:not(:disabled) {
    background: #2563eb;
    transform: translateY(-1px);
  }
`;

const IconButton = styled(Button)`
  background: #f8fafc;
  color: #475569;
  border: 1px solid #e2e8f0;
  padding: 0.5rem;
  min-width: auto;

  &:hover:not(:disabled) {
    background: #f1f5f9;
    border-color: #cbd5e1;
    color: #334155;
  }
`;

// Empty State Components
const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out;
`;

const EmptyStateIcon = styled.div`
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
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #64748b;
  font-size: 1rem;
  margin: 2rem 0;
  animation: ${fadeIn} 0.4s ease-out;
`;

// Components
const ReminderItem = ({ reminder, onSend, onEdit }) => {
  return (
    <ReminderCardContainer>
      <ReminderInfo>
        <ReminderTitle>{reminder.title}</ReminderTitle>
        <ReminderDetails>
          {reminder.amount && `$${reminder.amount} • `}
          Due:{" "}
          {reminder.dueDate
            ? new Date(reminder.dueDate).toLocaleDateString()
            : "No date set"}{" "}
          • Recipients:{" "}
          {reminder.recipients?.map((r) => r.name).join(", ") ||
            "No recipients"}
        </ReminderDetails>
        <ReminderMessage>"{reminder.message}"</ReminderMessage>
      </ReminderInfo>
      <ReminderActions>
        <PrimaryButton size="sm" onClick={() => onSend(reminder._id)}>
          <Send size={14} />
          Send
        </PrimaryButton>
        <IconButton
          onClick={() => onEdit(reminder)}
          aria-label={`Edit ${reminder.title}`}
        >
          <Edit size={16} />
        </IconButton>
      </ReminderActions>
    </ReminderCardContainer>
  );
};

const EmptyState = ({ icon: Icon, message, action }) => (
  <EmptyStateContainer>
    <EmptyStateIcon>
      <Icon size={32} />
    </EmptyStateIcon>
    <EmptyStateMessage>{message}</EmptyStateMessage>
    {action}
  </EmptyStateContainer>
);

const ActiveReminders = ({ reminders, onSend, onEdit, onAdd, loading }) => {
  if (loading) {
    return (
      <RemindersContainer>
        <SectionHeader>
          <SectionTitle>
            <MessageSquare size={24} />
            Active Reminders
          </SectionTitle>
        </SectionHeader>
        <RemindersContent>
          <LoadingMessage>Loading reminders...</LoadingMessage>
        </RemindersContent>
      </RemindersContainer>
    );
  }

  return (
    <RemindersContainer>
      <SectionHeader>
        <SectionTitle>
          <MessageSquare size={24} />
          Active Reminders
        </SectionTitle>
      </SectionHeader>
      <RemindersContent>
        {reminders.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            message="No reminders yet. Create one to get started!"
            action={
              <PrimaryButton onClick={onAdd}>
                <Plus size={16} />
                Create First Reminder
              </PrimaryButton>
            }
          />
        ) : (
          <RemindersList>
            {reminders.map((reminder) => (
              <ReminderItem
                key={reminder._id}
                reminder={reminder}
                onSend={onSend}
                onEdit={onEdit}
              />
            ))}
          </RemindersList>
        )}
      </RemindersContent>
    </RemindersContainer>
  );
};

export default ActiveReminders;
