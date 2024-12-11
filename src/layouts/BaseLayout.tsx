import React, {ReactNode} from "react";
import {Outlet} from "react-router-dom"; // Allows rendering nested routes

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({children}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-lg font-bold">E-Learning Platform</h1>
      </header>
      <main className="flex-grow p-4">
        {children}
        <Outlet /> {/* Nested routes will be rendered here */}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 E-Learning Platform</p>
      </footer>
    </div>
  );
};

export default BaseLayout;
