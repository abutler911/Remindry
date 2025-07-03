// src/components/ui/Card.js
import React from "react";

const Card = ({
  children,
  className = "",
  header = null,
  footer = null,
  padding = "md",
}) => {
  const paddingClasses = {
    none: "",
    sm: "card-padding-sm",
    md: "card-padding-md",
    lg: "card-padding-lg",
  };

  return (
    <div className={`card ${className}`}>
      {header && <div className="card-header">{header}</div>}

      <div className={`card-body ${paddingClasses[padding]}`}>{children}</div>

      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

// src/components/ui/StatCard.js
const StatCard = ({
  label,
  value,
  icon: Icon,
  color = "blue",
  className = "",
}) => {
  return (
    <Card className={`stat-card stat-card-${color} ${className}`}>
      <div className="stat-content">
        <div className="stat-info">
          <p className="stat-label">{label}</p>
          <p className="stat-value">{value}</p>
        </div>
        {Icon && <Icon className="stat-icon" size={24} />}
      </div>
    </Card>
  );
};

// src/components/ui/EmptyState.js
const EmptyState = ({
  message,
  icon: Icon = null,
  action = null,
  className = "",
}) => {
  return (
    <div className={`empty-state ${className}`}>
      {Icon && <Icon className="empty-state-icon" size={48} />}
      <p className="empty-state-message">{message}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
};

export { Card, StatCard, EmptyState };
