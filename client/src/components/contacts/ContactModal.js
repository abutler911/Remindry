// src/components/contacts/ContactModal.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Save, X } from "lucide-react";

// Modal Styled Components
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
  max-width: 500px;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  color: #718096;
  transition: all 0.2s ease;

  &:hover {
    background: #f7fafc;
    color: #4a5568;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
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
  gap: 0.75rem;
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

  @media (min-width: 480px) {
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
    @media (min-width: 480px) {
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

const FormHint = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
  margin-top: 0.25rem;
`;

// Button Styled Components
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
  text-decoration: none;

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

  &:active:not(:disabled) {
    transform: translateY(0);
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

const ContactModal = ({
  isOpen,
  onClose,
  onSave,
  editingContact = null,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    tags: "",
  });

  // Reset form when modal opens/closes or editing contact changes
  useEffect(() => {
    if (isOpen) {
      if (editingContact) {
        setFormData({
          name: editingContact.name,
          phone: editingContact.phone,
          tags: editingContact.tags?.join(", ") || "",
        });
      } else {
        setFormData({
          name: "",
          phone: "",
          tags: "",
        });
      }
    }
  }, [isOpen, editingContact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };
    try {
      await onSave(contactData);
      onClose();
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
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
            {editingContact ? "Edit Contact" : "Add New Contact"}
          </ModalTitle>
          <CloseButton onClick={onClose} disabled={loading}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGrid>
              <FormGroup>
                <FormLabel htmlFor="contact-name" required>
                  Name
                </FormLabel>
                <FormInput
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange("name")}
                  placeholder="Enter contact name"
                  required
                  autoFocus
                  disabled={loading}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="contact-phone" required>
                  Phone Number
                </FormLabel>
                <FormInput
                  id="contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  placeholder="+1234567890"
                  required
                  disabled={loading}
                />
              </FormGroup>

              <FormGroup fullWidth>
                <FormLabel htmlFor="contact-tags">
                  Tags (comma separated)
                </FormLabel>
                <FormInput
                  id="contact-tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleChange("tags")}
                  placeholder="daughter, has-car, college"
                  disabled={loading}
                />
                <FormHint>Add tags to organize your contacts</FormHint>
              </FormGroup>
            </FormGrid>
          </Form>
        </ModalBody>

        <ModalFooter>
          <PrimaryButton
            type="submit"
            onClick={handleSubmit}
            disabled={
              loading || !formData.name.trim() || !formData.phone.trim()
            }
          >
            <Save size={16} />
            {loading
              ? "Saving..."
              : editingContact
              ? "Update Contact"
              : "Create Contact"}
          </PrimaryButton>
          <SecondaryButton onClick={onClose} disabled={loading}>
            Cancel
          </SecondaryButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ContactModal;
