import React from "react";

function ClientRow({ client, index, onClick }) {
  return (
    <tr
      className="hover:bg-blue-50 transition cursor-pointer"
      onClick={onClick}
    >
      <td className="px-6 py-3">{index + 1}</td>
      <td className="px-6 py-3 font-medium">{client.name}</td>
      <td className="px-6 py-3">{client.nit}</td>
      <td className="px-6 py-3">{client.email}</td>
      <td className="px-6 py-3">{client.phone_number}</td>
    </tr>
  );
}

export default ClientRow;