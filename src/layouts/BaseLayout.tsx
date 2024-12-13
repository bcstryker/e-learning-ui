// /src/layouts/BaseLayout.tsx
import React, {ReactNode, useEffect, useState} from "react";
import {getSections, getQuestions, getCourses} from "../services/apiService";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import MainContent from "../components/Layout/MainContent";
import Footer from "../components/Layout/Footer";
// import {jwtDecode} from "jwt-decode";
// import {JwtPayload} from "../types";
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
  const [defaultCourseCode, setDefaultCourseCode] = useState<string | null>("DEVOPS");

  useEffect(() => {
    async function loadCourses() {
      try {
        const courses = await getCourses();
        console.log("User courses: ", courses);
        if (courses && courses.length > 0) {
          setCourses(courses);
          setDefaultCourseCode(courses[0].courseCode);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error("Error loading courses:", error);
      }
    }
    loadCourses();
  }, []);

  useEffect(() => {
    async function loadSections() {
      if (defaultCourseCode) {
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
    }
    loadSections();
  }, [defaultCourseCode]);

  useEffect(() => {
    console.log("Course Sections: ", sections);
  }, [sections]);

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
