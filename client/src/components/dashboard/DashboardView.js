// src/components/dashboard/DashboardView.js
import React from "react";
import styled, { keyframes } from "styled-components";
import DashboardStats from "./DashboardStats";
import QuickActions from "./QuickActions";
import ActiveReminders from "./ActiveReminders";

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Styled Components
const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      "stats stats"
      "actions reminders";
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const StatsSection = styled.section`
  animation: ${fadeInUp} 0.6s ease-out;

  @media (min-width: 1024px) {
    grid-area: stats;
  }
`;

const ActionsSection = styled.section`
  animation: ${slideInLeft} 0.7s ease-out 0.1s both;

  @media (min-width: 1024px) {
    grid-area: actions;
  }
`;

const RemindersSection = styled.section`
  animation: ${slideInRight} 0.7s ease-out 0.2s both;

  @media (min-width: 1024px) {
    grid-area: reminders;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e2e8f0;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0.25rem 0 0 0;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 0.5s ease-out;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const DashboardView = ({
  stats,
  reminders,
  onAddContact,
  onAddReminder,
  onSendReminder,
  onEditReminder,
  loading,
}) => {
  return (
    <DashboardContainer>
      <WelcomeSection>
        <WelcomeTitle>Welcome Back!</WelcomeTitle>
        <WelcomeSubtitle>
          Stay connected with your contacts and never miss an important reminder
        </WelcomeSubtitle>
      </WelcomeSection>

      <DashboardGrid>
        <StatsSection>
          <ContentCard>
            <DashboardStats stats={stats} />
          </ContentCard>
        </StatsSection>

        <ActionsSection>
          <ContentCard>
            <SectionHeader>
              <SectionTitle>Quick Actions</SectionTitle>
              <SectionSubtitle>Get started with common tasks</SectionSubtitle>
            </SectionHeader>
            <QuickActions
              onAddContact={onAddContact}
              onAddReminder={onAddReminder}
            />
          </ContentCard>
        </ActionsSection>

        <RemindersSection>
          <ContentCard>
            <SectionHeader>
              <SectionTitle>Active Reminders</SectionTitle>
              <SectionSubtitle>Your upcoming reminders</SectionSubtitle>
            </SectionHeader>
            <ActiveReminders
              reminders={reminders}
              onSend={onSendReminder}
              onEdit={onEditReminder}
              onAdd={onAddReminder}
              loading={loading}
            />
          </ContentCard>
        </RemindersSection>
      </DashboardGrid>
    </DashboardContainer>
  );
};

export default DashboardView;
