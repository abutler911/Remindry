// src/components/dashboard/DashboardView.js
import React from "react";
import DashboardStats from "./DashboardStats";
import QuickActions from "./QuickActions";
import ActiveReminders from "./ActiveReminders";

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
    <div className="dashboard-content">
      <DashboardStats stats={stats} />

      <QuickActions onAddContact={onAddContact} onAddReminder={onAddReminder} />

      <ActiveReminders
        reminders={reminders}
        onSend={onSendReminder}
        onEdit={onEditReminder}
        onAdd={onAddReminder}
        loading={loading}
      />
    </div>
  );
};

export default DashboardView;
