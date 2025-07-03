// src/components/dashboard/DashboardStats.js
import React from "react";
import styled, { keyframes } from "styled-components";
import { MessageSquare, DollarSign, AlertCircle } from "lucide-react";

// Animation keyframes
const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

// Styled Components for DashboardStats
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "delay",
})`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  animation: ${slideInUp} 0.6s ease-out;
  animation-delay: ${(props) => props.delay || "0s"};
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const StatHeader = styled.div`
  display: flex;
  items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StatIconContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => {
    switch (props.color) {
      case "blue":
        return "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)";
      case "green":
        return "linear-gradient(135deg, #10b981 0%, #047857 100%)";
      case "orange":
        return "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
      default:
        return "linear-gradient(135deg, #6b7280 0%, #374151 100%)";
    }
  }};
  color: white;

  &:hover {
    animation: ${pulse} 0.6s ease-in-out;
  }
`;

const StatLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0.5rem 0 0 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const StatCardComponent = ({ label, value, icon: Icon, color, delay }) => (
  <StatCard delay={delay}>
    <StatHeader>
      <div>
        <StatLabel>{label}</StatLabel>
        <StatValue>{value}</StatValue>
      </div>
      <StatIconContainer color={color}>
        <Icon size={24} />
      </StatIconContainer>
    </StatHeader>
  </StatCard>
);

const DashboardStats = ({ stats = {} }) => {
  return (
    <StatsGrid>
      <StatCardComponent
        label="Messages Sent"
        value={stats.totalSent || 0}
        icon={MessageSquare}
        color="blue"
        delay="0.1s"
      />
      <StatCardComponent
        label="Active Reminders"
        value={stats.activeReminders || 0}
        icon={AlertCircle}
        color="orange"
        delay="0.2s"
      />
      <StatCardComponent
        label="Pending Responses"
        value={stats.pendingPayments || 0}
        icon={DollarSign}
        color="green"
        delay="0.3s"
      />
    </StatsGrid>
  );
};

export default DashboardStats;
