import React from "react";

function DebtSearchBar({ filterByStatus, setFilterByStatus, searchTerm, setSearchTerm }) {
  return (
    <div className="flex gap-2">
      <select
        value={filterByStatus}
        onChange={(e) => setFilterByStatus(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Todos los estados</option>
        <option value="pending">Pendiente</option>
        <option value="paid">Pagada</option>
        <option value="overdue">Vencida</option>
      </select>
      <input
        type="text"
        placeholder="Buscar por nombre de cliente o factura..."
        className="border border-gray-300 rounded px-3 py-1 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default DebtSearchBar;
