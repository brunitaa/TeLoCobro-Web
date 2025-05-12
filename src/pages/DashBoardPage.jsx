import React from "react";
import { useNavigate } from "react-router-dom";

function DashBoardPage() {
  const navigate = useNavigate();

  const handleCreateCompany = () => {
    navigate("/register-company"); // Redirige a la página de creación de compañías
  };

  return (
    <section className="bg-red-500 flex flex-col justify-center items-center h-screen">
      <h1 className="text-white text-3xl mb-6">DASHBOARD!</h1>
      <button
        onClick={handleCreateCompany}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Crear Compañía
      </button>
    </section>

  );
}

export default DashBoardPage;
