import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import NotFound from "./NotFound";
import Header from "../components/meeting/Header";
import MainMeeting from "../components/meeting/MainMeeting";
import Footer from "../components/meeting/Footer";

function Meeting() {
  const [isValidMeetingId, setIsValidMeetingId] = useState(true);
  const [showChatBox, setShowChatBox] = useState(false);

  const navigate = useNavigate();
  const { meetingId } = useParams();

  useEffect(() => {
    document.title = "Meeting";
    // Define the regex for a valid meeting ID pattern
    const validMeetingIdPattern =
      /^[a-zA-Z0-9]{3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$/;

    const isValidMeetingId = validMeetingIdPattern.test(meetingId);

    if (!isValidMeetingId) {
      setIsValidMeetingId(false);
      navigate("/404", { replace: true });
    }
  }, [meetingId, navigate]);

  const handleToggleChatBox = () => {
    setShowChatBox((prev) => !prev);
  };

  if (!isValidMeetingId) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="flex flex-col min-h-screen bg-slate-500">
        <Header />

        <MainMeeting />

        <Footer />
      </div>
    </div>
  );
}

export default Meeting;
