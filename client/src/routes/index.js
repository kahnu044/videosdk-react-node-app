import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import PublicRoutes from "./publicRoutes";
import PrivateRoutes from "./privateRoutes";

function RoutesIndex() {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Public Routes (Accessible without login) */}
      {PublicRoutes}

      {/* Private Routes (Only accessible when logged in) */}
      {token ? (
        PrivateRoutes
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}

export default RoutesIndex;
