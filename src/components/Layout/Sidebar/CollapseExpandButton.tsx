import React from "react";

interface CollapseExpandButtonProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const CollapseExpandButton: React.FC<CollapseExpandButtonProps> = ({sidebarOpen, toggleSidebar}) => {
  return (
    <button
      onClick={toggleSidebar}
      className={`absolute top-6 right-2 bg-gray-300 text-gray-600 hover:bg-gray-400 focus:outline-none rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-transform ${
        sidebarOpen ? "" : "rotate-180"
      }`}
      aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
      style={{transform: "translateY(-50%)"}} // Center vertically if needed
    >
      {sidebarOpen ? "<" : ">"}
    </button>
  );
};

export default CollapseExpandButton;
