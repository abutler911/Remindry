// src/services/api.js
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("remindry_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new ApiError(
        errorData?.error || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Network error: ${error.message}`, 0);
  }
};

// Contacts API
export const contactsApi = {
  getAll: () => apiRequest("/contacts"),

  create: (contactData) =>
    apiRequest("/contacts", {
      method: "POST",
      body: JSON.stringify(contactData),
    }),

  update: (id, contactData) =>
    apiRequest(`/contacts/${id}`, {
      method: "PUT",
      body: JSON.stringify(contactData),
    }),

  delete: (id) =>
    apiRequest(`/contacts/${id}`, {
      method: "DELETE",
    }),
};

// Reminders API
export const remindersApi = {
  getAll: () => apiRequest("/reminders"),

  getById: (id) => apiRequest(`/reminders/${id}`),

  create: (reminderData) =>
    apiRequest("/reminders", {
      method: "POST",
      body: JSON.stringify(reminderData),
    }),

  update: (id, reminderData) =>
    apiRequest(`/reminders/${id}`, {
      method: "PUT",
      body: JSON.stringify(reminderData),
    }),

  delete: (id) =>
    apiRequest(`/reminders/${id}`, {
      method: "DELETE",
    }),

  sendManual: (id, contactIds = null) =>
    apiRequest(`/reminders/${id}/send`, {
      method: "POST",
      body: JSON.stringify({ contactIds }),
    }),
};

// Messages API
export const messagesApi = {
  getAll: (page = 1, limit = 50) =>
    apiRequest(`/messages?page=${page}&limit=${limit}`),

  getByReminder: (reminderId) => apiRequest(`/messages/reminder/${reminderId}`),

  markPaid: (id, isPaid) =>
    apiRequest(`/messages/${id}/paid`, {
      method: "PUT",
      body: JSON.stringify({ isPaid }),
    }),

  getStats: () => apiRequest("/messages/stats/dashboard"),
};

// System API
export const systemApi = {
  testConnection: () => apiRequest("/test"),

  testSMS: (phone, message) =>
    apiRequest("/test-sms", {
      method: "POST",
      body: JSON.stringify({ phone, message }),
    }),

  triggerReminders: () =>
    apiRequest("/trigger-reminders", {
      method: "POST",
    }),

  getTextbeltStatus: () => apiRequest("/textbelt-status"),
};

export { ApiError };
