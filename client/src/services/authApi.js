// client/src/services/authApi.js
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Add auth header to existing API requests
export const getAuthHeaders = () => {
  const token = localStorage.getItem("dadbot_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
