/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  BadgePercent,
  Briefcase,
  AlignLeft,
  MapPin,
  CheckCircle,
  XCircle,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);

  useEffect(() => {
    if (titleRef.current) {
      setUnderlineWidth(titleRef.current.offsetWidth);
    }
  }, [company.name]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="relative w-full max-w-2xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-2xl">
        {/* Botón editar */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/edit-company")}
          className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 transition"
          title="Editar compañía"
        >
          <Pencil size={18} />
        </motion.button>

        {/* Encabezado */}
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-full p-3">
            <Building2 size={24} />
          </div>
          <div>
            <h2
              ref={titleRef}
              className="text-2xl font-bold text-gray-900 break-words"
            >
              {company.name || "Sin nombre"}
            </h2>
            <motion.div
              className="h-1 bg-gradient-to-r from-blue-600 to-purple-500 mt-1 rounded"
              style={{ width: underlineWidth }}
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              initial={{ scaleX: 0 }}
              originX={0}
            />
          </div>
        </div>

        {/* Detalles */}
        <div className="space-y-4 text-sm sm:text-base text-gray-800">
          <div className="flex items-start gap-3">
            <BadgePercent className="mt-1 min-w-[18px]" size={18} />
            <p className="break-words">
              <span className="font-semibold">NIT:</span>{" "}
              {company.nit || "No disponible"}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Briefcase className="mt-1 min-w-[18px]" size={18} />
            <p className="break-words">
              <span className="font-semibold">Razón Social:</span>{" "}
              {company.legal_name || "No disponible"}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <AlignLeft className="mt-1 min-w-[18px]" size={18} />
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

          {company?.is_active !== undefined && (
            <div className="flex items-start gap-3">
              {company.is_active ? (
                <CheckCircle className="mt-1 text-green-600 min-w-[18px]" size={18} />
              ) : (
                <XCircle className="mt-1 text-red-600 min-w-[18px]" size={18} />
              )}
              <p>
                <span className="font-semibold">Estado:</span>{" "}
                {company.is_active ? "Activa" : "Inactiva"}
              </p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default CompanyCard;