import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import PublicRoutes from "./publicRoutes";
import PrivateRoutes from "./privateRoutes";

function RoutesIndex() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, [navigate]);

  return (
    <Routes>
      {/* Public Routes (Accessible without login) */}
      {PublicRoutes}

      {/* Private Routes (Only accessible when logged in) */}
      {token ? (
        PrivateRoutes
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default RoutesIndex;
