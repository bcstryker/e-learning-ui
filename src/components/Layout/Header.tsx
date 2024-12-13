// /src/components/Layout/Header.tsx
import React from "react";

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({sidebarOpen, toggleSidebar}) => {
  return (
    <header className="bg-blue-500 text-white p-4 flex items-center justify-between">
      <h1 className="text-lg font-bold">E-Learning Platform</h1>
      <button onClick={toggleSidebar} className="bg-blue-700 px-2 py-1 rounded hover:bg-blue-600">
        {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
      </button>
    </header>
  );
};

export default Header;
