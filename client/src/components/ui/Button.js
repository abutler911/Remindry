// src/components/ui/Button.js
import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon = null,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  ...props
}) => {
  const baseClasses = "btn";
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    icon: "btn-icon",
    danger: "btn-icon btn-icon-danger",
  };

  const sizeClasses = {
    sm: "btn-small",
    md: "",
    lg: "btn-large",
  };

  const widthClasses = fullWidth ? "btn-full" : "";

  const classes = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size],
    widthClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="btn-icon-wrapper">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
