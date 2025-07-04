import React from "react";
import styled, { keyframes } from "styled-components";
import { Plus, MessageSquare, Clock } from "lucide-react";
import ReminderCard from "./ReminderCard";
import ReminderModal from "./ReminderModal";
import Modal from "../ui/Modal";
import { useModal } from "../../hooks/useModal";
import { reminderApi } from "../../services/api";

const fadeIn = keyframes`
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
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Components
const RemindersContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const PageTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RemindersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  animation: ${fadeIn} 0.6s ease-out 0.2s both;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-2px);
  }
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`;

const LoadingText = styled.p`
  font-size: 1rem;
  color: #6b7280;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px dashed #cbd5e1;
  margin-top: 2rem;
`;

const EmptyStateIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
`;

const EmptyStateMessage = styled.p`
  font-size: 1.125rem;
  color: #4a5568;
  max-width: 400px;
`;

const EmptyState = ({ icon: Icon, message }) => (
  <EmptyStateContainer>
    <EmptyStateIcon>
      <Icon size={40} />
    </EmptyStateIcon>
    <EmptyStateMessage>{message}</EmptyStateMessage>
  </EmptyStateContainer>
);

// Main Component
const RemindersView = ({
  reminders,
  contacts,
  loading,
  onCreateReminder,
  onUpdateReminder,
  onDeleteReminder,
  onSendReminder,
}) => {
  const reminderModal = useModal();
  const [confirmDelete, setConfirmDelete] = React.useState({
    open: false,
    reminderId: null,
    title: "",
  });

  const handleEdit = (reminder) => reminderModal.open(reminder);

  const handleDelete = (reminderId, title) => {
    setConfirmDelete({ open: true, reminderId, title });
  };

  const confirmActualDelete = async () => {
    try {
      await reminderApi.delete(confirmDelete.reminderId);
      await onDeleteReminder(confirmDelete.reminderId);
    } catch (err) {
      console.error("Failed to delete reminder:", err);
    } finally {
      setConfirmDelete({ open: false, reminderId: null, title: "" });
    }
  };

  const handleToggleComplete = async (reminderId, newState) => {
    try {
      await reminderApi.updateStatus(reminderId, newState);
      await onUpdateReminder(reminderId, { isActive: newState });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleSave = async (data) => {
    try {
      if (reminderModal.data) {
        await reminderApi.update(reminderModal.data._id, data);
        await onUpdateReminder(reminderModal.data._id, data);
      } else {
        const newReminder = await reminderApi.create(data);
        await onCreateReminder(newReminder);
      }
      reminderModal.close();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  if (loading) {
    return (
      <RemindersContainer>
        <PageHeader>
          <PageTitle>
            <Clock size={28} />
            Reminders
          </PageTitle>
          <Button disabled>
            <Plus size={16} />
            Add Reminder
          </Button>
        </PageHeader>
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Loading reminders...</LoadingText>
        </LoadingContainer>
      </RemindersContainer>
    );
  }

  return (
    <>
      <RemindersContainer>
        <PageHeader>
          <PageTitle>
            <Clock size={28} />
            Reminders
          </PageTitle>
          <Button onClick={() => reminderModal.open()}>
            <Plus size={16} />
            Add Reminder
          </Button>
        </PageHeader>

        {reminders.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            message="No reminders yet. Use the 'Add Reminder' button above to create your first automated reminder!"
          />
        ) : (
          <RemindersGrid>
            {reminders.map((reminder) => (
              <ReminderCard
                key={reminder._id}
                reminder={reminder}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSend={onSendReminder}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </RemindersGrid>
        )}

        <ReminderModal
          isOpen={reminderModal.isOpen}
          onClose={reminderModal.close}
          onSave={handleSave}
          editingReminder={reminderModal.data}
          contacts={contacts}
          loading={loading}
        />
      </RemindersContainer>

      <Modal
        isOpen={confirmDelete.open}
        onClose={() =>
          setConfirmDelete({ open: false, reminderId: null, title: "" })
        }
        title="Confirm Deletion"
        actions={
          <>
            <button
              onClick={() =>
                setConfirmDelete({ open: false, reminderId: null, title: "" })
              }
            >
              Cancel
            </button>
            <button
              onClick={confirmActualDelete}
              style={{ backgroundColor: "#e53e3e", color: "#fff" }}
            >
              Delete
            </button>
          </>
        }
      >
        <p>
          Are you sure you want to delete <strong>{confirmDelete.title}</strong>
          ?
        </p>
      </Modal>
    </>
  );
};

export default RemindersView;
