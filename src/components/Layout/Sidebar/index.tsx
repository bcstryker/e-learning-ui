"use client"; // Needed for state and useEffect
import {Section} from "@/types";
import {useEffect, useState} from "react";

export default function Sidebar() {
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    async function loadSections() {
      try {
        const response = await fetch("/api/sections");
        const data = await response.json();
        setSections(data || []);
        setSelectedSection(data[0]?.sectionId || null);
      } catch (error) {
        console.error("Failed to fetch sections:", error);
      }
    }
    loadSections();
  }, []);

  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="font-bold mb-4">Sections</h2>
      <ul>
        {sections.map((section) => (
          <li key={section.sectionId} className="mb-2">
            <a
              href="#"
              className={`hover:text-blue-500 ${selectedSection === section.sectionId ? "text-blue-500" : ""}`}
              onClick={() => setSelectedSection(section.sectionId)}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
