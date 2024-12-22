const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;
const API_KEY = process.env.VIDEOSDK_API_KEY;
const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Welcome to video sdk backend server",
  });
});

// Get meeting token
app.post("/get-token", (req, res) => {
  try {
    const { roomId, participantId, roles } = req.body;

    // Validation
    if (!API_KEY || !SECRET_KEY) {
      return res.status(500).json({
        success: false,
        message: "Missing API_KEY or SECRET_KEY in the server configuration",
      });
    }

    const options = { expiresIn: "10m", algorithm: "HS256" };

    let payload = {
      apikey: API_KEY,
      permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
      version: 2,
    };

    // OPTIONAL: roomId
    if (roomId) {
      payload.roomId = roomId;
    }

    // OPTIONAL: participantId
    if (participantId) {
      payload.participantId = participantId;
    }

    // OPTIONAL: roles (must be an array if provided)
    if (roles && Array.isArray(roles)) {
      payload.roles = roles;
    } else if (roles && !Array.isArray(roles)) {
      return res.status(400).json({
        success: false,
        message: "Invalid roles format. It should be an array.",
      });
    }

    // Generate Token
    const token = jwt.sign(payload, SECRET_KEY, options);

    // Respond with success and token
    res.json({
      success: true,
      message: "Successfully token generated",
      token,
      expiresIn: options.expiresIn
    });
  } catch (error) {
    console.error("Error generating token: ", error);

    // Catching and returning error
    res.status(500).json({
      success: false,
      message: "Error generating token",
      error: error.message || "Internal Server Error",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
