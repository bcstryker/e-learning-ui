import {Types} from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "student" | "admin";
  courses: Array<{
    courseId: Types.ObjectId;
    code: string;
  }>;
}
export interface IQuestion {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface ISection {
  _id: string;
  sectionId: string;
  title: string;
  description?: string;
}

export interface ICourse {
  courseId: string;
  title: string;
  description: string;
  sections: ISection[];
}

export interface JwtPayload {
  role: string;
  email: string;
  courses: Course[];
  exp?: number;
}
