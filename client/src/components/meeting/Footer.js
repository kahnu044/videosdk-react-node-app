import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

function Footer() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <footer className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex space-x-2">
        <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
          Button 1
        </button>
        <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
          Button 2
        </button>
      </div>
      <div className="flex space-x-2">
        <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
          Button 1
        </button>
        <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
          Button 2
        </button>
        <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
          Button 3
        </button>
        <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
          Button 4
        </button>
        <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
          Button 5
        </button>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={toggleSidebar}
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
        >
          {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>
        <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
          Button 2
        </button>
      </div>
    </footer>
  );
}

export default Footer;
