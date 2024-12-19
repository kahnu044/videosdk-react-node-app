// src/routes/privateRoutes.js
import React from "react";
import { Route } from "react-router";
import Meetings from "../pages/Meetings";
import Meeting from "../pages/Meeting";

const PrivateRoutes = [
  <Route key="/meetings" path="/meetings" element={<Meetings />} />,
  <Route key="/meetings/:meetingId" path="/meetings/:meetingId" element={<Meeting />} />,
];

export default PrivateRoutes;
