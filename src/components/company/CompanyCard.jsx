import React from "react";
import { Card } from "../../components/ui/Card";
import {
  Building2,
  BadgePercent,
  FileText,
  MapPin,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  return (
    <Card className="relative w-full max-w-2xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-2xl space-y-6">
      {/* Botón editar */}
      <button
        onClick={() => navigate("/edit-company")}
        className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 transition"
        title="Editar compañía"
      >
        <Pencil size={18} />
      </button>

      {/* Encabezado */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
        <div className="bg-blue-100 text-blue-600 rounded-full p-3 shrink-0">
          <Building2 size={24} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 break-words">
          {company.name || "Sin nombre"}
        </h2>
      </div>

      {/* Detalles */}
      <div className="space-y-4 text-sm sm:text-base">
        <div className="flex items-start gap-3">
          <BadgePercent className="mt-1 min-w-[18px]" size={18} />
          <p className="break-words">
            <span className="font-semibold">NIT:</span>{" "}
            {company.nit || "No disponible"}
          </p>
        </div>
        <div className="flex items-start gap-3">
          <FileText className="mt-1 min-w-[18px]" size={18} />
          <p className="break-words">
            <span className="font-semibold">Razón Social:</span>{" "}
            {company.legal_name || "No disponible"}
          </p>
        </div>
        <div className="flex items-start gap-3">
          <FileText className="mt-1 min-w-[18px]" size={18} />
          <p className="break-words">
            <span className="font-semibold">Descripción:</span>{" "}
            {company.description || "No disponible"}
          </p>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="mt-1 min-w-[18px]" size={18} />
          <p className="break-words">
            <span className="font-semibold">Ciudad:</span>{" "}
            {company.location?.city || "No disponible"}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CompanyCard;