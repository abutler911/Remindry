// src/components/dashboard/QuickActions.js
import React from "react";
import { Plus, Wifi, MessageCircle, Users, Settings } from "lucide-react";
import { Card } from "../ui/Card";
import Button from "../ui/Button";
import { systemApi } from "../../services/api";

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

  // Inline styles to guarantee they work
  const styles = {
    card: {
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      overflow: "hidden",
    },
    header: {
      padding: "24px 24px 16px",
      borderBottom: "1px solid #f1f5f9",
      background: "#ffffff",
    },
    title: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#1a202c",
      margin: "0 0 4px 0",
    },
    subtitle: {
      fontSize: "14px",
      color: "#4a5568",
      margin: "0",
      opacity: "0.8",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: window.innerWidth > 768 ? "1fr 1fr" : "1fr",
      gap: "24px",
      padding: "24px",
    },
    group: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    groupTitle: {
      fontSize: "12px",
      fontWeight: "600",
      color: "#4a5568",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      margin: "0 0 8px 0",
      opacity: "0.8",
    },
    buttons: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    actionBtn: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "16px",
      background: "#ffffff",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      cursor: "pointer",
      textAlign: "left",
      width: "100%",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      transition: "all 0.3s ease",
    },
    actionBtnPrimary: {
      borderColor: "#3182ce",
      background:
        "linear-gradient(135deg, rgba(49, 130, 206, 0.05) 0%, rgba(49, 130, 206, 0.1) 100%)",
    },
    actionBtnSecondary: {
      borderColor: "#e2e8f0",
    },
    icon: {
      flexShrink: "0",
      padding: "8px",
      borderRadius: "8px",
      transition: "all 0.3s ease",
    },
    iconPrimary: {
      background: "#3182ce",
      color: "#ffffff",
    },
    iconSecondary: {
      background: "#e2e8f0",
      color: "#4a5568",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      flex: "1",
    },
    label: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#1a202c",
      lineHeight: "1.2",
    },
    desc: {
      fontSize: "14px",
      color: "#4a5568",
      opacity: "0.8",
      lineHeight: "1.3",
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>Quick Actions</h3>
        <p style={styles.subtitle}>Common tasks and testing tools</p>
      </div>

      <div style={styles.grid}>
        {/* System Tests */}
        <div style={styles.group}>
          <h4 style={styles.groupTitle}>System Tests</h4>
          <div style={styles.buttons}>
            <button
              onClick={handleTestConnection}
              style={{ ...styles.actionBtn, ...styles.actionBtnSecondary }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0px)";
                e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
              }}
            >
              <div style={{ ...styles.icon, ...styles.iconSecondary }}>
                <Wifi size={20} />
              </div>
              <div style={styles.content}>
                <span style={styles.label}>Test Connection</span>
                <span style={styles.desc}>Check backend status</span>
              </div>
            </button>

            <button
              onClick={handleTestSMS}
              style={{ ...styles.actionBtn, ...styles.actionBtnSecondary }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0px)";
                e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
              }}
            >
              <div style={{ ...styles.icon, ...styles.iconSecondary }}>
                <MessageCircle size={20} />
              </div>
              <div style={styles.content}>
                <span style={styles.label}>Test SMS</span>
                <span style={styles.desc}>Send test message</span>
              </div>
            </button>
          </div>
        </div>

        {/* Create New */}
        <div style={styles.group}>
          <h4 style={styles.groupTitle}>Create New</h4>
          <div style={styles.buttons}>
            <button
              onClick={onAddContact}
              style={{ ...styles.actionBtn, ...styles.actionBtnPrimary }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0px)";
                e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
              }}
            >
              <div style={{ ...styles.icon, ...styles.iconPrimary }}>
                <Users size={20} />
              </div>
              <div style={styles.content}>
                <span style={styles.label}>Add Contact</span>
                <span style={styles.desc}>Add family member</span>
              </div>
            </button>

            <button
              onClick={onAddReminder}
              style={{ ...styles.actionBtn, ...styles.actionBtnPrimary }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0px)";
                e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
              }}
            >
              <div style={{ ...styles.icon, ...styles.iconPrimary }}>
                <Plus size={20} />
              </div>
              <div style={styles.content}>
                <span style={styles.label}>Add Reminder</span>
                <span style={styles.desc}>Create automation</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
