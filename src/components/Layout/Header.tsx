"use client";
import {useAuth} from "@/context/AuthContext";

export default function Header() {
  const {token, logout} = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1>Odyssey LMS</h1>
      <div>
        {token && (
          <button onClick={logout} className="ml-4 text-red-400">
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
