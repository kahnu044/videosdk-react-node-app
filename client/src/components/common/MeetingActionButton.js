import React from "react";

function MeetingActionButton() {
  return (
    <>
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
    </>
  );
}

export default MeetingActionButton;
