// routes/messages.js
const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// GET all messages with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const messages = await Message.find()
      .populate("contactId", "name phone")
      .populate("reminderId", "title category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Message.countDocuments();

    res.json({
      messages,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET messages for specific reminder
router.get("/reminder/:reminderId", async (req, res) => {
  try {
    const messages = await Message.find({ reminderId: req.params.reminderId })
      .populate("contactId", "name phone")
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT mark message as paid
router.put("/:id/paid", async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isPaid: req.body.isPaid },
      { new: true }
    )
      .populate("contactId", "name phone")
      .populate("reminderId", "title");

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET dashboard stats
router.get("/stats/dashboard", async (req, res) => {
  try {
    const totalSent = await Message.countDocuments({ status: "sent" });
    const totalPaid = await Message.countDocuments({ isPaid: true });
    const pendingPayments = await Message.countDocuments({
      isPaid: false,
      status: "sent",
    });

    // Recent activity
    const recentMessages = await Message.find()
      .populate("contactId", "name")
      .populate("reminderId", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalSent,
      totalPaid,
      pendingPayments,
      recentMessages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
