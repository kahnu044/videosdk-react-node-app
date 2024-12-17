import React from "react";
import CameraOverview from "../components/videosdk/CameraOverview";

const Home = () => {

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center  lg:justify-evenly min-h-screen bg-gray-100 p-4">

      {/* Left Section (Camera Overview) */}
      <div className="w-full sm:w-3/4 lg:w-1/2 flex flex-col  justify-between items-center p-4 rounded-lg mb-4 lg:mb-0">
        <CameraOverview />
      </div>

      {/* Right Section */}
      <div className="w-full sm:w-3/4 lg:w-1/3 flex flex-col justify-between items-center p-6">
        <div className="w-full text-center mb-6">
          <button
            onClick={() => alert("Create Meeting")}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg mb-4 hover:bg-blue-600 transition-all"
          >
            Create Meeting
          </button>
          <button
            onClick={() => alert("Join Meeting")}
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
          >
            Join Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
