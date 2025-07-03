// src/components/reminders/ReminderModal.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Save } from "lucide-react";

// Modal Styled Components (simplified version for this component)
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 720px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: ${(props) =>
    props.isOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)"};
  transition: all 0.3s ease;
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: #ffffff;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  max-height: 60vh;
  overflow-y: auto;
`;

const ModalFooter = styled.div`
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// Form Styled Components
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  ${(props) =>
    props.fullWidth &&
    `
    @media (min-width: 640px) {
      grid-column: 1 / -1;
    }
  `}
`;

const FormLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;

  &::after {
    content: ${(props) => (props.required ? '" *"' : '""')};
    color: #ef4444;
    margin-left: 0.25rem;
  }
`;

const FormInput = styled.input`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:invalid {
    border-color: #ef4444;
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    background: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    background: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }
`;

const FormSelect = styled.select`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }
`;

const FormHint = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
  margin-top: 0.25rem;
`;

// Recipients Grid Components
const RecipientsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const RecipientOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }

  &:has(input:checked) {
    background: rgba(59, 130, 246, 0.1);
    border-color: #3b82f6;
  }
`;

const RecipientCheckbox = styled.input`
  width: 1.125rem;
  height: 1.125rem;
  accent-color: #3b82f6;
  cursor: pointer;
`;

const RecipientInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  flex: 1;
`;

const RecipientName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
`;

const RecipientPhone = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
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
  width: 100%;

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

const SecondaryButton = styled(Button)`
  background: #f8fafc;
  color: #475569;
  border: 1px solid #e2e8f0;

  &:hover:not(:disabled) {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen && !loading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer isOpen={isOpen}>
        <ModalHeader>
          <ModalTitle>
            {editingReminder ? "Edit Reminder" : "Add New Reminder"}
          </ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGrid>
              <FormGroup>
                <FormLabel htmlFor="reminder-title" required>
                  Title
                </FormLabel>
                <FormInput
                  id="reminder-title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange("title")}
                  placeholder="Car Payment"
                  required
                  autoFocus
                  disabled={loading}
                />
              </FormGroup>

              <FormGroup fullWidth>
                <FormLabel htmlFor="reminder-message" required>
                  Message Template
                </FormLabel>
                <FormTextarea
                  id="reminder-message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange("message")}
                  placeholder="Hey {name}, your {title} of {amount} is due on {dueDate}. Please pay it today!"
                  required
                  disabled={loading}
                />
                <FormHint>
                  Use variables: {"{name}"}, {"{title}"}, {"{amount}"},{" "}
                  {"{dueDate}"}
                </FormHint>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="reminder-amount">Amount ($)</FormLabel>
                <FormInput
                  id="reminder-amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange("amount")}
                  placeholder="450"
                  min="0"
                  step="0.01"
                  disabled={loading}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="reminder-due-date">Due Date</FormLabel>
                <FormInput
                  id="reminder-due-date"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange("dueDate")}
                  disabled={loading}
                />
              </FormGroup>

              <FormGroup fullWidth>
                <FormLabel required>Recipients</FormLabel>
                {contacts.length === 0 ? (
                  <FormHint>
                    No contacts available. Please add contacts first.
                  </FormHint>
                ) : (
                  <RecipientsGrid>
                    {contacts.map((contact) => (
                      <RecipientOption key={contact._id}>
                        <RecipientCheckbox
                          type="checkbox"
                          checked={formData.recipients.includes(contact._id)}
                          onChange={handleRecipientChange(contact._id)}
                          disabled={loading}
                        />
                        <RecipientInfo>
                          <RecipientName>{contact.name}</RecipientName>
                          <RecipientPhone>{contact.phone}</RecipientPhone>
                        </RecipientInfo>
                      </RecipientOption>
                    ))}
                  </RecipientsGrid>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="schedule-type">Schedule Type</FormLabel>
                <FormSelect
                  id="schedule-type"
                  value={formData.schedule.type}
                  onChange={handleScheduleChange("type")}
                  disabled={loading}
                >
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="one-time">One-time</option>
                </FormSelect>
              </FormGroup>

              {formData.schedule.type === "monthly" && (
                <FormGroup>
                  <FormLabel htmlFor="day-of-month">Day of Month</FormLabel>
                  <FormInput
                    id="day-of-month"
                    type="number"
                    min="1"
                    max="31"
                    value={formData.schedule.dayOfMonth}
                    onChange={handleScheduleChange("dayOfMonth")}
                    disabled={loading}
                  />
                </FormGroup>
              )}
            </FormGrid>

            <ButtonContainer>
              <PrimaryButton
                type="submit"
                disabled={
                  loading ||
                  !formData.title.trim() ||
                  !formData.message.trim() ||
                  formData.recipients.length === 0
                }
              >
                <Save size={16} />
                {loading
                  ? "Saving..."
                  : editingReminder
                  ? "Update Reminder"
                  : "Create Reminder"}
              </PrimaryButton>

              <SecondaryButton
                type="button"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </SecondaryButton>
            </ButtonContainer>
          </Form>
        </ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ReminderModal;
