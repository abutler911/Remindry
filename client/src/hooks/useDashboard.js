// src/hooks/useDashboard.js
import { useState, useEffect, useCallback } from "react";
import { contactsApi, remindersApi, messagesApi } from "../services/api";
import { useApi } from "./useApi";

export const useDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [stats, setStats] = useState({});
  const { loading, error, execute } = useApi();

  const fetchAllData = useCallback(async () => {
    try {
      const [contactsData, remindersData, statsData] = await Promise.all([
        contactsApi.getAll(),
        remindersApi.getAll(),
        messagesApi.getStats(),
      ]);

      setContacts(contactsData);
      setReminders(remindersData);
      setStats(statsData);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  }, []);

  const refreshData = useCallback(() => {
    execute(fetchAllData);
  }, [execute, fetchAllData]);

  // Initial data fetch
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Contact operations
  const createContact = useCallback(
    async (contactData) => {
      const result = await execute(() => contactsApi.create(contactData));
      refreshData();
      return result;
    },
    [execute, refreshData]
  );

  const updateContact = useCallback(
    async (id, contactData) => {
      const result = await execute(() => contactsApi.update(id, contactData));
      refreshData();
      return result;
    },
    [execute, refreshData]
  );

  const deleteContact = useCallback(
    async (id) => {
      const result = await execute(() => contactsApi.delete(id));
      refreshData();
      return result;
    },
    [execute, refreshData]
  );

  // Reminder operations
  const createReminder = useCallback(
    async (reminderData) => {
      const result = await execute(() => remindersApi.create(reminderData));
      refreshData();
      return result;
    },
    [execute, refreshData]
  );

  const updateReminder = useCallback(
    async (id, reminderData) => {
      const result = await execute(() => remindersApi.update(id, reminderData));
      refreshData();
      return result;
    },
    [execute, refreshData]
  );

  const deleteReminder = useCallback(
    async (id) => {
      const result = await execute(() => remindersApi.delete(id));
      refreshData();
      return result;
    },
    [execute, refreshData]
  );

  const sendManualReminder = useCallback(
    async (id, contactIds = null) => {
      const result = await execute(() =>
        remindersApi.sendManual(id, contactIds)
      );
      refreshData();
      return result;
    },
    [execute, refreshData]
  );

  return {
    // Data
    contacts,
    reminders,
    stats,

    // State
    loading,
    error,

    // Actions
    refreshData,
    createContact,
    updateContact,
    deleteContact,
    createReminder,
    updateReminder,
    deleteReminder,
    sendManualReminder,
  };
};
