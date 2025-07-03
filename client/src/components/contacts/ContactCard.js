// src/components/contacts/ContactCard.js
import React from "react";
import styled from "styled-components";
import { Phone, Edit, Trash2, User, Tag } from "lucide-react";

// Styled Components
const StyledCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
`;

const ContactAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 0.5rem;
  align-self: center;
`;

const ContactName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
  text-align: center;
  line-height: 1.3;
`;

const ContactPhone = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 0.95rem;
  justify-content: center;

  svg {
    color: #718096;
  }
`;

const ContactTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 0.25rem;
`;

const TagSpan = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;

  svg {
    color: #718096;
  }
`;

const ContactActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  padding-top: 0.5rem;
  border-top: 1px solid #e2e8f0;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 40px;
  height: 40px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EditButton = styled(ActionButton)`
  background: #f7fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;

  &:hover:not(:disabled) {
    background: #edf2f7;
    color: #2d3748;
    transform: scale(1.05);
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #fed7d7;
  color: #e53e3e;
  border: 1px solid #feb2b2;

  &:hover:not(:disabled) {
    background: #fc8181;
    color: white;
    transform: scale(1.05);
  }
`;

const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <StyledCard>
      <ContactInfo>
        <ContactAvatar>
          <User size={32} />
        </ContactAvatar>
        <ContactName>{contact.name}</ContactName>
        <ContactPhone>
          <Phone size={14} />
          <span>{contact.phone}</span>
        </ContactPhone>
        {contact.tags && contact.tags.length > 0 && (
          <ContactTags>
            {contact.tags.map((tag) => (
              <TagSpan key={tag}>
                <Tag size={10} />
                {tag}
              </TagSpan>
            ))}
          </ContactTags>
        )}
      </ContactInfo>
      <ContactActions>
        <EditButton
          onClick={() => onEdit(contact)}
          aria-label={`Edit ${contact.name}`}
        >
          <Edit size={18} />
        </EditButton>
        <DeleteButton
          onClick={() => onDelete(contact._id, contact.name)}
          aria-label={`Delete ${contact.name}`}
        >
          <Trash2 size={18} />
        </DeleteButton>
      </ContactActions>
    </StyledCard>
  );
};

export default ContactCard;
