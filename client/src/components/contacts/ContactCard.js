// src/components/contacts/ContactCard.js
import React from "react";
import styled, { keyframes } from "styled-components";
import { Phone, Edit, Trash2, User, Tag, MessageCircle } from "lucide-react";

// Subtle animations only
const gentleFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
`;

const subtleGlow = keyframes`
  0%, 100% { box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15); }
  50% { box-shadow: 0 12px 35px rgba(59, 130, 246, 0.25); }
`;

// Main card container - clean and elegant
const StyledCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(59, 130, 246, 0.3);
  }
`;

// Subtle background element
const BackgroundAccent = styled.div`
  position: absolute;
  top: -50px;
  right: -50px;
  width: 100px;
  height: 100px;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1),
    rgba(147, 51, 234, 0.1)
  );
  border-radius: 50%;
  opacity: 0.6;
  transition: opacity 0.3s ease;

  ${StyledCard}:hover & {
    opacity: 0.8;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  position: relative;
  z-index: 2;
`;

// Clean, professional avatar
const ContactAvatar = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.4rem;
  margin: 0 auto 0.5rem;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 25px rgba(59, 130, 246, 0.4);
  }
`;

const ContactName = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  text-align: center;
  line-height: 1.3;
  transition: color 0.3s ease;

  ${StyledCard}:hover & {
    color: #3b82f6;
  }
`;

const ContactPhone = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 500;
  justify-content: center;
  padding: 0.75rem 1rem;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.6);
  transition: all 0.3s ease;

  svg {
    color: #3b82f6;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: rgba(241, 245, 249, 0.9);

    svg {
      transform: scale(1.1);
    }
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
  background: rgba(241, 245, 249, 0.9);
  color: #475569;
  padding: 0.4rem 0.75rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  svg {
    color: #3b82f6;
  }

  &:hover {
    background: #3b82f6;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);

    svg {
      color: white;
    }
  }
`;

const ContactActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(226, 232, 240, 0.6);
  position: relative;
  z-index: 2;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 600;
  min-width: 44px;
  height: 44px;
  position: relative;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const EditButton = styled(ActionButton)`
  background: #3b82f6;
  color: white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);

  &:hover:not(:disabled) {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #ef4444;
  color: white;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);

  &:hover:not(:disabled) {
    background: #dc2626;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
  }
`;

const MessageButton = styled(ActionButton)`
  background: #10b981;
  color: white;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);

  &:hover:not(:disabled) {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
  }
`;

// Simple status indicator
const StatusIndicator = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => (props.isActive ? "#10b981" : "#6b7280")};
  box-shadow: 0 0 8px
    ${(props) =>
      props.isActive ? "rgba(16, 185, 129, 0.5)" : "rgba(107, 114, 128, 0.3)"};
  animation: ${(props) => (props.isActive ? subtleGlow : "none")} 3s infinite;
  z-index: 3;
`;

// Helper function to get initials
const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const ContactCard = ({ contact, onEdit, onDelete, onMessage }) => {
  return (
    <StyledCard>
      <BackgroundAccent />
      <StatusIndicator isActive={contact.isActive ?? true} />

      <ContactInfo>
        <ContactAvatar>
          {contact.avatar ? (
            <img
              src={contact.avatar}
              alt={contact.name}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            getInitials(contact.name)
          )}
        </ContactAvatar>

        <ContactName>{contact.name}</ContactName>

        <ContactPhone>
          <Phone size={16} />
          <span>{contact.phone}</span>
        </ContactPhone>

        {contact.tags && contact.tags.length > 0 && (
          <ContactTags>
            {contact.tags.map((tag, index) => (
              <TagSpan key={`${tag}-${index}`}>
                <Tag size={10} />
                {tag}
              </TagSpan>
            ))}
          </ContactTags>
        )}
      </ContactInfo>

      <ContactActions>
        {onMessage && (
          <MessageButton
            onClick={(e) => {
              e.stopPropagation();
              onMessage(contact);
            }}
            aria-label={`Message ${contact.name}`}
            title="Send Message"
          >
            <MessageCircle size={18} />
          </MessageButton>
        )}

        <EditButton
          onClick={(e) => {
            e.stopPropagation();
            onEdit(contact);
          }}
          aria-label={`Edit ${contact.name}`}
          title="Edit Contact"
        >
          <Edit size={18} />
        </EditButton>

        <DeleteButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(contact._id, contact.name);
          }}
          aria-label={`Delete ${contact.name}`}
          title="Delete Contact"
        >
          <Trash2 size={18} />
        </DeleteButton>
      </ContactActions>
    </StyledCard>
  );
};

export default ContactCard;
