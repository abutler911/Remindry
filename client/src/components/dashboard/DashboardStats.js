// src/components/dashboard/DashboardStats.js
import React from "react";
import { MessageSquare, DollarSign, AlertCircle } from "lucide-react";
import { StatCard } from "../ui/Card";

const DashboardStats = ({ stats = {} }) => {
  return (
    <div className="stats-grid">
      <StatCard
        label="Messages Sent"
        value={stats.totalSent || 0}
        icon={MessageSquare}
        color="blue"
      />
      <StatCard
        label="Payments Made"
        value={stats.totalPaid || 0}
        icon={DollarSign}
        color="green"
      />
      <StatCard
        label="Pending"
        value={stats.pendingPayments || 0}
        icon={AlertCircle}
        color="orange"
      />
    </div>
  );
};

export default DashboardStats;
