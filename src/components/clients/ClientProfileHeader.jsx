import React from "react";
import { User, Mail, Phone, BadgeDollarSign } from "lucide-react";
import RiskBadge from "../risk/RiskBadge";

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition w-full">
    <div className="text-blue-600 bg-blue-100 p-2 rounded-full">{icon}</div>
    <div className="flex flex-col text-sm sm:text-base">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="text-gray-800 break-words">{value || "—"}</span>
    </div>
  </div>
);

export default function ClientProfileHeader({ client, riskPrediction }) {
  return (
    <section className="bg-white p-6 rounded-xl shadow border border-gray-200 space-y-6">
      <div className="flex flex-col items-end sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-blue-700 self-start sm:self-auto">
          Datos del Cliente
        </h2>
        <RiskBadge
          prediction={riskPrediction}
          className="text-sm sm:text-base"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoItem icon={<User size={20} />} label="Nombre" value={client.name} />
        <InfoItem icon={<BadgeDollarSign size={20} />} label="NIT" value={client.nit} />
        <InfoItem icon={<Mail size={20} />} label="Email" value={client.email} />
        <InfoItem icon={<Phone size={20} />} label="Teléfono" value={client.phone_number} />
      </div>
    </section>
  );
}