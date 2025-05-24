import React from "react";

function DebtSearchBar({ filterByStatus, setFilterByStatus, searchTerm, setSearchTerm }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <select
        value={filterByStatus}
        onChange={(e) => setFilterByStatus(e.target.value)}
        className="w-full sm:w-56 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Todos los estados</option>
        <option value="pending">Pendiente</option>
        <option value="paid">Pagada</option>
        <option value="overdue">Vencida</option>
      </select>
      <input
        type="text"
        placeholder="Buscar por nombre de cliente o factura..."
        className="w-full sm:w-72 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default DebtSearchBar;