import React from "react";

const ClientRow = ({ index, client, onSelect }) => {
  return (
    <tr
      onClick={onSelect}
      className="hover:bg-blue-50 transition cursor-pointer"
    >
      <td className="px-4 py-2">{index + 1}</td>
      <td className="px-4 py-2">{client.name}</td>
      <td className="px-4 py-2">{client.nit}</td>
      <td className="px-4 py-2">{client.email}</td>
      <td className="px-4 py-2">{client.phone_number}</td>
    </tr>
  );
};

export default ClientRow;