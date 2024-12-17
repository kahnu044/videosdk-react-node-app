import React, { useState } from "react";

function MeetingActionButton() {

  const [actionType, setActionType] = useState(null);

  const handleCreateClick = () => setActionType("create");
  const handleJoinClick = () => setActionType("join");

  const handleCreateMeeting = () => {
    alert("Create Meeting");
  };

  const handleJoinMeeting = () => {
    alert("Join Meeting");
  };

  return (
    <div className="w-full text-center mb-6">

      {/* Create Meeting Form */}
      {actionType === "create" && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Create Meeting</h2>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 mb-4 border rounded"
          />
          <button
            className="bg-blue-500 text-white font-semibold px-4 py-3 rounded-lg mb-4 hover:bg-blue-600 w-full"
            onClick={handleCreateMeeting}
          >
            Create
          </button>
        </div>
      )}

      {/* Join Meeting Form */}
      {actionType === "join" && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Join Meeting</h2>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 mb-4 border rounded"
          />
          <input
            type="text"
            placeholder="Enter meeting code"
            className="w-full px-4 py-2 mb-4 border rounded"
          />
          <button
            className="bg-green-500 text-white font-semibold px-4 py-3 rounded-lg mb-4 hover:bg-green-600 w-full"
            onClick={handleJoinMeeting}
          >
            Join
          </button>
        </div>
      )}

      {/* Render the "OR" divider */}
      {actionType !== null && (
        <div className="relative flex items-center mb-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      )}

      {/* Render Create Meeting Button */}
      {actionType !== "create" && (
        <button
          onClick={handleCreateClick}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg mb-4 hover:bg-blue-600 transition-all"
        >
          Create Meeting
        </button>
      )}

      {/* Render Join Meeting Button */}
      {actionType !== "join" && (
        <button
          onClick={handleJoinClick}
          className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
        >
          Join Meeting
        </button>
      )}
    </div>
  );
}

export default MeetingActionButton;
