import React, { useState, useEffect, useContext } from "react";
import {
  HiOutlineVideoCamera,
  HiOutlineVideoCameraSlash,
} from "react-icons/hi2";
import { BsMic, BsMicMute } from "react-icons/bs";
import AppContext from "../../context/AppContext";
import { Constants, useMediaDevice } from "@videosdk.live/react-sdk";

function PreviewVideo() {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [cameraList, setCameraList] = useState([]);
  const [micList, setMicList] = useState([]);
  const [speakerList, setSpeakerList] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [selectedMic, setSelectedMic] = useState("");
  const [selectedSpeaker, setSelectedSpeaker] = useState("");
  const { isCameraAllowed, setIsCameraAllowed, setIsMicrophoneAllowed } =
    useContext(AppContext);

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  useEffect(() => {
    navigator?.mediaDevices?.enumerateDevices().then((devices) => {
      const cameras = devices.filter((device) => device.kind === "videoinput");
      const mics = devices.filter((device) => device.kind === "audioinput");
      const speakers = devices.filter(
        (device) => device.kind === "audiooutput"
      );

      setCameraList(cameras);
      setMicList(mics);
      setSpeakerList(speakers);
    });
  }, []);

  // Step 1: Check Permissions - https://docs.videosdk.live/react/guide/video-and-audio-calling-api-sdk/setup-call/precall#step-1-check-permissions
  const { checkPermissions, requestPermission } = useMediaDevice();

  // check permission for camera and microphone
  const checkMediaPermission = async () => {
    try {
      const checkAudioVideoPermission = await checkPermissions();
      const isCameraPermissionAllowed = checkAudioVideoPermission.get(
        Constants.permission.VIDEO
      );
      const isMicrophonePermissionAllowed = checkAudioVideoPermission.get(
        Constants.permission.AUDIO
      );

      // Check if permission is allowed or not
      if (isCameraPermissionAllowed) {
        setIsCameraAllowed(isCameraPermissionAllowed);
      } else {
        console.log(
          "camera permission not allowed, request for camera permission"
        );
        await requestAudioVideoPermission(Constants.permission.VIDEO);
      }

      if (isMicrophonePermissionAllowed) {
        setIsMicrophoneAllowed(isMicrophonePermissionAllowed);
      } else {
        console.log(
          "microphone permission not allowed, request for microphone permission"
        );
        await requestAudioVideoPermission(Constants.permission.AUDIO);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkMediaPermission();
    return () => {};
  }, []);

  // Step 2: Request Permissions - https://docs.videosdk.live/react/guide/video-and-audio-calling-api-sdk/setup-call/precall#step-2-request-permissions-if-necessary
  // In case permissions are blocked by the user, the browser's permission request dialogue cannot be re-rendered programmatically. In such cases, consider providing guidance to users on manually adjusting their browser settings.
  async function requestAudioVideoPermission(permissionType) {
    try {
      const permission = await requestPermission(permissionType);

      if (permissionType === Constants.permission.VIDEO) {
        const isVideoAllowed = permission.get(Constants.permission.VIDEO);
        setIsCameraAllowed(isVideoAllowed);
      }

      if (permissionType === Constants.permission.AUDIO) {
        const isAudioAllowed = permission.get(Constants.permission.AUDIO);
        setIsMicrophoneAllowed(isAudioAllowed);
      }
    } catch (ex) {
      console.log("Error in requestPermission", ex);
    }
  }

  return (
    <div>
      <div className="bg-black w-full h-64 lg:h-[400px] rounded-lg flex items-center justify-center relative">
        <video className="w-full h-full object-cover" autoPlay muted></video>
        <span className="absolute text-white bottom-3 left-3">Kahnu</span>
        <span className="absolute text-white">
          {isCameraOn ? "Camera is on" : "Camera is off "}
        </span>
        <div className="absolute bottom-3 flex gap-4 items-center">
          <span
            className={`text-white text-xl md:text-2xl rounded-full border p-3 md:p-4 cursor-pointer ${
              !isMicOn ? "bg-red-500" : ""
            }`}
            onClick={toggleMic}
          >
            {isMicOn ? <BsMic /> : <BsMicMute />}
          </span>

          <span
            className={`text-white text-xl md:text-2xl rounded-full border p-3 md:p-4 cursor-pointer ${
              !isCameraOn ? "bg-red-500" : ""
            }`}
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

      <div className="w-full flex flex-col md:flex-row items-center gap-0 md:gap-2 justify-around">
        <div className="w-full">
          <select
            id="camera"
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            className="w-full mt-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300"
          >
            {cameraList.map((camera, index) => (
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
            {micList.map((mic, index) => (
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
  );
}

export default PreviewVideo;
