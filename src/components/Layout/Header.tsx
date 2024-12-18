"use client";
import {useAuth} from "@/context/AuthContext";

export default function Header() {
  const {user, logout} = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1>Odyssey LMS</h1>
      <div>
        {user ? (
          <>
            <span>
              Welcome, {user.name} ({user.role})
            </span>
            <button onClick={logout} className="ml-4 text-red-400">
              Logout
            </button>
          </>
        ) : (
          <a href="/login" className="text-blue-400">
            Login
          </a>
        )}
      </div>
    </header>
  );
}
