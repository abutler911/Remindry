// services/reminderService.js
const Contact = require("../models/Contact");
const Reminder = require("../models/Reminder");
const Message = require("../models/Message");
const { sendSMS } = require("./smsService");

const replaceMessageVariables = (message, contact, reminder) => {
  return message
    .replace(/\{name\}/g, contact.name)
    .replace(/\{amount\}/g, reminder.amount ? `$${reminder.amount}` : "")
    .replace(
      /\{dueDate\}/g,
      reminder.dueDate ? reminder.dueDate.toLocaleDateString() : ""
    )
    .replace(/\{title\}/g, reminder.title);
};

const shouldSendReminder = (reminder) => {
  const now = new Date();
  const dueDate = new Date(reminder.dueDate);
  const daysDiff = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

  if (reminder.reminderOffsets.includes(daysDiff)) return true;
  if (now > dueDate) return true;

  return false;
};

const processScheduledReminders = async () => {
  try {
    const activeReminders = await Reminder.find({ isActive: true }).populate(
      "recipients"
    );

    for (const reminder of activeReminders) {
      for (const contact of reminder.recipients) {
        if (!contact.isActive) continue;

        // Check if we should send this reminder today
        if (shouldSendReminder(reminder)) {
          // Check if we already sent this reminder today
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const alreadySent = await Message.findOne({
            reminderId: reminder._id,
            contactId: contact._id,
            createdAt: { $gte: today },
          });

          if (alreadySent) {
            console.log(`Already sent reminder to ${contact.name} today`);
            continue;
          }

          // Create personalized message
          const personalizedMessage = replaceMessageVariables(
            reminder.message,
            contact,
            reminder
          );

          // Send SMS
          const smsResult = await sendSMS(contact.phone, personalizedMessage);

          // Log the message
          const messageLog = new Message({
            reminderId: reminder._id,
            contactId: contact._id,
            phone: contact.phone,
            message: personalizedMessage,
            status: smsResult.success ? "sent" : "failed",
            vonageMessageId: smsResult.messageId,
            sentAt: smsResult.success ? new Date() : null,
          });

          await messageLog.save();

          console.log(`📤 Reminder sent to ${contact.name}: ${reminder.title}`);
        }
      }
    }
  } catch (error) {
    console.error("Error processing reminders:", error);
    throw error;
  }
};

const sendManualReminder = async (reminderId, contactIds = null) => {
  try {
    const reminder = await Reminder.findById(reminderId).populate("recipients");

    if (!reminder) {
      throw new Error("Reminder not found");
    }

    const contactsToMessage = contactIds
      ? reminder.recipients.filter((c) => contactIds.includes(c._id.toString()))
      : reminder.recipients;

    const results = [];

    for (const contact of contactsToMessage) {
      const personalizedMessage = replaceMessageVariables(
        reminder.message,
        contact,
        reminder
      );

      const smsResult = await sendSMS(contact.phone, personalizedMessage);

      const messageLog = new Message({
        reminderId: reminder._id,
        contactId: contact._id,
        phone: contact.phone,
        message: personalizedMessage,
        status: smsResult.success ? "sent" : "failed",
        vonageMessageId: smsResult.messageId,
        sentAt: smsResult.success ? new Date() : null,
      });

      await messageLog.save();
      results.push({ contact: contact.name, success: smsResult.success });
    }

    return results;
  } catch (error) {
    console.error("Error sending manual reminder:", error);
    throw error;
  }
};

module.exports = {
  processScheduledReminders,
  sendManualReminder,
  replaceMessageVariables,
};
