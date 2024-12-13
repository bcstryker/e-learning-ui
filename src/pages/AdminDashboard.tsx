import React from "react";

interface AdminDashboardProps {
  // token: string | null;
}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
      <p>Here, you can manage users, courses, and other administrative tasks.</p>
    </div>
  );
};

export default AdminDashboard;
