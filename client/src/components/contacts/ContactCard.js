// src/components/contacts/ContactCard.js
import React from "react";
import { Phone, Edit, Trash2 } from "lucide-react";
import { Card } from "../ui/Card";
import Button from "../ui/Button";

const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <Card className="contact-card">
      <div className="contact-info">
        <h3 className="contact-name">{contact.name}</h3>
        <div className="contact-phone">
          <Phone size={14} />
          <span>{contact.phone}</span>
        </div>
        <div className="contact-tags">
          {contact.tags?.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="contact-actions">
        <Button
          variant="icon"
          onClick={() => onEdit(contact)}
          aria-label={`Edit ${contact.name}`}
        >
          <Edit size={16} />
        </Button>
        <Button
          variant="danger"
          onClick={() => onDelete(contact._id)}
          aria-label={`Delete ${contact.name}`}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default ContactCard;
