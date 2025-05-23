import React from "react";
import Sidebar from "../components/ui/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 md:ml-64 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}