interface SidebarProps {
  sidebarOpen: boolean;
  sections: any[];
  selectedSection: string | null;
  setSelectedSection: (sectionId: string) => void;
}

const Sidebar = ({sidebarOpen, sections, selectedSection, setSelectedSection}: SidebarProps) => {
  return (
    <aside
      className={`bg-gray-100 border-r border-gray-300 transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      } p-2 overflow-hidden`}
    >
      <h2 className="font-semibold text-gray-700 mb-4 whitespace-nowrap overflow-hidden text-ellipsis">
        {sidebarOpen ? "Sections" : "Sec"}
      </h2>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.sectionId}>
            <button
              onClick={() => setSelectedSection(section.sectionId)}
              className={`w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${
                selectedSection === section.sectionId ? "bg-gray-300" : ""
              }`}
            >
              {sidebarOpen ? section.title : section.title.charAt(0)}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
