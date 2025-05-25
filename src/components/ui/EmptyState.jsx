/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Inbox } from "lucide-react";

function EmptyState({
  title = "Sin resultados",
  subtitle = "No hay datos disponibles para mostrar.",
  icon = <Inbox size={36} />,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white border border-dashed border-gray-300 rounded-2xl shadow-sm transition-all duration-300">
      <motion.div
        className="text-blue-500 mb-6"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">{title}</h3>
      <p className="text-sm sm:text-base mt-2 text-gray-600">{subtitle}</p>
    </div>
  );
}

export default EmptyState;