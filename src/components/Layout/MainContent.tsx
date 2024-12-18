// /src/components/Layout/MainContent.tsx
import {Question} from "@/types";
import React from "react";

interface MainContentProps {
  children?: React.ReactNode;
  questions: Question[];
}

const MainContent: React.FC<MainContentProps> = ({children, questions}) => {
  return (
    <div className="flex-grow p-4">
      {children}
      <h2 className="text-xl font-bold mb-4">Questions</h2>
      {questions && questions.length > 0 ? (
        <ul className="space-y-2">
          {questions.map((q) => (
            <li key={q._id} className="border-b border-gray-200 pb-2">
              <h3 className="font-semibold">{q.questionText}</h3>
              {/* Additional question details can be rendered here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions available for this section.</p>
      )}
    </div>
  );
};

export default MainContent;
