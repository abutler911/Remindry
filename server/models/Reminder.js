// models/Reminder.js
const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    recipients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],
    schedule: {
      type: {
        type: String,
        enum: ["monthly", "weekly", "one-time", "custom"],
        required: true,
      },
      dayOfMonth: Number, // for monthly (1-31)
      dayOfWeek: Number, // for weekly (0-6, Sunday=0)
      date: Date, // for one-time
      time: {
        type: String,
        required: true, // format: "HH:MM"
      },
    },
    amount: Number,
    dueDate: Date,
    reminderOffsets: [
      {
        type: Number,
        default: [7, 3, 1, 0], // days before due date
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastSent: Date,
    category: {
      type: String,
      default: "payment",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reminder", reminderSchema);
