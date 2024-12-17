import React, { useState, useEffect } from "react";
import {
  HiOutlineVideoCamera,
  HiOutlineVideoCameraSlash,
} from "react-icons/hi2";

import { BsMic, BsMicMute } from "react-icons/bs";

const Home = () => {
  // States for the dropdowns (camera, mic, speaker)
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [cameraList, setCameraList] = useState([]);
  const [micList, setMicList] = useState([]);
  const [speakerList, setSpeakerList] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [selectedMic, setSelectedMic] = useState("");
  const [selectedSpeaker, setSelectedSpeaker] = useState("");
  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };
  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };
  useEffect(() => {
    // Simulating media device retrieval (e.g., camera, mic, speaker)
    navigator?.mediaDevices?.enumerateDevices().then((devices) => {
      const cameras = devices?.filter((device) => device.kind === "videoinput");
      const mics = devices?.filter((device) => device.kind === "audioinput");
      const speakers = devices.filter(
        (device) => device.kind === "audiooutput"
      );

      setCameraList(cameras);
      setMicList(mics);
      setSpeakerList(speakers);
    });
  }, []);
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center  lg:justify-evenly min-h-screen bg-gray-100 p-4">


      {/* Left Section (Camera Overview) */}
      <div className="w-full sm:w-3/4 lg:w-1/2 flex flex-col  justify-between items-center p-4 rounded-lg mb-4 lg:mb-0">
        <div className="bg-black w-full h-64 lg:h-[400px] rounded-lg flex items-center justify-center relative">
          <video className="w-full h-full object-cover" autoPlay muted></video>{" "}
          <span className="absolute text-white bottom-3 left-3">Kahnu</span>


          <span className="absolute text-white">{ isCameraOn ? "Camera is on" : "Camera is off "}</span>

          <div className="absolute bottom-3 flex gap-4 items-center">
            <span
              className={`text-white text-xl md:text-2xl rounded-full border p-3 md:p-4  cursor-pointer ${!isMicOn ? "bg-red-500" :  ""} `}
              onClick={toggleMic}
            >
              {isMicOn ? <BsMic /> : <BsMicMute />}
            </span>

            <span
              className={`text-white text-xl md:text-2xl rounded-full border p-3 md:p-4 cursor-pointer ${!isCameraOn ? "bg-red-500" :  ""} `}
              onClick={toggleCamera}
            >
              {isCameraOn ? (
                <HiOutlineVideoCamera />
              ) : (
                <HiOutlineVideoCameraSlash />
              )}
            </span>
          </div>
        </div>

        {/* Dropdowns for Camera, Mic, and Speaker */}
        <div className="w-full flex flex-col md:flex-row items-center gap-0 md:gap-2 justify-around">
          <div className="w-full">
            <select
              id="camera"
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
            >
              {cameraList?.map((camera, index) => (
                <option key={index} value={camera.deviceId}>
                  {camera.label || `Camera ${index + 1}`}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <select
              id="mic"
              value={selectedMic}
              onChange={(e) => setSelectedMic(e.target.value)}
              className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
            >
              {micList?.map((mic, index) => (
                <option key={index} value={mic.deviceId}>
                  {mic.label || `Microphone ${index + 1}`}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <select
              id="speaker"
              value={selectedSpeaker}
              onChange={(e) => setSelectedSpeaker(e.target.value)}
              className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
            >
              {speakerList.map((speaker, index) => (
                <option key={index} value={speaker.deviceId}>
                  {speaker.label || `Speaker ${index + 1}`}
                </option>
              ))}
            </select>
          </div>
        </div>
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
