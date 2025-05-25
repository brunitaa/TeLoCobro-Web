/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

function ClientSearchBar({ filterBy, setFilterBy, searchTerm, setSearchTerm }) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-3 w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <select
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
        className="w-full sm:w-44 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
      >
        <option value="name">Nombre</option>
        <option value="nit">NIT</option>
        <option value="email">Email</option>
        <option value="phone_number">Teléfono</option>
      </select>

      <input
        type="text"
        placeholder={`Buscar por ${getFieldLabel(filterBy)}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full sm:w-72 border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
    </motion.div>
  );
}

function getFieldLabel(field) {
  switch (field) {
    case "name":
      return "nombre";
    case "nit":
      return "NIT";
    case "email":
      return "email";
    case "phone_number":
      return "teléfono";
    default:
      return field;
  }
}

export default ClientSearchBar;