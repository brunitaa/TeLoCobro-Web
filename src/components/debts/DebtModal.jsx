/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDebts } from "../../context/debtsContext";
import {
  X,
  User2,
  FileText,
  Calendar,
  CalendarClock,
  DollarSign,
  BadgeDollarSign,
  BadgeCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function DebtModal({ debt, onClose }) {
  const { updateDebtStatus } = useDebts();
  const [newStatus, setNewStatus] = useState(debt.status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (e) => {
    const status = e.target.value;
    setNewStatus(status);
    setLoading(true);
    await updateDebtStatus(debt._id, status);
    setLoading(false);
    onClose();
  };

  const formatDate = (dateStr) => (dateStr ? dateStr.slice(0, 10) : "");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
          >
            <X size={20} />
          </button>

          {/* Título */}
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            Detalle de Deuda
          </h2>

          {/* Sección: Información */}
          <div className="space-y-4 text-gray-800 text-sm sm:text-base">
            <SectionItem icon={<User2 size={18} />} label="Cliente">
              {typeof debt.client_id === "object"
                ? debt.client_id.name || debt.client_id._id
                : debt.client_id}
            </SectionItem>

            <SectionItem icon={<FileText size={18} />} label="Factura">
              {debt.invoice_number}
            </SectionItem>

            <SectionItem icon={<Calendar size={18} />} label="Fecha de emisión">
              {formatDate(debt.issue_date)}
            </SectionItem>

            <SectionItem
              icon={<CalendarClock size={18} />}
              label="Vencimiento"
            >
              {formatDate(debt.due_date)}
            </SectionItem>

            <SectionItem icon={<DollarSign size={18} />} label="Moneda">
              {debt.currency}
            </SectionItem>

            <SectionItem
              icon={<BadgeDollarSign size={18} />}
              label="Monto"
            >
              {debt.outstanding}
            </SectionItem>
          </div>

          {/* Separador */}
          <hr className="my-6 border-gray-200" />

          {/* Estado */}
          <div className="text-sm sm:text-base text-gray-800">
            <label className="font-semibold flex items-center gap-2 mb-2">
              <BadgeCheck size={18} /> Estado:
            </label>
            <select
              value={newStatus}
              onChange={handleStatusChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="pending">Pendiente</option>
              <option value="paid">Pagada</option>
              <option value="overdue">Vencida</option>
            </select>
          </div>

          {/* Botón cerrar */}
          <motion.button
            onClick={onClose}
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className="mt-8 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            Cerrar
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function SectionItem({ icon, label, children }) {
  return (
    <motion.div
      className="flex items-start gap-2"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="text-blue-500 mt-1">{icon}</div>
      <p>
        <span className="font-medium">{label}:</span>{" "}
        <span className="text-gray-700">{children}</span>
      </p>
    </motion.div>
  );
}

export default DebtModal;