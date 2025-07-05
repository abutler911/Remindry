// src/components/dashboard/ActiveReminders.js
import React from "react";
import styled, { keyframes } from "styled-components";
import {
  Send,
  Edit,
  MessageSquare,
  Plus,
  ChevronRight,
  Clock,
  Users,
  DollarSign,
} from "lucide-react";

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

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Styled Components
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
  padding: 0; // Remove padding for list items to go edge-to-edge
`;

const RemindersList = styled.div`
  display: flex;
  flex-direction: column;
`;

// New: Compact reminder list item
const ReminderListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  cursor: pointer;
  animation: ${slideIn} 0.3s ease-out;

  &:hover {
    background: #f8fafc;
    border-left: 4px solid #3b82f6;
    padding-left: 1.25rem; // Compensate for border
  }

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background: #f1f5f9;
    transform: scale(0.995);
  }
`;

const ReminderMainInfo = styled.div`
  flex: 1;
  min-width: 0; // Allow text truncation
`;

const ReminderTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
  line-height: 1.3;

  // Truncate long titles
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ReminderSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.25rem;
`;

const ReminderMeta = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #64748b;

  svg {
    width: 12px;
    height: 12px;
    opacity: 0.7;
  }
`;

const ReminderPreview = styled.p`
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
  line-height: 1.3;

  // Truncate message preview
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 250px;

  @media (max-width: 768px) {
    max-width: 150px;
  }
`;

const ReminderActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const StatusIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) =>
    props.isOverdue ? "#ef4444" : props.isDueSoon ? "#f59e0b" : "#10b981"};
  margin-right: 0.75rem;
  flex-shrink: 0;
`;

const ChevronIcon = styled.div`
  color: #94a3b8;
  transition: transform 0.2s ease;

  ${ReminderListItem}:hover & {
    transform: translateX(2px);
    color: #64748b;
  }
`;

// Compact action buttons
const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 32px;
  height: 32px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SendButton = styled(ActionButton)`
  background: #10b981;
  color: white;

  &:hover:not(:disabled) {
    background: #059669;
    transform: scale(1.05);
  }
`;

const EditButton = styled(ActionButton)`
  background: #f8fafc;
  color: #475569;
  border: 1px solid #e2e8f0;

  &:hover:not(:disabled) {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

// ViewMore component for when there are many reminders
const ViewMoreButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #f8fafc;
  border: none;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #f1f5f9;
    color: #334155;
  }
`;

// Utility functions
const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};

const isDueSoon = (dueDate) => {
  if (!dueDate) return false;
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 3 && diffDays >= 0;
};

const formatDueDate = (dueDate) => {
  if (!dueDate) return "No due date";

  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  if (diffDays === -1) return "Due yesterday";
  if (diffDays < -1) return `${Math.abs(diffDays)} days overdue`;
  if (diffDays <= 7) return `Due in ${diffDays} days`;

  return due.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const truncateMessage = (message, maxLength = 60) => {
  if (!message || message.length <= maxLength) return message;
  return message.substring(0, maxLength) + "...";
};

// Components
const ReminderListItemComponent = ({
  reminder,
  onSend,
  onEdit,
  onViewDetails,
  index,
}) => {
  const handleClick = (e) => {
    // Don't trigger if clicking on action buttons
    if (e.target.closest("button")) return;
    onViewDetails(reminder);
  };

  const handleSend = (e) => {
    e.stopPropagation();
    onSend(reminder._id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(reminder);
  };

  return (
    <ReminderListItem
      onClick={handleClick}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <StatusIndicator
        isOverdue={isOverdue(reminder.dueDate)}
        isDueSoon={isDueSoon(reminder.dueDate)}
      />

      <ReminderMainInfo>
        <ReminderTitle>{reminder.title}</ReminderTitle>

        <ReminderSummary>
          <ReminderMeta>
            <Clock />
            {formatDueDate(reminder.dueDate)}
          </ReminderMeta>

          {reminder.amount && (
            <ReminderMeta>
              <DollarSign />${reminder.amount}
            </ReminderMeta>
          )}

          <ReminderMeta>
            <Users />
            {reminder.recipients?.length || 0} recipient
            {reminder.recipients?.length !== 1 ? "s" : ""}
          </ReminderMeta>
        </ReminderSummary>

        <ReminderPreview>{truncateMessage(reminder.message)}</ReminderPreview>
      </ReminderMainInfo>

      <ReminderActions>
        <SendButton onClick={handleSend} title="Send reminder now">
          <Send size={14} />
        </SendButton>

        <EditButton onClick={handleEdit} title="Edit reminder">
          <Edit size={14} />
        </EditButton>
      </ReminderActions>

      <ChevronIcon>
        <ChevronRight size={16} />
      </ChevronIcon>
    </ReminderListItem>
  );
};

// Empty State Components (keeping existing)
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

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #64748b;
  font-size: 1rem;
  margin: 2rem 0;
  animation: ${fadeIn} 0.4s ease-out;
`;

const EmptyState = ({ icon: Icon, message, action }) => (
  <EmptyStateContainer>
    <EmptyStateIcon>
      <Icon size={32} />
    </EmptyStateIcon>
    <EmptyStateMessage>{message}</EmptyStateMessage>
    {action}
  </EmptyStateContainer>
);

// Main component
const ActiveReminders = ({
  reminders,
  onSend,
  onEdit,
  onAdd,
  onViewDetails, // New prop for viewing full reminder
  loading,
  maxDisplayCount = 5, // Configurable limit for dashboard
}) => {
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

  const displayedReminders = reminders.slice(0, maxDisplayCount);
  const hasMore = reminders.length > maxDisplayCount;

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
          <>
            <RemindersList>
              {displayedReminders.map((reminder, index) => (
                <ReminderListItemComponent
                  key={reminder._id}
                  reminder={reminder}
                  onSend={onSend}
                  onEdit={onEdit}
                  onViewDetails={onViewDetails}
                  index={index}
                />
              ))}
            </RemindersList>

            {hasMore && (
              <ViewMoreButton onClick={() => onViewDetails("viewAll")}>
                View {reminders.length - maxDisplayCount} more reminders
                <ChevronRight size={16} />
              </ViewMoreButton>
            )}
          </>
        )}
      </RemindersContent>
    </RemindersContainer>
  );
};

export default ActiveReminders;
