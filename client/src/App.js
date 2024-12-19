import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router"; // Correct import
import Home from "./pages/Home";
import Login from "./pages/Login";
import Meeting from "./pages/Meeting";
import Meetings from "./pages/Meetings";
import NotFound from "./pages/NotFound";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/meetings/:meetingId" element={<Meeting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
