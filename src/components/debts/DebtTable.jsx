import React from "react";
import DebtRow from "./DebtRow";
import { ChevronDown, ChevronUp } from "lucide-react";

function DebtTable({ debts, onSelectDebt, sortField, sortOrder, onSort }) {
  const headers = [
    { label: "Cliente", field: "client" },
    { label: "Fecha Emisión", field: "issue_date" },
    { label: "Factura", field: "invoice_number" },
    { label: "Vencimiento", field: "due_date" },
    { label: "Moneda", field: "currency" },
    { label: "Monto", field: "outstanding" },
    { label: "Estado", field: "status" },
  ];

  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUp size={14} className="inline ml-1" />
    ) : (
      <ChevronDown size={14} className="inline ml-1" />
    );
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200 mt-8">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 font-semibold text-left">
          <tr>
            <th className="px-6 py-3">#</th>
            {headers.map(({ label, field }) => (
              <th
                key={field}
                className="px-6 py-3 cursor-pointer hover:text-blue-600 transition"
                onClick={() => onSort(field)}
              >
                {label}
                {renderSortIcon(field)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {debts.map((debt, idx) => (
            <DebtRow
              key={debt._id}
              debt={debt}
              index={idx}
              onClick={() => onSelectDebt(debt)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DebtTable;
