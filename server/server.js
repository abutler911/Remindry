const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

if (
  !process.env.JWT_SECRET ||
  !process.env.MONGODB_URI ||
  !process.env.TEXTBELT_API_KEY
) {
  console.error("❌ Missing required environment variables. Exiting.");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["https://remindry.netlify.app", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("📊 MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const reminderService = require("./services/reminderService");

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const contactsRoutes = require("./routes/contacts");
const remindersRoutes = require("./routes/reminders");
const messagesRoutes = require("./routes/messages");

const { verifyToken } = require("./middleware/auth");

app.use("/api/contacts", verifyToken, contactsRoutes);
app.use("/api/reminders", verifyToken, remindersRoutes);
app.use("/api/messages", verifyToken, messagesRoutes);

const smsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many SMS requests. Please try again later.",
});

app.post("/api/test-sms", verifyToken, smsLimiter, async (req, res) => {
  try {
    const { phone, message } = req.body;
    if (!phone || !message) {
      return res
        .status(400)
        .json({ error: "Phone number and message are required" });
    }
    const { sendSMS } = require("./services/smsService");
    const result = await sendSMS(phone, message);
    if (result.success) {
      res.json({
        success: true,
        message: "SMS sent successfully!",
        messageId: result.messageId,
        status: result.status,
      });
    } else {
      res.status(500).json({ success: false, error: result.error });
    }
  } catch (error) {
    console.error("Test SMS error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/textbelt-status", verifyToken, (req, res) => {
  const hasCredentials = !!process.env.TEXTBELT_API_KEY;
  res.json({
    configured: hasCredentials,
    apiKey: hasCredentials ? "Set" : "Missing",
    provider: "Textbelt",
  });
});

app.get("/api/test", verifyToken, (req, res) => {
  res.json({ message: "🤖 Remindry is alive and secure!" });
});

// Enhanced manual trigger endpoint with better response
app.post("/api/trigger-reminders", verifyToken, async (req, res) => {
  try {
    console.log("🔄 Manual reminder trigger initiated by user");
    const count = await reminderService.processScheduledReminders();
    res.json({
      message: "Reminders processed successfully",
      remindersSent: count,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Manual trigger failed:", error);
    res.status(500).json({ error: error.message });
  }
});

// Enhanced cron job with better logging and error handling
cron.schedule(
  "0 * * * *",
  async () => {
    const timestamp = new Date().toISOString();
    console.log(`\n⏰ [${timestamp}] Cron: Starting hourly reminder check...`);

    try {
      const startTime = Date.now();
      const count = await reminderService.processScheduledReminders();
      const duration = Date.now() - startTime;

      if (count > 0) {
        console.log(
          `✅ [${new Date().toISOString()}] Cron: Successfully sent ${count} reminder${
            count === 1 ? "" : "s"
          } (${duration}ms)`
        );
      } else {
        console.log(
          `✅ [${new Date().toISOString()}] Cron: No reminders to send at this time (${duration}ms)`
        );
      }

      // Log next scheduled run
      const nextHour = new Date();
      nextHour.setHours(nextHour.getHours() + 1, 0, 0, 0);
      console.log(
        `📅 Next cron check scheduled for: ${nextHour.toISOString()}\n`
      );
    } catch (err) {
      console.error(`❌ [${new Date().toISOString()}] Cron error:`, err);
      console.error("Full error details:", err.stack);

      // In production, you might want to send alerts here
      // e.g., sendSlackAlert(`Cron job failed: ${err.message}`);
    }
  },
  {
    scheduled: true,
    timezone: "America/New_York", // Adjust to your timezone
  }
);

// New endpoint to check cron job status and next run time
app.get("/api/cron-status", verifyToken, (req, res) => {
  const nextHour = new Date();
  nextHour.setHours(nextHour.getHours() + 1, 0, 0, 0);

  res.json({
    status: "active",
    schedule: "Every hour at minute 0",
    nextRun: nextHour.toISOString(),
    timezone: "America/New_York",
    lastChecked: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: Date.now(),
    services: {
      database:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      sms: !!process.env.TEXTBELT_API_KEY ? "configured" : "not configured",
    },
  });
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Invalid token" });
  } else {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Remindry server running on port ${PORT}`);
  console.log(
    `🔐 Authentication: ${process.env.JWT_SECRET ? "ENABLED" : "DISABLED"}`
  );
  console.log(
    `📱 SMS Provider: ${
      process.env.TEXTBELT_API_KEY ? "Textbelt CONFIGURED" : "NOT CONFIGURED"
    }`
  );
  console.log(
    `⏰ Cron Job: Scheduled to run every hour (timezone: America/New_York)`
  );

  // Log the next cron run time on startup
  const nextHour = new Date();
  nextHour.setHours(nextHour.getHours() + 1, 0, 0, 0);
  console.log(`📅 Next automated reminder check: ${nextHour.toISOString()}`);
});

process.on("SIGINT", async () => {
  console.log("👋 Shutting down server gracefully...");
  try {
    await mongoose.disconnect();
    console.log("📊 Database connection closed");
    server.close(() => {
      console.log("🛑 Server stopped");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
});

// Graceful shutdown for production
process.on("SIGTERM", async () => {
  console.log("👋 SIGTERM received, shutting down gracefully...");
  try {
    await mongoose.disconnect();
    server.close(() => process.exit(0));
  } catch (error) {
    console.error("Error during SIGTERM shutdown:", error);
    process.exit(1);
  }
});
