// src/components/reminders/ReminderCard.js
import React from "react";
import { Send, Edit, Trash2 } from "lucide-react";
import { Card } from "../ui/Card";
import Button from "../ui/Button";

const ReminderCard = ({ reminder, onEdit, onDelete, onSend }) => {
  return (
    <Card className="reminder-detail-card">
      <div className="reminder-header">
        <h3 className="reminder-title">{reminder.title}</h3>
        <div className="reminder-status">
          <span
            className={`status-badge ${
              reminder.isActive ? "status-active" : "status-inactive"
            }`}
          >
            {reminder.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="reminder-body">
        <p className="reminder-details">
          {reminder.amount && `Amount: $${reminder.amount} • `}
          Due:{" "}
          {reminder.dueDate
            ? new Date(reminder.dueDate).toLocaleDateString()
            : "No date set"}
        </p>
        <p className="reminder-recipients">
          Recipients:{" "}
          {reminder.recipients?.map((r) => r.name).join(", ") ||
            "No recipients"}
        </p>
        <p className="reminder-message">"{reminder.message}"</p>
      </div>

      <div className="reminder-actions">
        <Button onClick={() => onSend(reminder._id)}>Send Now</Button>
        <Button variant="secondary" onClick={() => onEdit(reminder)}>
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => onDelete(reminder._id)}
          aria-label={`Delete ${reminder.title}`}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default ReminderCard;
