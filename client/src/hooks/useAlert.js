// src/hooks/useAlert.js
import { useState } from "react";

export const useAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({});

  const showAlert = (options = {}) => {
    setConfig({
      title: "Notification",
      message: "",
      type: "info",
      buttonText: "OK",
      ...options,
    });
    setIsOpen(true);
  };

  const hideAlert = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    config,
    showAlert,
    hideAlert,
  };
};
