// /src/layouts/BaseLayout.tsx
import React, {ReactNode, useEffect, useState} from "react";
import {getSections, getQuestions} from "../services/apiService";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import MainContent from "../components/Layout/MainContent";
import Footer from "../components/Layout/Footer";
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "../types";
import {getDecodedToken} from "../utils/token";

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({children}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const token = getDecodedToken();
    if (token && token.courses) {
    }
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        setCourses(decoded.courses);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);
  console.log(courses);
  // TODO: Replace with logic to get an actual course code from user context or state
  const defaultCourseCode = "DEVOPS";

  useEffect(() => {
    async function loadSections() {
      try {
        const secs = await getSections(defaultCourseCode);
        if (secs && secs.length > 0) {
          setSections(secs);
          setSelectedSection(secs[0].sectionId); // Automatically select first section
        } else {
          setSections([]);
        }
      } catch (error) {
        console.error("Error loading sections:", error);
      }
    }
    loadSections();
  }, [defaultCourseCode]);

  useEffect(() => {
    async function loadQuestions() {
      if (selectedSection) {
        try {
          const qs = await getQuestions(selectedSection);
          setQuestions(qs || []);
        } catch (error) {
          console.error("Error loading questions:", error);
          setQuestions([]);
        }
      }
    }
    loadQuestions();
  }, [selectedSection]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-grow flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          sections={sections}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />

        <MainContent questions={questions}>{children}</MainContent>
      </main>

      <Footer />
    </div>
  );
};

export default BaseLayout;
