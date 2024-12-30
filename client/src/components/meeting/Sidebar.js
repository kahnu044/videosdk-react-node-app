import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

function Sidebar() {
  const { isSidebarOpen } = useContext(AppContext);

  return (
    <div className={`${!isSidebarOpen ? "hidden": ""} w-full max-w-[350px] bg-gray-200 p-4`}>
      Right Section
    </div>
  );
}

export default Sidebar;
