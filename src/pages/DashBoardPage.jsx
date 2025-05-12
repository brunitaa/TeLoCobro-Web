import React from "react";
import Sidebar from "../components/ui/Sidebar";
import { useNavigate } from "react-router-dom";

function DashBoardPage() {
  const navigate = useNavigate();

  const handleCreateCompany = () => {
    navigate("/register-company");
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full p-10 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <button
          onClick={handleCreateCompany}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow hover:opacity-90 transition"
        >
          Crear Compañía
        </button>
      </main>
    </div>
  );
}

export default DashBoardPage;