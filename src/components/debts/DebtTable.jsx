/* eslint-disable no-unused-vars */
import React from "react";
import DebtRow from "./DebtRow";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

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
    return (
      <motion.span
        key={sortOrder}
        initial={{ rotate: sortOrder === "asc" ? 180 : 0 }}
        animate={{ rotate: sortOrder === "asc" ? 0 : 180 }}
        transition={{ duration: 0.2 }}
        className="inline-block ml-1"
      >
        {sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </motion.span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full overflow-x-auto rounded-lg shadow border border-gray-200 mt-8"
    >
      <table className="w-full text-sm text-gray-700 min-w-[700px]">
        <thead className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 font-semibold text-left">
          <tr>
            <th className="px-4 sm:px-6 py-3">#</th>
            {headers.map(({ label, field }) => (
              <th
                key={field}
                className="px-4 sm:px-6 py-3 cursor-pointer hover:text-blue-600 transition"
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
    </motion.div>
  );
}

export default DebtTable;