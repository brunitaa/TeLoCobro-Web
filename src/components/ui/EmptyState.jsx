import React from "react";
import { Inbox } from "lucide-react";

function EmptyState({
  title = "Sin resultados",
  subtitle = "No hay datos disponibles para mostrar.",
  icon = <Inbox size={32} />,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center text-gray-600">
      <div className="mb-4 text-blue-500">{icon}</div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-sm sm:text-base mt-1">{subtitle}</p>
    </div>
  );
}

export default EmptyState;