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
app.get("/get-token", (req, res) => {

  const options = { expiresIn: "10m", algorithm: "HS256" };

  const { roomId, participantId, roles } = req.body;

  let payload = {
    apikey: API_KEY,
    permissions: ["allow_join", "allow_mod"], // also accepts "ask_join"
    version: 2,
  };

  // OPTIONAL - roomId: `2kyv-gzay-64pg` - To provide customized access control, you can make the token applicable to a particular room by including the roomId in the payload.
  if (roomId) {
    payload.roomId = roomId;
  }

  // OPTIONAL - participantId: `lxvdplwt` - You can include the participantId in the payload to limit the token's access to a particular participant.
  if (participantId) {
    payload.participantId = participantId;
  }

  // OPTIONAL - roles: ["crawler", "rtc"] - crawler role is only for accessing v2 API, you can not use this token for running the Meeting/Room. rtc is only allow for running the Meeting / Room, you can not use server-side APIs.
  if (roles) {
    payload.roles = roles;
  }

  // Generate Token
  const token = jwt.sign(payload, SECRET_KEY, options);
  res.json({ token });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
