// src/Dashboard.js - Main Dashboard Controller
import React, { useState } from "react";
import Layout from "./components/layout/Layout";
import DashboardView from "./components/dashboard/DashboardView";
import ContactsView from "./components/contacts/ContactsView";
import RemindersView from "./components/reminders/RemindersView";
import { useDashboard } from "./hooks/useDashboard";
import { useModal } from "./hooks/useModal";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import ContactModal from "./components/contacts/ContactModal";
import ReminderModal from "./components/reminders/ReminderModal";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Dashboard data and operations
  const {
    contacts,
    reminders,
    stats,
    loading,
    error,
    createContact,
    updateContact,
    deleteContact,
    createReminder,
    updateReminder,
    deleteReminder,
    sendManualReminder,
  } = useDashboard();

  // Modal states
  const contactModal = useModal();
  const reminderModal = useModal();

  // Handle contact operations
  const handleCreateContact = async (contactData) => {
    try {
      await createContact(contactData);
      alert("Contact created successfully!");
    } catch (error) {
      alert("Failed to create contact: " + error.message);
      throw error;
    }
  };

  const handleUpdateContact = async (id, contactData) => {
    try {
      await updateContact(id, contactData);
      alert("Contact updated successfully!");
    } catch (error) {
      alert("Failed to update contact: " + error.message);
      throw error;
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      alert("Contact deleted successfully!");
    } catch (error) {
      alert("Failed to delete contact: " + error.message);
      throw error;
    }
  };

  // Handle reminder operations
  const handleCreateReminder = async (reminderData) => {
    try {
      await createReminder(reminderData);
      alert("Reminder created successfully!");
    } catch (error) {
      alert("Failed to create reminder: " + error.message);
      throw error;
    }
  };

  const handleUpdateReminder = async (id, reminderData) => {
    try {
      await updateReminder(id, reminderData);
      alert("Reminder updated successfully!");
    } catch (error) {
      alert("Failed to update reminder: " + error.message);
      throw error;
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      await deleteReminder(id);
      alert("Reminder deleted successfully!");
    } catch (error) {
      alert("Failed to delete reminder: " + error.message);
      throw error;
    }
  };

  const handleSendReminder = async (id) => {
    try {
      const result = await sendManualReminder(id);
      alert(
        `Reminder sent successfully! Results: ${JSON.stringify(result.results)}`
      );
    } catch (error) {
      alert("Failed to send reminder: " + error.message);
    }
  };

  // Modal handlers
  const handleAddContact = () => {
    contactModal.open();
  };

  const handleAddReminder = () => {
    reminderModal.open();
  };

  const handleEditReminder = (reminder) => {
    reminderModal.open(reminder);
  };

  // Error display
  if (error) {
    return (
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        <div className="error-state">
          <h2>Error Loading Dashboard</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      </Layout>
    );
  }

  // Render current view
  const renderCurrentView = () => {
    switch (activeTab) {
      case "contacts":
        return (
          <ContactsView
            contacts={contacts}
            onCreateContact={handleCreateContact}
            onUpdateContact={handleUpdateContact}
            onDeleteContact={handleDeleteContact}
            loading={loading}
          />
        );

      case "reminders":
        return (
          <RemindersView
            reminders={reminders}
            contacts={contacts}
            onCreateReminder={handleCreateReminder}
            onUpdateReminder={handleUpdateReminder}
            onDeleteReminder={handleDeleteReminder}
            onSendReminder={handleSendReminder}
            loading={loading}
          />
        );

      default:
        return (
          <DashboardView
            stats={stats}
            reminders={reminders}
            onAddContact={handleAddContact}
            onAddReminder={handleAddReminder}
            onSendReminder={handleSendReminder}
            onEditReminder={handleEditReminder}
            loading={loading}
          />
        );
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderCurrentView()}
      <ContactModal
        isOpen={contactModal.isOpen}
        onClose={contactModal.close}
        onSave={handleCreateContact}
        loading={loading}
      />

      <ReminderModal
        isOpen={reminderModal.isOpen}
        onClose={reminderModal.close}
        onSave={handleCreateReminder}
        contacts={contacts}
        loading={loading}
      />
    </Layout>
  );
};

export default Dashboard;
