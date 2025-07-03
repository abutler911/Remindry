// src/components/contacts/ContactCard.js
import React from "react";
import { Phone, Edit, Trash2, User, Tag } from "lucide-react";
import { Card } from "../ui/Card";
import Button from "../ui/Button";
import "./ContactCard.css";

const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <Card className="contact-card">
      <div className="contact-info">
        {/* Add an avatar or icon */}
        <div className="contact-avatar">
          <User size={32} />
        </div>

        <h3 className="contact-name">{contact.name}</h3>

        <div className="contact-phone">
          <Phone size={14} />
          <span>{contact.phone}</span>
        </div>

        {contact.tags && contact.tags.length > 0 && (
          <div className="contact-tags">
            {contact.tags.map((tag) => (
              <span key={tag} className="tag">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="contact-actions">
        <Button
          variant="icon"
          className="btn-icon contact-action-btn"
          onClick={() => onEdit(contact)}
          aria-label={`Edit ${contact.name}`}
        >
          <Edit size={18} />
        </Button>
        <Button
          variant="outline-danger"
          className="btn-outline-danger contact-action-btn"
          onClick={() => onDelete(contact._id)}
          aria-label={`Delete ${contact.name}`}
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </Card>
  );
};

export default ContactCard;
