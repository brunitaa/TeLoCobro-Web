/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const KPICard = ({ icon, title, value, description }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3 hover:shadow-lg transition"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-4">
        {icon}
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </motion.div>
  );
};

export default KPICard;