import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import AppContext from "../../context/AppContext";

function MainMeeting() {
  const { isSidebarOpen } = useContext(AppContext);

  return (
    <main className="flex flex-grow justify-center gap-2 m-2">
      <div className={`flex-grow bg-red-100 p-4 ${isSidebarOpen ? 'w-full' :'max-w-[1400px]'}`}>
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
