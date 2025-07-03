// src/components/dashboard/ActiveReminders.js
import React from "react";
import { Send, Edit, MessageSquare, Plus } from "lucide-react";
import { Card, EmptyState } from "../ui/Card";
import Button from "../ui/Button";

const ReminderItem = ({ reminder, onSend, onEdit }) => {
  return (
    <div className="reminder-card">
      <div className="reminder-info">
        <h3 className="reminder-title">{reminder.title}</h3>
        <p className="reminder-details">
          {reminder.amount && `$${reminder.amount} • `}
          Due:{" "}
          {reminder.dueDate
            ? new Date(reminder.dueDate).toLocaleDateString()
            : "No date set"}{" "}
          • Recipients:{" "}
          {reminder.recipients?.map((r) => r.name).join(", ") ||
            "No recipients"}
        </p>
        <p className="reminder-message">"{reminder.message}"</p>
      </div>
      <div className="reminder-actions">
        <Button
          size="sm"
          icon={<Send size={14} />}
          onClick={() => onSend(reminder._id)}
        >
          Send
        </Button>
        <Button
          variant="icon"
          onClick={() => onEdit(reminder)}
          aria-label={`Edit ${reminder.title}`}
        >
          <Edit size={16} />
        </Button>
      </div>
    </div>
  );
};

const ActiveReminders = ({ reminders, onSend, onEdit, onAdd, loading }) => {
  if (loading) {
    return (
      <Card header={<h2 className="section-title">Active Reminders</h2>}>
        <p className="empty-message">Loading reminders...</p>
      </Card>
    );
  }

  return (
    <Card header={<h2 className="section-title">Active Reminders</h2>}>
      {reminders.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          message="No reminders yet. Create one to get started!"
          action={
            <Button icon={<Plus size={16} />} onClick={onAdd}>
              Create First Reminder
            </Button>
          }
        />
      ) : (
        <div className="reminders-list">
          {reminders.map((reminder) => (
            <ReminderItem
              key={reminder._id}
              reminder={reminder}
              onSend={onSend}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default ActiveReminders;
