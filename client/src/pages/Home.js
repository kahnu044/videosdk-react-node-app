import React from "react";
import PreviewVideo from "../components/video/PreviewVideo";
import MeetingActionButton from "../components/common/MeetingActionButton";

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center  lg:justify-evenly min-h-screen bg-gray-100 p-4">
      {/* Left Section (Camera Overview) */}
      <div className="w-full sm:w-3/4 lg:w-1/2 flex flex-col  justify-between items-center p-4 rounded-lg mb-4 lg:mb-0">
        <PreviewVideo />
      </div>

      {/* Right Section */}
      <div className="w-full sm:w-3/4 lg:w-1/3 flex flex-col justify-between items-center p-6">
        <MeetingActionButton />
      </div>
    </div>
  );
};

export default Home;
