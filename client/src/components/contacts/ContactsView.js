// src/components/contacts/ContactsView.js
import React from "react";
import styled, { keyframes } from "styled-components";
import { Plus, Users } from "lucide-react";
import ContactCard from "./ContactCard";
import ContactModal from "./ContactModal";
import { useModal } from "../../hooks/useModal";

// Animation keyframes
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
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

// Styled Components
const ContactsContainer = styled.div`
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
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const ContactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  animation: ${fadeIn} 0.6s ease-out 0.2s both;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// Button Component
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

// Loading State Component
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
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
  color: #6b7280;
  margin: 0;
  animation: ${pulse} 2s ease-in-out infinite;
`;

// Empty State Component
const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background: #f8fafc;
  border-radius: 16px;
  border: 2px dashed #cbd5e1;
  margin-top: 2rem;
  animation: ${fadeIn} 0.6s ease-out;
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
  margin: 0 0 2rem 0;
  max-width: 400px;
  line-height: 1.6;
`;

const EmptyStateButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
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

  const handleEdit = (contact) => {
    contactModal.open(contact);
  };

  const handleDelete = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await onDeleteContact(contactId);
      } catch (error) {
        alert("Failed to delete contact: " + error.message);
      }
    }
  };

  const handleSave = async (contactData) => {
    if (contactModal.data) {
      // Editing existing contact
      await onUpdateContact(contactModal.data._id, contactData);
    } else {
      // Creating new contact
      await onCreateContact(contactData);
    }
  };

  if (loading) {
    return (
      <ContactsContainer>
        <PageHeader>
          <PageTitle>
            <Users size={28} />
            Contacts
          </PageTitle>
          <Button disabled>
            <Plus size={16} />
            Add Contact
          </Button>
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
          <Users size={28} />
          Contacts
        </PageTitle>
        <Button onClick={() => contactModal.open()}>
          <Plus size={16} />
          Add Contact
        </Button>
      </PageHeader>

      {contacts.length === 0 ? (
        <EmptyState
          icon={Users}
          message="No contacts yet. Add your first contact to get started!"
          action={
            <EmptyStateButton onClick={() => contactModal.open()}>
              <Plus size={16} />
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
    </ContactsContainer>
  );
};

export default ContactsView;
