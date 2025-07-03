// src/components/reminders/RemindersView.js
import React from "react";
import { Plus, MessageSquare } from "lucide-react";
import ReminderCard from "./ReminderCard";
import ReminderModal from "./ReminderModal";
import Button from "../ui/Button";
import { EmptyState } from "../ui/Card";
import { useModal } from "../../hooks/useModal";

const RemindersView = ({
  reminders,
  contacts,
  onCreateReminder,
  onUpdateReminder,
  onDeleteReminder,
  onSendReminder,
  loading,
}) => {
  const reminderModal = useModal();

  const handleEdit = (reminder) => {
    reminderModal.open(reminder);
  };

  const handleDelete = async (reminderId) => {
    if (window.confirm("Are you sure you want to delete this reminder?")) {
      try {
        await onDeleteReminder(reminderId);
      } catch (error) {
        // Error handling is done in parent component
      }
    }
  };

  const handleSave = async (reminderData) => {
    if (reminderModal.data) {
      // Editing existing reminder
      await onUpdateReminder(reminderModal.data._id, reminderData);
    } else {
      // Creating new reminder
      await onCreateReminder(reminderData);
    }
  };

  if (loading) {
    return (
      <div className="reminders-view">
        <div className="page-header">
          <h2 className="page-title">Reminders</h2>
          <Button icon={<Plus size={16} />} disabled>
            Add Reminder
          </Button>
        </div>
        <div className="loading-state">
          <p>Loading reminders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reminders-view">
      <div className="page-header">
        <h2 className="page-title">Reminders</h2>
        <Button icon={<Plus size={16} />} onClick={() => reminderModal.open()}>
          Add Reminder
        </Button>
      </div>

      {reminders.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          message="No reminders yet. Create your first reminder to start automating!"
          action={
            <Button
              icon={<Plus size={16} />}
              onClick={() => reminderModal.open()}
            >
              Create First Reminder
            </Button>
          }
        />
      ) : (
        <div className="reminders-grid">
          {reminders.map((reminder) => (
            <ReminderCard
              key={reminder._id}
              reminder={reminder}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSend={onSendReminder}
            />
          ))}
        </div>
      )}

      <ReminderModal
        isOpen={reminderModal.isOpen}
        onClose={reminderModal.close}
        onSave={handleSave}
        editingReminder={reminderModal.data}
        contacts={contacts}
        loading={loading}
      />
    </div>
  );
};

export default RemindersView;
