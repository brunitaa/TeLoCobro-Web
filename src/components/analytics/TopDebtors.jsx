/* eslint-disable no-unused-vars */
import React from "react";
import { useDebts } from "../../context/debtsContext";
import { motion } from "framer-motion";

export default function TopDebtors() {
  const { debts } = useDebts();

  const debtMap = debts.reduce((acc, debt) => {
    const clientId = debt.client_id?._id || "Sin ID";
    const clientName = debt.client_id?.name || "Desconocido";
    const amount = Number(debt.outstanding) || 0;

    if (!acc[clientId]) {
      acc[clientId] = { name: clientName, total: 0 };
    }

    acc[clientId].total += amount;
    return acc;
  }, {});

  const topDebtors = Object.entries(debtMap)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 w-full max-w-xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Deudores</h2>
      <ul className="space-y-3">
        {topDebtors.map((debtor, index) => (
          <li
            key={debtor.id}
            className="flex items-center justify-between text-sm text-gray-700 border-b pb-2"
          >
            <span className="font-medium">
              {index + 1}. {debtor.name}
            </span>
            <span className="text-blue-600 font-semibold">
              Bs. {debtor.total.toFixed(2)}
            </span>
          </li>
        ))}
        {topDebtors.length === 0 && (
          <li className="text-gray-500 text-center">No hay datos de deudores.</li>
        )}
      </ul>
    </motion.div>
  );
}