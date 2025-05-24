import React from "react";

function StatusBadge({ status }) {
  const getClasses = () => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getLabel = () => {
    switch (status) {
      case "paid":
        return "Pagada";
      case "pending":
        return "Pendiente";
      case "overdue":
        return "Vencida";
      default:
        return status;
    }
  };

  return (
    <span
      className={`inline-block px-3 py-1 min-w-[84px] text-center rounded-full text-xs font-semibold capitalize ${getClasses()}`}
    >
      {getLabel()}
    </span>
  );
}

export default StatusBadge;