/* eslint-disable no-unused-vars */
import React from "react";
import ClientRow from "./ClientRow";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ClientTable({ clients, sortField, sortOrder, onSort }) {
  const navigate = useNavigate();

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
        {sortOrder === "asc" ? (
          <ChevronUp size={14} />
        ) : (
          <ChevronDown size={14} />
        )}
      </motion.span>
    );
  };

  const headers = [
    { label: "Nombre", field: "name" },
    { label: "NIT", field: "nit" },
    { label: "Email", field: "email" },
    { label: "Teléfono", field: "phone_number" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="overflow-x-auto rounded-lg shadow border border-gray-200"
    >
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 font-semibold text-left">
          <tr>
            <th className="px-4 py-3 whitespace-nowrap">#</th>
            {headers.map(({ label, field }) => (
              <th
                key={field}
                className="px-4 py-3 cursor-pointer whitespace-nowrap hover:text-blue-600 transition"
                onClick={() => onSort(field)}
              >
                {label}
                {renderSortIcon(field)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {clients.map((client, idx) => (
            <ClientRow
              key={client._id}
              client={client}
              index={idx}
              onClick={() => navigate(`/clients/${client._id}`)}
            />
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

export default ClientTable;