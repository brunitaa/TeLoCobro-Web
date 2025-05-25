/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  BadgeDollarSign,
  X
} from "lucide-react";

function ClientModal({ client, onClose }) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 px-4 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200"
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
          >
            <X size={20} />
          </button>

          {/* Título centrado */}
          <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center justify-center gap-2 text-center">
            Cliente
          </h2>

          {/* Información del cliente */}
          <div className="space-y-4 text-gray-800 text-sm sm:text-base">
            <InfoItem icon={<User size={18} />} label="Nombre">
              {client.name}
            </InfoItem>
            <InfoItem icon={<BadgeDollarSign size={18} />} label="NIT">
              {client.nit}
            </InfoItem>
            <InfoItem icon={<Mail size={18} />} label="Email">
              {client.email}
            </InfoItem>
            <InfoItem icon={<Phone size={18} />} label="Teléfono">
              {client.phone_number}
            </InfoItem>
          </div>

          {/* Botón cerrar */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="mt-8 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Cerrar
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function InfoItem({ icon, label, children }) {
  return (
    <motion.div
      className="flex items-start gap-3"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="text-blue-500 mt-1">{icon}</div>
      <p className="break-words">
        <span className="font-medium">{label}:</span>{" "}
        <span className="text-gray-700">{children}</span>
      </p>
    </motion.div>
  );
}

export default ClientModal;