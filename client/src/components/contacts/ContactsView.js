// src/components/contacts/ContactsView.js
import React from "react";
import styled, { keyframes } from "styled-components";
import { Plus, Users } from "lucide-react";
import ContactCard from "./ContactCard";
import ContactModal from "./ContactModal";
import ConfirmationModal from "../ui/ConfirmationModal";
import AlertModal from "../ui/AlertModal";
import { useModal } from "../../hooks/useModal";
import { useConfirmation } from "../../hooks/useConfirmation";
import { useAlert } from "../../hooks/useAlert";

// Gentle animation keyframes
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

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

// Clean, professional container
const ContactsContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.75rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);

  &:hover:not(:disabled) {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 0 0.5rem;
  }

  /* Subtle staggered animation for cards */
  & > * {
    animation: ${fadeInUp} 0.5s ease-out;
    animation-fill-mode: both;
  }

  & > *:nth-child(1) {
    animation-delay: 0.1s;
  }
  & > *:nth-child(2) {
    animation-delay: 0.15s;
  }
  & > *:nth-child(3) {
    animation-delay: 0.2s;
  }
  & > *:nth-child(4) {
    animation-delay: 0.25s;
  }
  & > *:nth-child(5) {
    animation-delay: 0.3s;
  }
  & > *:nth-child(6) {
    animation-delay: 0.35s;
  }
  & > *:nth-child(n + 7) {
    animation-delay: 0.4s;
  }
`;

// Clean loading state
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: 1rem;
  color: #64748b;
  margin: 0;
  animation: ${pulse} 2s ease-in-out infinite;
  font-weight: 500;
`;

// Elegant empty state
const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  margin-top: 2rem;
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const EmptyStateIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
`;

const EmptyStateMessage = styled.p`
  font-size: 1.125rem;
  color: #475569;
  margin: 0 0 2rem 0;
  max-width: 400px;
  line-height: 1.6;
`;

const EmptyStateButton = styled(AddButton)`
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
  }
`;

// Empty State Component
const EmptyState = ({ icon: Icon, message, action }) => (
  <EmptyStateContainer>
    <EmptyStateIcon>
      <Icon size={40} />
    </EmptyStateIcon>
    <EmptyStateMessage>{message}</EmptyStateMessage>
    {action}
  </EmptyStateContainer>
);

const ContactsView = ({
  contacts,
  onCreateContact,
  onUpdateContact,
  onDeleteContact,
  loading,
}) => {
  const contactModal = useModal();
  const confirmation = useConfirmation();
  const alert = useAlert();

  const handleEdit = (contact) => {
    contactModal.open(contact);
  };

  const handleDelete = async (contactId, contactName) => {
    const confirmed = await confirmation.confirm({
      title: "Delete Contact",
      message: `Are you sure you want to delete "${contactName}"? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
    });

    if (confirmed) {
      try {
        await onDeleteContact(contactId);
        alert.showAlert({
          title: "Success",
          message: "Contact deleted successfully!",
          type: "success",
        });
      } catch (error) {
        alert.showAlert({
          title: "Error",
          message: `Failed to delete contact: ${error.message}`,
          type: "error",
        });
      }
    }
  };

  const handleMessage = (contact) => {
    console.log(`Message ${contact.name} at ${contact.phone}`);

    alert.showAlert({
      title: "Message Feature",
      message: `Quick message feature for ${contact.name} coming soon!`,
      type: "info",
    });
  };

  const handleSave = async (contactData) => {
    try {
      if (contactModal.data) {
        await onUpdateContact(contactModal.data._id, contactData);
        alert.showAlert({
          title: "Success",
          message: "Contact updated successfully!",
          type: "success",
        });
      } else {
        await onCreateContact(contactData);
        alert.showAlert({
          title: "Success",
          message: "Contact created successfully!",
          type: "success",
        });
      }
    } catch (error) {
      alert.showAlert({
        title: "Error",
        message: `Failed to save contact: ${error.message}`,
        type: "error",
      });
      throw error;
    }
  };

  if (loading) {
    return (
      <ContactsContainer>
        <PageHeader>
          <PageTitle>
            <Users size={36} />
            Contacts
          </PageTitle>
          <AddButton disabled>
            <Plus size={20} />
            Add Contact
          </AddButton>
        </PageHeader>
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Loading contacts...</LoadingText>
        </LoadingContainer>
      </ContactsContainer>
    );
  }

  return (
    <ContactsContainer>
      <PageHeader>
        <PageTitle>
          <Users size={36} />
          Contacts
        </PageTitle>
        <AddButton onClick={() => contactModal.open()}>
          <Plus size={20} />
          Add Contact
        </AddButton>
      </PageHeader>

      {contacts.length === 0 ? (
        <EmptyState
          icon={Users}
          message="No contacts yet. Add your first contact to get started!"
          action={
            <EmptyStateButton onClick={() => contactModal.open()}>
              <Plus size={20} />
              Add First Contact
            </EmptyStateButton>
          }
        />
      ) : (
        <ContactsGrid>
          {contacts.map((contact) => (
            <ContactCard
              key={contact._id}
              contact={contact}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onMessage={handleMessage}
            />
          ))}
        </ContactsGrid>
      )}

      <ContactModal
        isOpen={contactModal.isOpen}
        onClose={contactModal.close}
        onSave={handleSave}
        editingContact={contactModal.data}
        loading={loading}
      />

      <ConfirmationModal
        isOpen={confirmation.isOpen}
        onClose={confirmation.handleClose}
        onConfirm={confirmation.handleConfirm}
        {...confirmation.config}
      />

      <AlertModal
        isOpen={alert.isOpen}
        onClose={alert.hideAlert}
        {...alert.config}
      />
    </ContactsContainer>
  );
};

export default ContactsView;
