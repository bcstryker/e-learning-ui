// Question type
export interface Question {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation?: string; // Optional field
}

// Section type
export interface Section {
  sectionId: string;
  title: string;
  description?: string; // Optional field
}

// Course type
export interface Course {
  courseId: string;
  title: string;
  description: string;
  sections: Section[]; // Array of sections
}

export interface JwtPayload {
  role: string;
  email: string;
  courses: Course[];
  exp?: number;
}
