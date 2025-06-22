import React from "react";
import classNames from "classnames";

export default function RiskBadge({ prediction }) {
  const labels = { 0: "Bajo riesgo", 2: "Medio riesgo", 1: "Alto riesgo" };
  const colors = {
    0: "bg-green-100 text-green-800",
    2: "bg-yellow-100 text-yellow-800",
    1: "bg-red-100 text-red-800",
  };

  const label = labels[prediction] ?? "Desconocido";
  const color = colors[prediction] ?? "bg-gray-100 text-gray-800";

  return (
    <span
      className={classNames(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        color
      )}
    >
      {label}
    </span>
  );
}