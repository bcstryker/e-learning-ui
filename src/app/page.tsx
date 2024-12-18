// src/app/page.tsx
"use client";

import Sidebar from "@/components/Layout/Sidebar";
import {useAuth} from "@/context/AuthContext";

export default function Home() {
  const {token, role} = useAuth();

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-6 bg-white shadow-md rounded">
          <h1 className="text-2xl font-bold mb-4">Login Required</h1>
          <p>Please log in to access the application.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome, {role || "User"}!</h1>
        <p>This is the main application area.</p>
      </div>
    </div>
  );
}
