import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";

function DashBoardPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <p className="text-gray-600">
        Bienvenido al panel de control. Usa la barra lateral para navegar por las funcionalidades disponibles.
      </p>
    </DashboardLayout>
  );
}

export default DashBoardPage;