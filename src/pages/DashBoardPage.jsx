import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function DashBoardPage() {
  const navigate = useNavigate();

  const handleCreateCompany = () => {
    navigate("/register-company");
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <button
        onClick={handleCreateCompany}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow hover:opacity-90 transition"
      >
        Crear Compañía
      </button>
    </DashboardLayout>
  );
}

export default DashBoardPage;