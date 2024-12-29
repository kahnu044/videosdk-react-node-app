import React from "react";

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white h-16">
      <div className="text-lg font-bold">Logo</div>
      <div className="relative group">
        <span className="cursor-pointer">👤</span>
        <div className="absolute right-0 hidden mt-2 w-32 bg-white text-gray-800 shadow-lg rounded group-hover:block">
          <a href="/account" className="block px-4 py-2 hover:bg-gray-200">
            Account
          </a>
          <a href="/logout" className="block px-4 py-2 hover:bg-gray-200">
            Logout
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
