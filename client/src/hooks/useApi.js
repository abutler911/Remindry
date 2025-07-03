// src/hooks/useApi.js
import { useState, useCallback } from "react";
import { ApiError } from "../services/api";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (apiCall, onSuccess = null, onError = null) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiCall();
        if (onSuccess) {
          onSuccess(result);
        }
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof ApiError
            ? err.message
            : "An unexpected error occurred";
        setError(errorMessage);

        if (onError) {
          onError(err);
        } else {
          console.error("API Error:", err);
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    execute,
    clearError,
  };
};
