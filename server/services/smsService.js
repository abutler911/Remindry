// services/smsService.js - Updated for Textbelt
const fetch = require("node-fetch");

const sendSMS = async (to, text, messageId = null) => {
  try {
    const response = await fetch("https://textbelt.com/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        phone: to,
        message: text,
        key: process.env.TEXTBELT_API_KEY, // Your Textbelt API key
      }),
    });

    const result = await response.json();

    console.log(`📱 SMS sent to ${to}:`, result);

    if (result.success) {
      return {
        success: true,
        messageId: result.textId,
        status: "sent",
        quotaRemaining: result.quotaRemaining,
      };
    } else {
      return {
        success: false,
        error: result.error,
      };
    }
  } catch (error) {
    console.error("❌ SMS send error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = { sendSMS };
