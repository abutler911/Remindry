// src/hooks/useConfirmation.js
import { useState } from "react";

export const useConfirmation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({});
  const [resolveRef, setResolveRef] = useState(null);

  const confirm = (options = {}) => {
    return new Promise((resolve) => {
      setConfig({
        title: "Confirm Action",
        message: "Are you sure you want to proceed?",
        confirmText: "Confirm",
        cancelText: "Cancel",
        variant: "info",
        ...options,
      });
      setResolveRef(() => resolve);
      setIsOpen(true);
    });
  };

  const handleConfirm = () => {
    if (resolveRef) {
      resolveRef(true);
    }
    handleClose();
  };

  const handleClose = () => {
    if (resolveRef) {
      resolveRef(false);
    }
    setIsOpen(false);
    setResolveRef(null);
  };

  return {
    isOpen,
    config,
    confirm,
    handleConfirm,
    handleClose,
  };
};
