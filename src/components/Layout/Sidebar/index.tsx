import React, {useState} from "react";
import SectionCard from "./SectionCard";
import CollapseExpandButton from "./CollapseExpandButton";
import {ISection} from "@/types";

interface SidebarProps {
  sections: ISection[];
}

const Sidebar: React.FC<SidebarProps> = ({sections}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleToggleExpand = (sectionId: string) => {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <aside
      className={`max-h-[86vh] bg-gray-100 border-r border-gray-300 transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      } p-2 overflow-y-auto relative`}
    >
      <CollapseExpandButton sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <h2 className="font-semibold text-gray-700 mb-4 whitespace-nowrap overflow-hidden text-ellipsis">
        {sidebarOpen && "Sections"}
      </h2>

      <ul className="space-y-2">
        {sidebarOpen &&
          sections.map((section) => (
            <li key={section._id}>
              <SectionCard
                section={section}
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
                sidebarOpen={sidebarOpen}
                isExpanded={expandedSection === section._id}
                onToggleExpand={() => handleToggleExpand(section._id)}
              />
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
