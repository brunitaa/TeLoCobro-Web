import React from "react";
import ClientRow from "./ClientRow";

function ClientTable({ clients, onSelectClient }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 font-semibold text-left">
          <tr>
            <th className="px-6 py-3">#</th>
            <th className="px-6 py-3">Nombre</th>
            <th className="px-6 py-3">NIT</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Teléfono</th>
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