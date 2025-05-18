import React from "react";
import ClientRow from "./ClientRow";
import { ChevronDown, ChevronUp } from "lucide-react";

function ClientTable({ clients, onSelectClient, sortField, sortOrder, onSort }) {
  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUp size={14} className="inline ml-1" />
    ) : (
      <ChevronDown size={14} className="inline ml-1" />
    );
  };

  const headers = [
    { label: "Nombre", field: "name" },
    { label: "NIT", field: "nit" },
    { label: "Email", field: "email" },
    { label: "Teléfono", field: "phone_number" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
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
          {clients.map((client, idx) => (
            <ClientRow
              key={client._id}
              client={client}
              index={idx}
              onClick={() => onSelectClient(client)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientTable;