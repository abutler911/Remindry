// src/Dashboard.js - Main Dashboard Controller
import React, { useState } from "react";
import styled from "styled-components";
import Layout from "./components/layout/Layout";
import DashboardView from "./components/dashboard/DashboardView";
import ContactsView from "./components/contacts/ContactsView";
import RemindersView from "./components/reminders/RemindersView";
import AlertModal from "./components/ui/AlertModal";
import { useDashboard } from "./hooks/useDashboard";
import { useModal } from "./hooks/useModal";
import { useAlert } from "./hooks/useAlert";
import ContactModal from "./components/contacts/ContactModal";
import ReminderModal from "./components/reminders/ReminderModal";
import ReminderDetailModal from "./components/reminders/ReminderDetailModal";

// Styled Components for Error State
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
  background: white;
  border-radius: 16px;
  margin: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #dc2626;
  margin: 0 0 1rem 0;
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  color: #64748b;
  margin: 0 0 2rem 0;
  max-width: 500px;
  line-height: 1.6;
`;

const ReloadButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

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
  const alert = useAlert();

  // New: Reminder detail modal state
  const [reminderDetailModal, setReminderDetailModal] = useState({
    isOpen: false,
    reminder: null,
  });

  // Handle contact operations
  const handleCreateContact = async (contactData) => {
    try {
      await createContact(contactData);
      alert.showAlert({
        title: "Success",
        message: "Contact created successfully!",
        type: "success",
      });
    } catch (error) {
      alert.showAlert({
        title: "Error",
        message: `Failed to create contact: ${error.message}`,
        type: "error",
      });
      throw error;
    }
  };

  const handleUpdateContact = async (id, contactData) => {
    try {
      await updateContact(id, contactData);
      alert.showAlert({
        title: "Success",
        message: "Contact updated successfully!",
        type: "success",
      });
    } catch (error) {
      alert.showAlert({
        title: "Error",
        message: `Failed to update contact: ${error.message}`,
        type: "error",
      });
      throw error;
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
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
      throw error;
    }
  };

  // Handle reminder operations
  const handleCreateReminder = async (reminderData) => {
    try {
      await createReminder(reminderData);
      alert.showAlert({
        title: "Success",
        message: "Reminder created successfully!",
        type: "success",
      });
    } catch (error) {
      alert.showAlert({
        title: "Error",
        message: `Failed to create reminder: ${error.message}`,
        type: "error",
      });
      throw error;
    }
  };

  const handleUpdateReminder = async (id, reminderData) => {
    try {
      await updateReminder(id, reminderData);
      alert.showAlert({
        title: "Success",
        message: "Reminder updated successfully!",
        type: "success",
      });
    } catch (error) {
      alert.showAlert({
        title: "Error",
        message: `Failed to update reminder: ${error.message}`,
        type: "error",
      });
      throw error;
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      await deleteReminder(id);
      alert.showAlert({
        title: "Success",
        message: "Reminder deleted successfully!",
        type: "success",
      });
    } catch (error) {
      alert.showAlert({
        title: "Error",
        message: `Failed to delete reminder: ${error.message}`,
        type: "error",
      });
      throw error;
    }
  };

  const handleSendReminder = async (id) => {
    try {
      const result = await sendManualReminder(id);

      // Format the results in a user-friendly way
      const results = result.results || [];
      const successCount = results.filter((r) => r.success).length;
      const failureCount = results.filter((r) => !r.success).length;

      let message = "";
      if (successCount > 0 && failureCount === 0) {
        message = `Reminder sent successfully to ${successCount} recipient${
          successCount > 1 ? "s" : ""
        }!`;
      } else if (successCount > 0 && failureCount > 0) {
        message = `Reminder sent to ${successCount} recipient${
          successCount > 1 ? "s" : ""
        }, but failed for ${failureCount} recipient${
          failureCount > 1 ? "s" : ""
        }.`;
      } else if (failureCount > 0) {
        message = `Failed to send reminder to ${failureCount} recipient${
          failureCount > 1 ? "s" : ""
        }.`;
      } else {
        message = "Reminder processed successfully!";
      }

      alert.showAlert({
        title: "Reminder Sent",
        message: message,
        type: successCount > 0 ? "success" : "warning",
      });
    } catch (error) {
      alert.showAlert({
        title: "Error",
        message: `Failed to send reminder: ${error.message}`,
        type: "error",
      });
    }
  };

  const handleSaveReminder = async (reminderData) => {
  const isEditing = !!reminderModal.data?._id;

  try {
    if (isEditing) {
      await updateReminder(reminderModal.data._id, reminderData);
      alert.showAlert({
        title: "Updated",
        message: "Reminder updated successfully!",
        type: "success",
      });
    } else {
      await createReminder(reminderData);
      alert.showAlert({
        title: "Created",
        message: "Reminder created successfully!",
        type: "success",
      });
    }
  } catch (error) {
    alert.showAlert({
      title: "Error",
      message: `Failed to save reminder: ${error.message}`,
      type: "error",
    });
    throw error;
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

  // New: Navigation handlers for dashboard reminder interactions
  const handleNavigateToReminders = () => {
    setActiveTab("reminders");
  };

  const handleViewReminderDetails = (reminder) => {
    setReminderDetailModal({
      isOpen: true,
      reminder: reminder,
    });
  };

  const closeReminderDetail = () => {
    setReminderDetailModal({
      isOpen: false,
      reminder: null,
    });
  };

  // Enhanced edit reminder handler that works from detail modal
  const handleEditReminderFromDetail = (reminder) => {
    // Close detail modal first
    closeReminderDetail();
    // Then open edit modal
    reminderModal.open(reminder);
  };

  // Error display
  if (error) {
    return (
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        <ErrorContainer>
          <ErrorTitle>Error Loading Dashboard</ErrorTitle>
          <ErrorMessage>{error}</ErrorMessage>
          <ReloadButton onClick={() => window.location.reload()}>
            Reload Page
          </ReloadButton>
        </ErrorContainer>
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
            onNavigateToReminders={handleNavigateToReminders}
            onViewReminderDetails={handleViewReminderDetails}
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
  onSave={handleSaveReminder} 
  contacts={contacts}
  editingReminder={reminderModal.data} 
  loading={loading}
/>

      <ReminderDetailModal
        isOpen={reminderDetailModal.isOpen}
        onClose={closeReminderDetail}
        reminder={reminderDetailModal.reminder}
        onSend={handleSendReminder}
        onEdit={handleEditReminderFromDetail}
      />

      <AlertModal
        isOpen={alert.isOpen}
        onClose={alert.hideAlert}
        {...alert.config}
      />
    </Layout>
  );
};

export default Dashboard;
