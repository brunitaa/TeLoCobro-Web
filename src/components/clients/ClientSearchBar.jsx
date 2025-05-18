import React from "react";

function ClientSearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-6 flex justify-between items-center max-w-5xl mx-auto">
      <input
        type="text"
        placeholder="Buscar cliente por nombre, NIT o email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default ClientSearchBar;
