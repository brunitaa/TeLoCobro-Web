import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";

function DashBoardPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto bg-gray-50">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          Dashboard
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Bienvenido al panel de control. Usa la barra lateral para navegar por las funcionalidades disponibles.
        </p>
      </div>
    </DashboardLayout>
  );
}

export default DashBoardPage;