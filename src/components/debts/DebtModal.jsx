import React, { useState } from "react";
import { useDebts } from "../../context/debtsContext";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 px-4">
      <div className="relative bg-white w-full max-w-md p-6 rounded-xl shadow-xl border border-gray-200">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-6 text-blue-700">Detalle de Deuda</h2>
        <div className="space-y-3 text-gray-800 text-sm">
          <div>
            <span className="font-medium">Cliente:</span>{" "}
            {typeof debt.client_id === "object"
              ? debt.client_id.name || debt.client_id._id
              : debt.client_id}
          </div>
          <div>
            <span className="font-medium">Factura:</span> {debt.invoice_number}
          </div>
          <div>
            <span className="font-medium">Fecha de emisión:</span> {formatDate(debt.issue_date)}
          </div>
          <div>
            <span className="font-medium">Vencimiento:</span> {formatDate(debt.due_date)}
          </div>
          <div>
            <span className="font-medium">Moneda:</span> {debt.currency}
          </div>
          <div>
            <span className="font-medium">Monto:</span> {debt.outstanding}
          </div>
          <div>
            <span className="font-medium">Estado:</span>{" "}
            <select
              value={newStatus}
              onChange={handleStatusChange}
              disabled={loading}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="pending">Pendiente</option>
              <option value="paid">Pagada</option>
              <option value="overdue">Vencida</option>
            </select>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default DebtModal;
