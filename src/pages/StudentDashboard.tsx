import React from "react";
import BaseLayout from "../layouts/BaseLayout";

interface StudentDashboardProps {
  token: string | null;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({token}) => {
  return <BaseLayout />;
};

export default StudentDashboard;
