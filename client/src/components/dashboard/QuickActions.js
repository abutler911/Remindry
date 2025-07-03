// src/components/dashboard/QuickActions.js
import React from "react";
import styled from "styled-components";
import { Plus, Wifi, MessageCircle, Users } from "lucide-react";
import { systemApi } from "../../services/api";

// Styled Components
const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ActionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GroupTitle = styled.h4`
  font-size: 0.75rem;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 0.5rem 0;
  opacity: 0.8;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const PrimaryActionButton = styled(ActionButton)`
  border-color: #3182ce;
  background: linear-gradient(
    135deg,
    rgba(49, 130, 206, 0.05) 0%,
    rgba(49, 130, 206, 0.1) 100%
  );

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(49, 130, 206, 0.1) 0%,
      rgba(49, 130, 206, 0.15) 100%
    );
    border-color: #2c5aa0;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(49, 130, 206, 0.2);
  }
`;

const IconContainer = styled.div`
  flex-shrink: 0;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PrimaryIcon = styled(IconContainer)`
  background: #3182ce;
  color: #ffffff;
`;

const SecondaryIcon = styled(IconContainer)`
  background: #e2e8f0;
  color: #4a5568;
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  flex: 1;
`;

const ButtonLabel = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #1a202c;
  line-height: 1.2;
`;

const ButtonDescription = styled.span`
  font-size: 0.875rem;
  color: #4a5568;
  opacity: 0.8;
  line-height: 1.3;
`;

const QuickActions = ({ onAddContact, onAddReminder }) => {
  const handleTestConnection = async () => {
    try {
      const result = await systemApi.testConnection();
      alert(`Backend connection: ${result.message}`);
    } catch (error) {
      alert(
        "Cannot connect to backend. Make sure server is running on port 5000."
      );
    }
  };

  const handleTestSMS = async () => {
    const phone = prompt("Enter your phone number (e.g., +1234567890):");
    if (!phone) return;

    try {
      const result = await systemApi.testSMS(
        phone,
        "Test message from DadBot dashboard!"
      );
      alert(`SMS sent successfully! Message ID: ${result.messageId}`);
    } catch (error) {
      alert(`SMS failed: ${error.message}`);
    }
  };

  return (
    <ActionsGrid>
      <ActionGroup>
        <GroupTitle>System Tests</GroupTitle>
        <ButtonsContainer>
          <ActionButton onClick={handleTestConnection}>
            <SecondaryIcon>
              <Wifi size={20} />
            </SecondaryIcon>
            <ButtonContent>
              <ButtonLabel>Test Connection</ButtonLabel>
              <ButtonDescription>Check backend status</ButtonDescription>
            </ButtonContent>
          </ActionButton>

          <ActionButton onClick={handleTestSMS}>
            <SecondaryIcon>
              <MessageCircle size={20} />
            </SecondaryIcon>
            <ButtonContent>
              <ButtonLabel>Test SMS</ButtonLabel>
              <ButtonDescription>Send test message</ButtonDescription>
            </ButtonContent>
          </ActionButton>
        </ButtonsContainer>
      </ActionGroup>

      <ActionGroup>
        <GroupTitle>Create New</GroupTitle>
        <ButtonsContainer>
          <PrimaryActionButton onClick={onAddContact}>
            <PrimaryIcon>
              <Users size={20} />
            </PrimaryIcon>
            <ButtonContent>
              <ButtonLabel>Add Contact</ButtonLabel>
              <ButtonDescription>Add family member</ButtonDescription>
            </ButtonContent>
          </PrimaryActionButton>

          <PrimaryActionButton onClick={onAddReminder}>
            <PrimaryIcon>
              <Plus size={20} />
            </PrimaryIcon>
            <ButtonContent>
              <ButtonLabel>Add Reminder</ButtonLabel>
              <ButtonDescription>Create automation</ButtonDescription>
            </ButtonContent>
          </PrimaryActionButton>
        </ButtonsContainer>
      </ActionGroup>
    </ActionsGrid>
  );
};

export default QuickActions;
