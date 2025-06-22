/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function SendSuccessOverlay({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-lg">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mb-2" />
            <p className="text-lg font-medium text-gray-800">¡Notificación enviada con éxito!</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}