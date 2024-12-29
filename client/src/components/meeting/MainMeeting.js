import React from "react";
import Sidebar from "./Sidebar";

function MainMeeting() {
  return (
    <main className="flex flex-grow gap-2 m-2">
      <div className="flex-grow bg-gray-100 p-4">
        {/* create 4 card with same height and width only background light blue */}
        <div className="grid grid-cols-2 gap-4 h-full">
            <div className="bg-blue-100 p-4 h-full w-full">Card 1</div>
            <div className="bg-blue-100 p-4 h-full w-full">Card 2</div>
            <div className="bg-blue-100 p-4 h-full w-full">Card 3</div>
            <div className="bg-blue-100 p-4 h-full w-full">Card 4</div>
            </div>
      </div>
      <Sidebar />
    </main>
  );
}

export default MainMeeting;
