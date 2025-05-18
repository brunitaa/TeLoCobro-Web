import React from "react";

const ClientModal = ({ client, onClose }) => {
  if (!client) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
        <h3 className="text-2xl font-bold mb-4 text-blue-700">
          Información del Cliente
        </h3>
        <p className="mb-2"><strong>Nombre:</strong> {client.name}</p>
        <p className="mb-2"><strong>NIT:</strong> {client.nit}</p>
        <p className="mb-2"><strong>Email:</strong> {client.email}</p>
        <p className="mb-2"><strong>Teléfono:</strong> {client.phone_number}</p>

        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ClientModal;