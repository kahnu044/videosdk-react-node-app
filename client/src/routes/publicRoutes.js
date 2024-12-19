// src/routes/publicRoutes.js
import React from "react";
import { Route } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";

const PublicRoutes = [
  <Route key="/" path="/" element={<Home />} />,
  <Route key="/login" path="/login" element={<Login />} />,
];

export default PublicRoutes;
