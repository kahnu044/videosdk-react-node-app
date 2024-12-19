import React from "react";
import { Routes, Route, Navigate } from "react-router";
import PublicRoutes from "./publicRoutes";
import PrivateRoutes from "./privateRoutes";

function RoutesIndex() {

  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Public Routes (Accessible without login) */}
      {PublicRoutes}

      {/* Private Routes (Only accessible when logged in) */}
      {token ? PrivateRoutes : <Route path="*" element={<Navigate to="/login" />} />}
    </Routes>
  );
}

export default RoutesIndex;
