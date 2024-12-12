export interface JwtPayload {
  role: string;
  email: string;
  courses: Course[];
  exp?: number;
}

interface Course {
  _id: string;
  code: string;
  title: string;
  description: string;
}
