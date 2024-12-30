import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMic, setSelectedMic] = useState({ id: null, label: null });
  const [selectedCam, setSelectedCam] = useState({ id: null, label: null });
  const [selectedSpeaker, setSelectedSpeaker] = useState({
    id: null,
    label: null,
  });
  const [isCameraAllowed, setIsCameraAllowed] = useState(false);
  const [isMicrophoneAllowed, setIsMicrophoneAllowed] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        selectedMic,
        selectedCam,
        selectedSpeaker,
        isCameraAllowed,
        isMicrophoneAllowed,

        setIsSidebarOpen,
        setSelectedMic,
        setSelectedCam,
        setSelectedSpeaker,
        setIsCameraAllowed,
        setIsMicrophoneAllowed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
