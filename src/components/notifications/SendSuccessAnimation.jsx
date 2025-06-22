/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function SendSuccessOverlay({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Fondo semitransparente */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          {/* Cartel centrado */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-xl max-w-xs mx-4">
              <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">¡Enviado!</h3>
              <p className="mt-2 text-gray-600 text-center">
                Tu notificación fue enviada con éxito.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}