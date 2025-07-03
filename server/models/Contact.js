// models/Contact.js
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    preferences: {
      reminderOffset: {
        type: Number,
        default: 3, // days before due date
      },
      timezone: {
        type: String,
        default: "America/New_York",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
