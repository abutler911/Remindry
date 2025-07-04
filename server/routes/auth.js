const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginLimiter } = require("../middleware/auth");

const router = express.Router();

router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      console.log("❌ Missing password");
      return res.status(400).json({ error: "Password is required" });
    }

    if (!process.env.ADMIN_PASSWORD_HASH) {
      console.log("❌ Missing ADMIN_PASSWORD_HASH");
      return res.status(500).json({ error: "Server misconfigured" });
    }

    const isValid = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    console.log("🔑 Password valid?", isValid);

    if (!isValid) {
      console.log("❌ Invalid credentials");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: "admin", role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: `${process.env.SESSION_TIMEOUT_HOURS || 24}h` }
    );

    console.log("✅ Login success, sending token");

    res.json({
      token,
      expiresIn: (process.env.SESSION_TIMEOUT_HOURS || 24) * 60 * 60 * 1000,
    });
  } catch (error) {
    console.error("🔥 Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/verify", (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;
