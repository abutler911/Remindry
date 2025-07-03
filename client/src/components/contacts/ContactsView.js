// src/components/contacts/ContactsView.js
import React from "react";
import { Plus, Users } from "lucide-react";
import ContactCard from "./ContactCard";
import ContactModal from "./ContactModal";
import Button from "../ui/Button";
import { EmptyState } from "../ui/Card";
import { useModal } from "../../hooks/useModal";

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
      <div className="contacts-view">
        <div className="page-header">
          <h2 className="page-title">Contacts</h2>
          <Button icon={<Plus size={16} />} disabled>
            Add Contact
          </Button>
        </div>
        <div className="loading-state">
          <p>Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contacts-view">
      <div className="page-header">
        <h2 className="page-title">Contacts</h2>
        <Button icon={<Plus size={16} />} onClick={() => contactModal.open()}>
          Add Contact
        </Button>
      </div>

      {contacts.length === 0 ? (
        <EmptyState
          icon={Users}
          message="No contacts yet. Add your first contact to get started!"
          action={
            <Button
              icon={<Plus size={16} />}
              onClick={() => contactModal.open()}
            >
              Add First Contact
            </Button>
          }
        />
      ) : (
        <div className="contacts-grid">
          {contacts.map((contact) => (
            <ContactCard
              key={contact._id}
              contact={contact}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <ContactModal
        isOpen={contactModal.isOpen}
        onClose={contactModal.close}
        onSave={handleSave}
        editingContact={contactModal.data}
        loading={loading}
      />
    </div>
  );
};

export default ContactsView;
