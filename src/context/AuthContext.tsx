"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {usePathname, useRouter} from "next/navigation";

interface AuthContextType {
  token: string | null;
  role: string | null;
  user?: {name: string; role: string} | null; // New user property
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false); // Ensure we don't trigger redirects repeatedly

  const router = useRouter();
  const pathname = usePathname();

  const DEBUG = process.env.NODE_ENV === "development";

  // Load token from localStorage on first load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      handleToken(savedToken);
    } else {
      setIsInitialized(true); // Initialize even if no token exists
    }
  }, []);

  const handleToken = (newToken: string) => {
    try {
      const decoded: {role: string} = jwtDecode(newToken);
      if (DEBUG) console.log("Decoded token:", decoded);

      setToken(newToken);
      setRole(decoded.role);
      setIsInitialized(true);

      // Redirect only if the current path is not the correct one
      if (decoded.role === "student" && pathname !== "/student") {
        router.push("/student");
      } else if (decoded.role === "admin" && pathname !== "/admin") {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      logout();
    }
  };

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    handleToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
    router.push("/login");
  };

  if (!isInitialized) return <div>Loading...</div>; // Prevent render until initialized

  return <AuthContext.Provider value={{token, role, login, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
