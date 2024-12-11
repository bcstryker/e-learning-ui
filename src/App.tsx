import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Login from "./components/Login/Login";
import AdminLayout from "./layouts/AdminLayout";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

interface JwtPayload {
  role: string;
  email: string;
  exp?: number;
}

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        setRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    if (role === "student") {
      navigate("/student");
    } else if (role === "admin") {
      navigate("/admin");
    }
  }, [role, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login setToken={setToken} />} />
      {role === "student" && <Route path="/student" element={<StudentDashboard />} />}
      {role === "admin" && (
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
      )}
    </Routes>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
