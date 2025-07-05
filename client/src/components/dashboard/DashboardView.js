// src/components/dashboard/DashboardView.js
import React from "react";
import styled, { keyframes } from "styled-components";
import DashboardStats from "./DashboardStats";
import QuickActions from "./QuickActions";
import ActiveReminders from "./ActiveReminders";

// Animation keyframes (unchanged)
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

// Updated Styled Components using theme
const DashboardContainer = styled.div`
  padding: ${(props) => props.theme.spacing[8]};
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.background.secondary} 0%,
    ${(props) => props.theme.colors.gray[200]} 100%
  );

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: ${(props) => props.theme.spacing[4]};
  }

  @media (max-width: 480px) {
    padding: ${(props) => props.theme.spacing[3]};
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(props) => props.theme.spacing[8]};

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      "stats stats"
      "actions reminders";
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    gap: ${(props) => props.theme.spacing[6]};
  }

  @media (max-width: 480px) {
    gap: ${(props) => props.theme.spacing[4]};
  }
`;

const StatsSection = styled.section`
  animation: ${fadeInUp} ${(props) => props.theme.transition.duration.slow}
    ease-out;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-area: stats;
  }
`;

const ActionsSection = styled.section`
  animation: ${slideInLeft} ${(props) => props.theme.transition.duration.slow}
    ease-out 0.1s both;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-area: actions;
  }
`;

const RemindersSection = styled.section`
  animation: ${slideInRight} ${(props) => props.theme.transition.duration.slow}
    ease-out 0.2s both;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-area: reminders;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[6]};
  padding-bottom: ${(props) => props.theme.spacing[3]};
  border-bottom: 2px solid ${(props) => props.theme.colors.border.light};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-bottom: ${(props) => props.theme.spacing[4]};
    padding-bottom: ${(props) => props.theme.spacing[2]};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${(props) => props.theme.typography.fontSize.xl};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
  font-family: ${(props) => props.theme.typography.fontFamily.sans.join(", ")};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: ${(props) => props.theme.typography.fontSize.lg};
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  color: ${(props) => props.theme.colors.text.secondary};
  margin: ${(props) => props.theme.spacing[1]} 0 0 0;
  font-family: ${(props) => props.theme.typography.fontFamily.sans.join(", ")};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: ${(props) => props.theme.typography.fontSize.xs};
  }
`;

const ContentCard = styled.div`
  background: ${(props) => props.theme.colors.background.primary};
  border-radius: ${(props) => props.theme.borderRadius["2xl"]};
  padding: ${(props) => props.theme.spacing[6]};
  box-shadow: ${(props) => props.theme.boxShadow.base};
  border: 1px solid ${(props) => props.theme.colors.primary.darkest};
  transition: all ${(props) => props.theme.transition.duration.base}
    ${(props) => props.theme.transition.timing.easeInOut};

  &:hover {
    box-shadow: ${(props) => props.theme.boxShadow.lg};
    transform: translateY(-2px);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: ${(props) => props.theme.spacing[5]};
    border-radius: ${(props) => props.theme.borderRadius.xl};
  }

  @media (max-width: 480px) {
    padding: ${(props) => props.theme.spacing[4]};
  }
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing[12]};
  animation: ${fadeInUp} ${(props) => props.theme.transition.duration.slow}
    ease-out;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-bottom: ${(props) => props.theme.spacing[8]};
  }
`;

const WelcomeTitle = styled.h1`
  font-size: ${(props) => props.theme.typography.fontSize["5xl"]};
  font-weight: ${(props) => props.theme.typography.fontWeight.extrabold};
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary.dark} 0%,
    ${(props) => props.theme.colors.primary.darkest} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 ${(props) => props.theme.spacing[2]} 0;
  font-family: ${(props) => props.theme.typography.fontFamily.sans.join(", ")};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: ${(props) => props.theme.typography.fontSize["3xl"]};
  }

  @media (max-width: 480px) {
    font-size: ${(props) => props.theme.typography.fontSize["2xl"]};
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-family: ${(props) => props.theme.typography.fontFamily.sans.join(", ")};

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: ${(props) => props.theme.typography.fontSize.base};
  }

  @media (max-width: 480px) {
    font-size: ${(props) => props.theme.typography.fontSize.sm};
  }
`;

const DashboardView = ({
  stats,
  reminders,
  onAddContact,
  onAddReminder,
  onSendReminder,
  onEditReminder,
  onNavigateToReminders, // New prop for navigation
  onViewReminderDetails, // New prop for viewing specific reminder
  loading,
}) => {
  // Handle different types of reminder navigation
  const handleViewDetails = (reminderOrAction) => {
    if (reminderOrAction === "viewAll") {
      // Navigate to reminders tab to see all reminders
      onNavigateToReminders();
    } else {
      // Open specific reminder details (modal or detail view)
      onViewReminderDetails(reminderOrAction);
    }
  };

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
              onViewDetails={handleViewDetails} // Pass the new handler
              loading={loading}
              maxDisplayCount={5} // Show only 5 reminders on dashboard
            />
          </ContentCard>
        </RemindersSection>
      </DashboardGrid>
    </DashboardContainer>
  );
};

export default DashboardView;
