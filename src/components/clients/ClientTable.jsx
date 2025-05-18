import React from "react";
import ClientRow from "./ClientRow";

const ClientTable = ({ clients, onSelectClient }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">NIT</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Teléfono</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-800">
          {clients.map((client, index) => (
            <ClientRow
              key={client._id}
              index={index}
              client={client}
              onSelect={() => onSelectClient(client)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;