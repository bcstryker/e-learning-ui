import {ReactNode} from "react";
import {AuthProvider} from "@/context/AuthContext";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import Footer from "@/components/Layout/Footer";
import "./globals.css";

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <div className="flex flex-grow">
            <Sidebar />
            <main className="flex-grow">{children}</main>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
