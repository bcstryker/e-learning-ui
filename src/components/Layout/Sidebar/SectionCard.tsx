import {Section} from "@/types";

interface SectionCardProps {
  section: Section;
  selectedSection: string | null;
  setSelectedSection: (sectionId: string) => void;
  sidebarOpen: boolean;
  isExpanded: boolean;
  onToggleExpand: (sectionId: string) => void;
}

const SectionCard = ({
  section,
  selectedSection,
  setSelectedSection,
  sidebarOpen,
  isExpanded,
  onToggleExpand,
}: SectionCardProps) => {
  const isSelected = selectedSection === section.sectionId;

  return (
    <div className={`w-full rounded bg-gray-100 ${isExpanded ? "shadow-md" : ""} transition-all`}>
      {/* Main Card */}
      <button
        onClick={() => {
          setSelectedSection(section.sectionId); // Update selected section
          onToggleExpand(section.sectionId); // Update expanded state
        }}
        className={`w-full text-left px-4 py-2 rounded hover:bg-gray-200 ${isSelected ? "bg-gray-300" : "bg-gray-100"}`}
        style={{
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          whiteSpace: "normal",
          textAlign: "left",
        }}
      >
        {sidebarOpen ? (
          <span
            className="text-ellipsis overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              wordWrap: "break-word",
            }}
          >
            {section.title}
          </span>
        ) : (
          <span>{section.title.charAt(0)}</span>
        )}
      </button>

      {/* Expanded Options */}
      {isExpanded && (
        <div className="bg-gray-200 mt-2 rounded p-2 space-y-2">
          <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-300">Lesson Summary</button>
          <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-300">Quiz</button>
          <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-300">Flashcards</button>
          <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-300">Experiment</button>
        </div>
      )}
    </div>
  );
};

export default SectionCard;
