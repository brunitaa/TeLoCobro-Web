/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

function ClientRow({ client, index, onClick }) {
  return (
    <motion.tr
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      whileHover={{ scale: 1.01, backgroundColor: "#EFF6FF" }} 
      className="cursor-pointer text-sm sm:text-base"
    >
      <td className="px-3 sm:px-6 py-3">{index + 1}</td>
      <td className="px-3 sm:px-6 py-3 font-medium break-words">{client.name}</td>
      <td className="px-3 sm:px-6 py-3 break-words">{client.nit}</td>
      <td className="px-3 sm:px-6 py-3 break-words">{client.email}</td>
      <td className="px-3 sm:px-6 py-3 break-words">{client.phone_number}</td>
    </motion.tr>
  );
}

export default ClientRow;