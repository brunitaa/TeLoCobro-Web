/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

function DebtSearchBar({ filterByStatus, setFilterByStatus, searchTerm, setSearchTerm }) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-3 w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative">
        <select
          value={filterByStatus}
          onChange={(e) => setFilterByStatus(e.target.value)}
          className="
            w-auto sm:w-56
            border border-gray-300
            rounded-lg px-4 py-2 text-sm
            bg-white shadow-sm
            focus:outline-none focus:ring-2 focus:ring-purple-500
            transition-all
            z-10
          "
        >
          <option value="">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="paid">Pagada</option>
          <option value="overdue">Vencida</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Buscar por cliente o número de factura..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          w-full sm:w-72
          border border-gray-300
          rounded-lg px-4 py-2 text-sm
          shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-all
        "
      />
    </motion.div>
  );
}

export default DebtSearchBar;