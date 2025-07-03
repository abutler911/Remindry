// src/components/reminders/ReminderModal.js
import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

const ReminderModal = ({
  isOpen,
  onClose,
  onSave,
  editingReminder = null,
  contacts = [],
  loading = false,
}) => {
  const defaultState = {
    title: "",
    message: "",
    recipients: [],
    amount: "",
    dueDate: "",
    schedule: {
      type: "monthly",
      dayOfMonth: 15,
      time: "10:00",
    },
    reminderOffsets: [3, 1, 0],
  };

  const [formData, setFormData] = useState(defaultState);

  useEffect(() => {
    if (isOpen) {
      if (editingReminder) {
        setFormData({
          title: editingReminder.title,
          message: editingReminder.message,
          recipients: editingReminder.recipients?.map((r) => r._id) || [],
          amount: editingReminder.amount || "",
          dueDate: editingReminder.dueDate
            ? new Date(editingReminder.dueDate).toISOString().split("T")[0]
            : "",
          schedule: editingReminder.schedule || defaultState.schedule,
          reminderOffsets: editingReminder.reminderOffsets || [3, 1, 0],
        });
      } else {
        setFormData(defaultState);
      }
    }
  }, [isOpen, editingReminder]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleScheduleChange = (field) => (e) => {
    const value =
      field === "dayOfMonth" ? parseInt(e.target.value) : e.target.value;
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [field]: value,
      },
    }));
  };

  const handleRecipientChange = (id) => (e) => {
    if (e.target.checked) {
      setFormData((prev) => ({
        ...prev,
        recipients: [...prev.recipients, id],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        recipients: prev.recipients.filter((rid) => rid !== id),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Force the due date to local midnight to avoid timezone shift
    const localMidnightDueDate = formData.dueDate
      ? new Date(`${formData.dueDate}T00:00:00`)
      : null;

    const reminderData = {
      ...formData,
      amount: formData.amount ? parseFloat(formData.amount) : null,
      dueDate: localMidnightDueDate ? localMidnightDueDate.toISOString() : null,
    };

    try {
      await onSave(reminderData);
      onClose();
    } catch (error) {
      console.error("Save failed", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingReminder ? "Edit Reminder" : "Add New Reminder"}
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="reminder-title">
              Title *
            </label>
            <input
              id="reminder-title"
              type="text"
              className="form-input"
              value={formData.title}
              onChange={handleChange("title")}
              placeholder="Car Payment"
              required
              autoFocus
            />
          </div>

          <div className="form-group form-group-full">
            <label className="form-label" htmlFor="reminder-message">
              Message Template *
            </label>
            <textarea
              id="reminder-message"
              className="form-input form-textarea"
              rows="3"
              value={formData.message}
              onChange={handleChange("message")}
              placeholder="Hey {name}, your {title} of {amount} is due on {dueDate}. Please pay it today!"
              required
            />
            <p className="form-hint">
              Use variables: {"{name}"}, {"{title}"}, {"{amount}"},{" "}
              {"{dueDate}"}
            </p>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reminder-amount">
              Amount ($)
            </label>
            <input
              id="reminder-amount"
              type="number"
              className="form-input"
              value={formData.amount}
              onChange={handleChange("amount")}
              placeholder="450"
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reminder-due-date">
              Due Date
            </label>
            <input
              id="reminder-due-date"
              type="date"
              className="form-input"
              value={formData.dueDate}
              onChange={handleChange("dueDate")}
            />
          </div>

          <div className="form-group form-group-full">
            <label className="form-label">Recipients *</label>
            {contacts.length === 0 ? (
              <p className="form-hint">
                No contacts available. Please add contacts first.
              </p>
            ) : (
              <div className="recipients-grid">
                {contacts.map((contact) => (
                  <label key={contact._id} className="recipient-option">
                    <input
                      type="checkbox"
                      checked={formData.recipients.includes(contact._id)}
                      onChange={handleRecipientChange(contact._id)}
                      className="recipient-checkbox"
                    />
                    <span className="recipient-name">{contact.name}</span>
                    <span className="recipient-phone">{contact.phone}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="schedule-type">
              Schedule Type
            </label>
            <select
              id="schedule-type"
              className="form-input"
              value={formData.schedule.type}
              onChange={handleScheduleChange("type")}
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="one-time">One-time</option>
            </select>
          </div>

          {formData.schedule.type === "monthly" && (
            <div className="form-group">
              <label className="form-label" htmlFor="day-of-month">
                Day of Month
              </label>
              <input
                id="day-of-month"
                type="number"
                min="1"
                max="31"
                className="form-input"
                value={formData.schedule.dayOfMonth}
                onChange={handleScheduleChange("dayOfMonth")}
              />
            </div>
          )}
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <Button
            type="submit"
            fullWidth
            disabled={
              loading ||
              !formData.title.trim() ||
              !formData.message.trim() ||
              formData.recipients.length === 0
            }
            icon={<Save size={16} />}
          >
            {loading
              ? "Saving..."
              : editingReminder
              ? "Update Reminder"
              : "Create Reminder"}
          </Button>

          <Button
            variant="secondary"
            fullWidth
            onClick={onClose}
            disabled={loading}
            style={{ marginTop: "0.5rem" }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ReminderModal;
