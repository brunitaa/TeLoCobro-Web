import React from "react";

function ClientRow({ client, index, onClick }) {
  return (
    <tr
      className="hover:bg-blue-50 transition cursor-pointer text-sm sm:text-base"
      onClick={onClick}
    >
      <td className="px-3 sm:px-6 py-3">{index + 1}</td>
      <td className="px-3 sm:px-6 py-3 font-medium break-words">{client.name}</td>
      <td className="px-3 sm:px-6 py-3 break-words">{client.nit}</td>
      <td className="px-3 sm:px-6 py-3 break-words">{client.email}</td>
      <td className="px-3 sm:px-6 py-3 break-words">{client.phone_number}</td>
    </tr>
  );
}

export default ClientRow;