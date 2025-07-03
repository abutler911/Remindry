// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/dadbot", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("📊 MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import services after DB connection
const reminderService = require("./services/reminderService");

// Routes
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/reminders", require("./routes/reminders"));
app.use("/api/messages", require("./routes/messages"));

// Add these test routes to your server.js file

// SMS Test Route - for testing Vonage SMS
app.post("/api/test-sms", async (req, res) => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).json({
        error: "Phone number and message are required",
      });
    }

    // Import SMS service
    const { sendSMS } = require("./services/smsService");

    // Send test SMS
    const result = await sendSMS(phone, message);

    if (result.success) {
      res.json({
        success: true,
        message: "SMS sent successfully!",
        messageId: result.messageId,
        status: result.status,
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
      });
    }
  } catch (error) {
    console.error("Test SMS error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/api/textbelt-status", (req, res) => {
  const hasCredentials = !!process.env.TEXTBELT_API_KEY;

  res.json({
    configured: hasCredentials,
    apiKey: process.env.TEXTBELT_API_KEY ? "Set" : "Missing",
    provider: "Textbelt",
  });
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "🤖 DadBot is alive!" });
});

// Cron job - check for reminders every hour
cron.schedule("0 * * * *", async () => {
  console.log("⏰ Checking for reminders...");
  try {
    await reminderService.processScheduledReminders();
  } catch (error) {
    console.error("Error processing reminders:", error);
  }
});

// Manual trigger for testing
app.post("/api/trigger-reminders", async (req, res) => {
  try {
    await reminderService.processScheduledReminders();
    res.json({ message: "Reminders processed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 DadBot server running on port ${PORT}`);
});
