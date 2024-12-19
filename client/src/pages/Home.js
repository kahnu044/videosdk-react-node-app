import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/meetings");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="flex flex-col lg:flex-row justify-center items-center h-screen px-8 lg:px-16 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 text-white">
        <h1 className="text-4xl lg:text-6xl font-bold">
          Host or Join Live Meetings Instantly
        </h1>
        <p className="text-lg lg:text-xl">
          Seamlessly create or join meetings with just one click. Real-time
          video, screen sharing, and more—right from your browser.
        </p>
        <div className="flex justify-center lg:justify-start space-x-4">
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg hover:bg-gray-100 transition duration-300"
          >
            {!isLoggedIn ? "Get Started" : "Go to Meetings"}
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center lg:justify-end">
        <img
          src="/meetings_hero.svg"
          alt="Live Meeting "
          className="w-3/4 lg:w-2/3 animate-pulse"
        />
      </div>
    </section>
  );
}

export default Home;
