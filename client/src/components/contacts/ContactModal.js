// src/components/contacts/ContactModal.js
import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

const ContactModal = ({
  isOpen,
  onClose,
  onSave,
  editingContact = null,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    tags: "",
  });

  // Reset form when modal opens/closes or editing contact changes
  useEffect(() => {
    if (isOpen) {
      if (editingContact) {
        setFormData({
          name: editingContact.name,
          phone: editingContact.phone,
          tags: editingContact.tags?.join(", ") || "",
        });
      } else {
        setFormData({
          name: "",
          phone: "",
          tags: "",
        });
      }
    }
  }, [isOpen, editingContact]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    try {
      await onSave(contactData);
      onClose();
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const actions = (
    <>
      <Button
        type="submit"
        fullWidth
        disabled={loading || !formData.name.trim() || !formData.phone.trim()}
        icon={<Save size={16} />}
      >
        {loading
          ? "Saving..."
          : editingContact
          ? "Update Contact"
          : "Create Contact"}
      </Button>
      <Button
        variant="secondary"
        fullWidth
        onClick={onClose}
        disabled={loading}
      >
        Cancel
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingContact ? "Edit Contact" : "Add New Contact"}
      actions={actions}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="contact-name">
              Name *
            </label>
            <input
              id="contact-name"
              type="text"
              className="form-input"
              value={formData.name}
              onChange={handleChange("name")}
              placeholder="Enter contact name"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contact-phone">
              Phone Number *
            </label>
            <input
              id="contact-phone"
              type="tel"
              className="form-input"
              value={formData.phone}
              onChange={handleChange("phone")}
              placeholder="+1234567890"
              required
            />
          </div>

          <div className="form-group form-group-full">
            <label className="form-label" htmlFor="contact-tags">
              Tags (comma separated)
            </label>
            <input
              id="contact-tags"
              type="text"
              className="form-input"
              value={formData.tags}
              onChange={handleChange("tags")}
              placeholder="daughter, has-car, college"
            />
            <p className="form-hint">Add tags to organize your contacts</p>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ContactModal;
