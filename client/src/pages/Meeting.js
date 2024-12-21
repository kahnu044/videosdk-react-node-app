import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import NotFound from "./NotFound";

function Meeting() {
  const [isValidMeetingId, setIsValidMeetingId] = useState(true);

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

  if (!isValidMeetingId) {
    return <NotFound />;
  }

  return (
    <div>
      <h1>Meeting Page</h1>
      <p>Meeting ID: {meetingId}</p>
    </div>
  );
}

export default Meeting;
