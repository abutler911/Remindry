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

app.post("/api/trigger-reminders", verifyToken, async (req, res) => {
  try {
    await reminderService.processScheduledReminders();
    res.json({ message: "Reminders processed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cron.schedule("0 * * * *", async () => {
  console.log("⏰ Checking for reminders...");
  try {
    await reminderService.processScheduledReminders();
  } catch (error) {
    console.error("Error processing reminders:", error);
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
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
  console.log(`📱 SMS Protection: All endpoints require authentication`);
});

process.on("SIGINT", async () => {
  console.log("👋 Shutting down server...");
  await mongoose.disconnect();
  server.close(() => process.exit(0));
});
