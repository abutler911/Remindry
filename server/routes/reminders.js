// routes/reminders.js
const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder");
const { sendManualReminder } = require("../services/reminderService");

// GET all reminders
router.get("/", async (req, res) => {
  try {
    const reminders = await Reminder.find()
      .populate("recipients", "name phone")
      .sort({ createdAt: -1 });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single reminder
router.get("/:id", async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id).populate(
      "recipients",
      "name phone tags"
    );
    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }
    res.json(reminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create reminder - Enhanced with better error handling
router.post("/", async (req, res) => {
  try {
    console.log(
      "📝 Creating reminder with data:",
      JSON.stringify(req.body, null, 2)
    );

    // Validate required fields
    if (!req.body.title) {
      return res.status(400).json({ error: "Title is required" });
    }

    if (!req.body.message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!req.body.recipients || req.body.recipients.length === 0) {
      return res
        .status(400)
        .json({ error: "At least one recipient is required" });
    }

    // Create reminder with validated data
    const reminderData = {
      ...req.body,
      isActive: true, // Ensure it's active by default
    };

    console.log(
      "📝 Processed reminder data:",
      JSON.stringify(reminderData, null, 2)
    );

    const reminder = new Reminder(reminderData);
    await reminder.save();
    await reminder.populate("recipients", "name phone");

    console.log("✅ Reminder created successfully:", reminder._id);
    res.status(201).json(reminder);
  } catch (error) {
    console.error("❌ Reminder creation error:", error);

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        error: "Validation failed",
        details: validationErrors,
      });
    }

    res.status(400).json({
      error: error.message,
      details: error.toString(),
    });
  }
});

// PUT update reminder
router.put("/:id", async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("recipients", "name phone");

    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }
    res.json(reminder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST send manual reminder
router.post("/:id/send", async (req, res) => {
  try {
    const { contactIds } = req.body;
    const results = await sendManualReminder(req.params.id, contactIds);
    res.json({
      message: "Reminders sent",
      results,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE reminder
router.delete("/:id", async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndDelete(req.params.id);
    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }
    res.json({ message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
