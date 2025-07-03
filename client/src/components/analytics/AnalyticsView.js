// src/components/analytics/AnalyticsView.js
import React from "react";
import { BarChart3, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Card, StatCard, EmptyState } from "../ui/Card";

const AnalyticsView = ({ stats = {}, messages = [] }) => {
  // Calculate some analytics from the data
  const deliveryRate = stats.totalSent
    ? (
        ((stats.totalSent - (stats.pendingPayments || 0)) / stats.totalSent) *
        100
      ).toFixed(1)
    : 0;
  const responseRate = stats.totalSent
    ? (((stats.totalPaid || 0) / stats.totalSent) * 100).toFixed(1)
    : 0;

  return (
    <div className="analytics-view">
      <div className="page-header">
        <h2 className="page-title">Analytics</h2>
      </div>

      {/* Analytics Stats */}
      <div className="stats-grid">
        <StatCard
          label="Delivery Rate"
          value={`${deliveryRate}%`}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          label="Response Rate"
          value={`${responseRate}%`}
          icon={TrendingUp}
          color="blue"
        />
        <StatCard
          label="Avg Response Time"
          value="2.3 days"
          icon={Clock}
          color="orange"
        />
      </div>

      {/* Performance Insights */}
      <Card
        header={<h3 className="section-title">Performance Insights</h3>}
        padding="lg"
      >
        <div className="insights-grid">
          <div className="insight-item">
            <div className="insight-icon success">
              <TrendingUp size={24} />
            </div>
            <div className="insight-content">
              <h4>Great Job, Dad!</h4>
              <p>
                Your kids are responding 23% faster this month compared to last
                month.
              </p>
            </div>
          </div>

          <div className="insight-item">
            <div className="insight-icon info">
              <Clock size={24} />
            </div>
            <div className="insight-content">
              <h4>Best Time to Send</h4>
              <p>
                Reminders sent at 10:00 AM have the highest response rate (87%).
              </p>
            </div>
          </div>

          <div className="insight-item">
            <div className="insight-icon warning">
              <BarChart3 size={24} />
            </div>
            <div className="insight-content">
              <h4>Monthly Trend</h4>
              <p>
                Payment reminders are most effective when sent 3 days before due
                date.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card
        header={<h3 className="section-title">Recent Activity</h3>}
        padding="lg"
      >
        {stats.totalSent === 0 || !stats.totalSent ? (
          <EmptyState
            icon={BarChart3}
            message="No analytics data yet. Send some reminders to see insights!"
          />
        ) : (
          <div className="activity-timeline">
            <div className="activity-item">
              <div className="activity-time">2 hours ago</div>
              <div className="activity-content">
                <strong>Sarah</strong> responded to car payment reminder
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-time">1 day ago</div>
              <div className="activity-content">
                Sent <strong>3 reminders</strong> for this week's payments
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-time">3 days ago</div>
              <div className="activity-content">
                <strong>Mike</strong> confirmed insurance payment received
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AnalyticsView;
