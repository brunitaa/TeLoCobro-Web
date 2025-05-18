import React from "react";
import {
  User,
  Mail,
  Phone,
  BadgeDollarSign,
  X
} from "lucide-react";

function ClientModal({ client, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="relative bg-white w-full max-w-md p-6 rounded-xl shadow-xl border border-gray-200">
        
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
          <User size={24} /> Cliente
        </h2>

        <div className="space-y-4 text-gray-800 text-sm">
          <div className="flex items-center gap-3">
            <User size={18} className="text-blue-500" />
            <p><span className="font-medium">Nombre:</span> {client.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <BadgeDollarSign size={18} className="text-blue-500" />
            <p><span className="font-medium">NIT:</span> {client.nit}</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-blue-500" />
            <p><span className="font-medium">Email:</span> {client.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-blue-500" />
            <p><span className="font-medium">Teléfono:</span> {client.phone_number}</p>
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

export default ClientModal;