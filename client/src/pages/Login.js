import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "dummy-token");
    navigate("/");
  };

  useEffect(() => {
    document.title = "Login";
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-8">Please login to continue</p>
        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
