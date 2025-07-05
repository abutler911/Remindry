// services/reminderService.js
const Contact = require("../models/Contact");
const Reminder = require("../models/Reminder");
const Message = require("../models/Message");
const { sendSMS } = require("./smsService");

/**
 * Generate contextual due date status text
 * @param {Date} dueDate - The due date of the reminder
 * @returns {string} - Contextual status like "due TODAY", "was due 2 days ago", etc.
 */
const generateDueStatus = (dueDate) => {
  if (!dueDate) return "";

  const now = new Date();
  const due = new Date(dueDate);

  // Set both dates to midnight for accurate day comparison
  now.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffTime = due - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "due TODAY";
  if (diffDays === 1) return "due tomorrow";
  if (diffDays === -1) return "was due yesterday";
  if (diffDays < -1) return `was due ${Math.abs(diffDays)} days ago`;
  if (diffDays > 1) return `due in ${diffDays} days`;

  return "";
};

/**
 * Enhanced message variable replacement with smart due date context
 * @param {string} message - The template message
 * @param {Object} contact - The contact object
 * @param {Object} reminder - The reminder object
 * @param {boolean} addAutoContext - Whether to automatically append due status to message
 * @returns {string} - The personalized message
 */
const replaceMessageVariables = (
  message,
  contact,
  reminder,
  addAutoContext = false
) => {
  const dueStatus = generateDueStatus(reminder.dueDate);

  let processedMessage = message
    .replace(/\{name\}/g, contact.name)
    .replace(/\{amount\}/g, reminder.amount ? `$${reminder.amount}` : "")
    .replace(
      /\{dueDate\}/g,
      reminder.dueDate ? reminder.dueDate.toLocaleDateString() : ""
    )
    .replace(/\{title\}/g, reminder.title)
    .replace(/\{dueStatus\}/g, dueStatus); // New variable for explicit due status

  // Auto-append due status for cron job messages if enabled and status exists
  if (addAutoContext && dueStatus) {
    // Check if the message already mentions due dates to avoid redundancy
    const hasTimeReference =
      /\b(due|overdue|today|tomorrow|yesterday|days?\s+(ago|late))\b/i.test(
        processedMessage
      );

    if (!hasTimeReference) {
      // Add contextual due information with appropriate emoji
      let statusEmoji = "";
      if (dueStatus.includes("TODAY")) statusEmoji = " ⏰";
      else if (dueStatus.includes("tomorrow")) statusEmoji = " 📅";
      else if (dueStatus.includes("ago")) statusEmoji = " ⚠️";

      processedMessage += ` (${dueStatus}${statusEmoji})`;
    }
  }

  return processedMessage;
};

/**
 * Check if a reminder should be sent based on due date and offsets
 * @param {Object} reminder - The reminder object
 * @returns {boolean} - Whether the reminder should be sent
 */
const shouldSendReminder = (reminder) => {
  const now = new Date();
  const dueDate = new Date(reminder.dueDate);
  const daysDiff = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

  // Send if it's a scheduled reminder offset day
  if (reminder.reminderOffsets && reminder.reminderOffsets.includes(daysDiff)) {
    return true;
  }

  // Send if it's overdue (but limit to prevent spam)
  if (now > dueDate) {
    const daysOverdue = Math.abs(daysDiff);
    // Only send overdue reminders for the first 7 days to prevent spam
    return daysOverdue <= 7;
  }

  return false;
};

/**
 * Process all scheduled reminders (called by cron job)
 * @returns {number} - Number of reminders processed
 */
const processScheduledReminders = async () => {
  try {
    const activeReminders = await Reminder.find({ isActive: true }).populate(
      "recipients"
    );
    let processedCount = 0;

    console.log(`📋 Found ${activeReminders.length} active reminders to check`);

    for (const reminder of activeReminders) {
      if (!reminder.recipients || reminder.recipients.length === 0) {
        console.log(
          `⚠️  Skipping reminder "${reminder.title}" - no recipients`
        );
        continue;
      }

      for (const contact of reminder.recipients) {
        if (!contact.isActive) {
          console.log(`⚠️  Skipping inactive contact: ${contact.name}`);
          continue;
        }

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
            console.log(
              `✅ Already sent reminder to ${contact.name} today for "${reminder.title}"`
            );
            continue;
          }

          // Create personalized message with auto-context for cron job
          const personalizedMessage = replaceMessageVariables(
            reminder.message,
            contact,
            reminder,
            true // Enable auto-context for cron job messages
          );

          console.log(
            `📤 Sending reminder to ${contact.name}: "${reminder.title}"`
          );
          console.log(`📝 Message: ${personalizedMessage}`);

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

          if (smsResult.success) {
            console.log(
              `✅ Successfully sent reminder to ${contact.name}: ${reminder.title}`
            );
            processedCount++;
          } else {
            console.error(
              `❌ Failed to send reminder to ${contact.name}: ${smsResult.error}`
            );
          }
        } else {
          // Log why reminder wasn't sent for debugging
          const now = new Date();
          const dueDate = new Date(reminder.dueDate);
          const daysDiff = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
          console.log(
            `⏭️  Skipping "${reminder.title}" for ${
              contact.name
            } (${daysDiff} days until due, offsets: [${
              reminder.reminderOffsets?.join(", ") || "none"
            }])`
          );
        }
      }
    }

    console.log(`🎯 Completed processing: ${processedCount} reminders sent`);
    return processedCount;
  } catch (error) {
    console.error("❌ Error processing scheduled reminders:", error);
    throw error;
  }
};

/**
 * Send manual reminder (from dashboard)
 * @param {string} reminderId - The reminder ID
 * @param {Array} contactIds - Optional array of specific contact IDs
 * @returns {Object} - Results of the send operation
 */
const sendManualReminder = async (reminderId, contactIds = null) => {
  try {
    const reminder = await Reminder.findById(reminderId).populate("recipients");

    if (!reminder) {
      throw new Error("Reminder not found");
    }

    const contactsToMessage = contactIds
      ? reminder.recipients.filter((c) => contactIds.includes(c._id.toString()))
      : reminder.recipients;

    if (contactsToMessage.length === 0) {
      throw new Error("No valid contacts found to send reminder to");
    }

    const results = [];

    console.log(
      `📤 Manual reminder send initiated for "${reminder.title}" to ${contactsToMessage.length} recipients`
    );

    for (const contact of contactsToMessage) {
      // For manual sends, don't auto-append context but allow {dueStatus} variable
      const personalizedMessage = replaceMessageVariables(
        reminder.message,
        contact,
        reminder,
        false // No auto-context for manual sends
      );

      console.log(
        `📱 Sending to ${contact.name} (${contact.phone}): ${personalizedMessage}`
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

      results.push({
        contact: contact.name,
        success: smsResult.success,
        error: smsResult.error || null,
      });

      if (smsResult.success) {
        console.log(`✅ Manual reminder sent successfully to ${contact.name}`);
      } else {
        console.error(
          `❌ Failed to send manual reminder to ${contact.name}: ${smsResult.error}`
        );
      }
    }

    const successCount = results.filter((r) => r.success).length;
    const failureCount = results.filter((r) => !r.success).length;

    console.log(
      `🎯 Manual send completed: ${successCount} successful, ${failureCount} failed`
    );

    return { results, successCount, failureCount };
  } catch (error) {
    console.error("❌ Error sending manual reminder:", error);
    throw error;
  }
};

/**
 * Utility function to get reminder due status for UI
 * @param {Object} reminder - The reminder object
 * @returns {Object} - Status information for UI display
 */
const getReminderDueInfo = (reminder) => {
  if (!reminder.dueDate) {
    return {
      status: "no-date",
      text: "No due date",
      isOverdue: false,
      daysUntilDue: null,
    };
  }

  const now = new Date();
  const due = new Date(reminder.dueDate);

  now.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffTime = due - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return {
      status: "due-today",
      text: "Due today",
      isOverdue: false,
      daysUntilDue: 0,
    };
  } else if (diffDays === 1) {
    return {
      status: "due-tomorrow",
      text: "Due tomorrow",
      isOverdue: false,
      daysUntilDue: 1,
    };
  } else if (diffDays > 1) {
    return {
      status: "due-future",
      text: `Due in ${diffDays} days`,
      isOverdue: false,
      daysUntilDue: diffDays,
    };
  } else if (diffDays === -1) {
    return {
      status: "overdue",
      text: "Due yesterday",
      isOverdue: true,
      daysUntilDue: diffDays,
    };
  } else {
    return {
      status: "overdue",
      text: `${Math.abs(diffDays)} days overdue`,
      isOverdue: true,
      daysUntilDue: diffDays,
    };
  }
};

module.exports = {
  processScheduledReminders,
  sendManualReminder,
  replaceMessageVariables,
  generateDueStatus,
  getReminderDueInfo,
  shouldSendReminder,
};
