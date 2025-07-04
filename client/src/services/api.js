// client/src/services/api.js - Enhanced version

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
      ...getAuthHeaders(), // ← Always include auth headers
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
    throw new ApiError("Network error", 0, error);
  }
};

// Reminder API methods
export const reminderApi = {
  // Get all reminders
  getAll: () => apiRequest("/reminders"),

  // Get single reminder
  getById: (id) => apiRequest(`/reminders/${id}`),

  // Create reminder
  create: (reminderData) =>
    apiRequest("/reminders", {
      method: "POST",
      body: JSON.stringify(reminderData),
    }),

  // Update reminder
  update: (id, reminderData) =>
    apiRequest(`/reminders/${id}`, {
      method: "PUT",
      body: JSON.stringify(reminderData),
    }),

  // Update reminder status (toggle active/inactive)
  updateStatus: (id, isActive) =>
    apiRequest(`/reminders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isActive }),
    }),

  // Delete reminder
  delete: (id) =>
    apiRequest(`/reminders/${id}`, {
      method: "DELETE",
    }),

  // Send manual reminder
  sendManual: (id, contactIds = []) =>
    apiRequest(`/reminders/${id}/send`, {
      method: "POST",
      body: JSON.stringify({ contactIds }),
    }),
};

// Contact API methods
export const contactApi = {
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

// Message API methods
export const messageApi = {
  getAll: (page = 1, limit = 50) =>
    apiRequest(`/messages?page=${page}&limit=${limit}`),
  getByReminder: (reminderId) => apiRequest(`/messages/reminder/${reminderId}`),
  markPaid: (id, isPaid) =>
    apiRequest(`/messages/${id}/paid`, {
      method: "PUT",
      body: JSON.stringify({ isPaid }),
    }),
  getDashboardStats: () => apiRequest("/messages/stats/dashboard"),
};

// Export the old methods for backward compatibility
export const fetchReminders = reminderApi.getAll;
export const createReminder = reminderApi.create;
export const updateReminder = reminderApi.update;
export const deleteReminder = reminderApi.delete;
