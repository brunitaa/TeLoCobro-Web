import React from "react";

function DebtRow({ debt, index, onClick }) {
  const formatDate = (dateStr) => (dateStr ? dateStr.slice(0, 10) : "");

  // Traducción de estados
  const translateStatus = (status) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "paid":
        return "Pagada";
      case "overdue":
        return "Vencida";
      default:
        return status;
    }
  };

  return (
    <tr className="hover:bg-blue-50 transition cursor-pointer" onClick={onClick}>
      <td className="px-4 sm:px-6 py-3">{index + 1}</td>
      <td className="px-4 sm:px-6 py-3 break-words max-w-[140px]">
        {typeof debt.client_id === "object"
          ? debt.client_id.name || debt.client_id._id
          : debt.client_id}
      </td>
      <td className="px-4 sm:px-6 py-3">{formatDate(debt.issue_date)}</td>
      <td className="px-4 sm:px-6 py-3 break-words max-w-[120px]">{debt.invoice_number}</td>
      <td className="px-4 sm:px-6 py-3">{formatDate(debt.due_date)}</td>
      <td className="px-4 sm:px-6 py-3">{debt.currency}</td>
      <td className="px-4 sm:px-6 py-3">{debt.outstanding}</td>
      <td className="px-4 sm:px-6 py-3 capitalize">{translateStatus(debt.status)}</td>
    </tr>
  );
}

export default DebtRow;
