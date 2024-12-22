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
const API_ENDPOINT = process.env.VIDEOSDK_API_ENDPOINT;

// Accepted values for permissions and roles
const ACCEPTED_PERMISSIONS = ["allow_join", "allow_mod", "ask_join"];
const ACCEPTED_ROLES = ["crawler", "rtc"];

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Welcome to video sdk backend server",
  });
});

// Get meeting token - https://docs.videosdk.live/api-reference/realtime-communication/intro
app.post("/get-token", (req, res) => {
  try {
    const { roomId, participantId, roles, permissions } = req.body;

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
      permissions: ["ask_join"], // Default to 'ask_join'
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

    // Permissions validation
    if (permissions && Array.isArray(permissions)) {
      const invalidPermissions = permissions.filter(
        (perm) => !ACCEPTED_PERMISSIONS.includes(perm)
      );
      if (invalidPermissions.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid permissions: ${invalidPermissions.join(
            ", "
          )}. Allowed values are: ${ACCEPTED_PERMISSIONS.join(", ")}`,
        });
      }
      payload.permissions = permissions;
    } else if (permissions && !Array.isArray(permissions)) {
      return res.status(400).json({
        success: false,
        message: "Permissions must be provided as an array.",
      });
    }

    // Roles validation
    if (roles && Array.isArray(roles)) {
      const invalidRoles = roles.filter(
        (role) => !ACCEPTED_ROLES.includes(role)
      );
      if (invalidRoles.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid roles: ${invalidRoles.join(
            ", "
          )}. Allowed values are: ${ACCEPTED_ROLES.join(", ")}`,
        });
      }
      payload.roles = roles;
    } else if (roles && !Array.isArray(roles)) {
      return res.status(400).json({
        success: false,
        message: "Roles must be provided as an array.",
      });
    }

    // Generate Token
    const token = jwt.sign(payload, SECRET_KEY, options);

    // Respond with success and token
    res.json({
      success: true,
      message: "Successfully token generated",
      token,
      expiresIn: options.expiresIn,
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

// Create meeting - https://docs.videosdk.live/api-reference/realtime-communication/create-room
app.post("/create-meeting", async (req, res) => {
  try {
    const { token, customRoomId, webhook, autoCloseConfig, autoStartConfig } =
      req.body;

    // token required
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token is required",
      });
    }

    const url = `${API_ENDPOINT}/rooms`;

    let bodyData = {};

    if (customRoomId) {
      bodyData.customRoomId = customRoomId;
    }

    // Webhook docs - https://docs.videosdk.live/api-reference/realtime-communication/create-room#webhook
    if (webhook) {
      bodyData.webhook = webhook;
    }

    // autoCloseConfig - https://docs.videosdk.live/api-reference/realtime-communication/create-room#autoCloseConfig
    if (autoCloseConfig) {
      bodyData.autoCloseConfig = autoCloseConfig;
    }

    // autoStartConfig - https://docs.videosdk.live/api-reference/realtime-communication/create-room#autoStartConfig
    if (autoStartConfig) {
      bodyData.autoStartConfig = autoStartConfig;
    }

    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: bodyData,
    };

    const response = await axios(url, options);
    const data = response.data;

    // Send respond to the client
    return res.json({
      success: true,
      meetingData: data,
    });
  } catch (error) {
    // Handle errors from Axios or API
    if (error?.response) {
      return res.status(error?.response?.status || 500).json({
        success: false,
        message: "Failed to create meeting",
        error: error?.response?.data?.error || error?.response?.data || "Something went wrong",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
});

// Validate meeting - https://docs.videosdk.live/api-reference/realtime-communication/validate-room
app.post("/validate-meeting", async (req, res) => {
  try {
    const { token, roomId } = req.body;

    // token required
    if (!token || !roomId) {
      return res.status(400).json({
        success: false,
        message: "Please provide required field token and roomId",
      });
    }

    const url = `${API_ENDPOINT}/rooms/validate/${roomId}`;

    const options = {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      }
    };

    const response = await axios(url, options);
    const data = response.data;

    // Send respond to the client
    return res.json({
      success: true,
      meetingData: data,
    });
  } catch (error) {
    // Handle errors from Axios or API
    if (error?.response) {
      return res.status(error?.response?.status || 500).json({
        success: false,
        message: "Failed to validate the meeting",
        error: error?.response?.data?.error || error?.response?.data || "Something went wrong",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
