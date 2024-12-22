# videosdk-react-node-app

### Video SDK API(Server)

This API provides the ability to manage Video SDK operations, such as creating rooms, generating tokens, and validating meetings. The following are the endpoints and their details:

### **1. Get Token**

**Endpoint:**

```bash
POST /get-token
```

**Description:**
Generates a meeting token, which is required for various meeting-related operations.

**Request Body:**

```json
{
  "roomId": "your-room-id", // optional
  "participantId": "your-participant-id", // optional
  "roles": ["role1", "role2"], // optional, array of roles
  "permissions": ["ask_join"] // optional, array of permissions
}
```

**Response:**

```json
{
  "success": true,
  "message": "Successfully token generated",
  "token": "generated-token",
  "expiresIn": "10m"
}
```

**Possible Errors:**

- `500` Missing API_KEY or SECRET_KEY in server configuration.
- `400` Invalid permissions or roles (must be an array).

---

### **2. Create Meeting**

**Endpoint:**

```bash
POST /create-meeting
```

**Description:**
Creates a new meeting room using the provided token and configuration settings.

**Request Body:**

```json
{
  "token": "your-access-token", // required
  "customRoomId": "your-room-id", // optional
  "webhook": "your-webhook-url", // optional
  "autoCloseConfig": {}, // optional
  "autoStartConfig": {} // optional
}
```

**Response:**

```json
{
  "success": true,
  "meetingData": {
    /* meeting details */
  }
}
```

**Possible Errors:**

- `400` Token is required.
- `500` Failed to create meeting (internal server error).

---

### **3. Validate Meeting**

**Endpoint:**

```bash
POST /validate-meeting
```

**Description:**
Validates the existence of a room and provides details about it.

**Request Body:**

```json
{
  "token": "your-access-token", // required
  "roomId": "room-id" // required
}
```

**Response:**

```json
{
  "success": true,
  "meetingData": {
    /* meeting validation details */
  }
}
```

**Possible Errors:**

- `400` Token and roomId are required.
- `500` Failed to validate the meeting (internal server error).

---

### **Error Handling**

In case of any error, the API will return an error response in the following format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Specific error details (if available)"
}
```

---

### **Permissions and Roles Validation**

For both permissions and roles, the API expects arrays. The accepted values for `permissions` and `roles` can be modified as per the business logic.

- **Permissions Validation:**

  - Accepted permissions: `ask_join`, etc.
  - If invalid permissions are passed, the API will return a 400 error.

- **Roles Validation:**
  - Accepted roles: You can define accepted roles as per your application's need.
  - Invalid roles will result in a 400 error.

---

### **Dependencies**

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) – For generating tokens.

- [axios](https://www.npmjs.com/package/axios) – For making HTTP requests.

- [cors](https://www.npmjs.com/package/cors) - To enable Cross-Origin Resource Sharing.

- [dotenv](https://www.npmjs.com/package/dotenv) - For loading environment variables from a `.env` file into `process.env`.

- [express](https://www.npmjs.com/package/express) - For building server-side applications.

---

### **Setup Instructions**

1. Clone the repository and use `cd server` to navigate server directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. use command `cp .env.example .env` to create a `.env` file.
4. Configure environment variables (`VIDEOSDK_API_KEY` and `VIDEOSDK_SECRET_KEY`)

   ```bash
   PORT=3002
   VIDEOSDK_API_KEY=""
   VIDEOSDK_SECRET_KEY=""
   VIDEOSDK_API_ENDPOINT="https://api.videosdk.live/v2"
   ```

5. Start the server:
   ```bash
   npm start
   ```
