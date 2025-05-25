/* eslint-disable no-unused-vars */
import React from "react";
import StatusBadge from "./StatusBadge";
import { motion } from "framer-motion";

function DebtRow({ debt, index, onClick }) {
  const formatDate = (dateStr) => (dateStr ? dateStr.slice(0, 10) : "");

  return (
    <motion.tr
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      whileHover={{ scale: 1.01, backgroundColor: "#EFF6FF" }}
      className="cursor-pointer text-sm sm:text-base"
    >
      <td className="px-4 sm:px-6 py-3">{index + 1}</td>
      <td className="px-4 sm:px-6 py-3 break-words max-w-[140px]">
        {typeof debt.client_id === "object"
          ? debt.client_id.name || debt.client_id._id
          : debt.client_id}
      </td>
      <td className="px-4 sm:px-6 py-3">{formatDate(debt.issue_date)}</td>
      <td className="px-4 sm:px-6 py-3 break-words max-w-[120px]">{debt.invoice_number}</td>
      <td className="px-4 sm:px-6 py-3">{formatDate(debt.due_date)}</td>
      <td className="px-4 sm:px-6 py-3">{debt.currency}</td>
      <td className="px-4 sm:px-6 py-3">{debt.outstanding}</td>
      <td className="px-4 sm:px-6 py-3">
        <StatusBadge status={debt.status} />
      </td>
    </motion.tr>
  );
}

export default DebtRow;