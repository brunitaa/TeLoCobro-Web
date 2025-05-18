import React, { useEffect } from "react";
import { useCompany } from "../../context/companyContext";
import { Card } from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";
import {
  Building2,
  BadgePercent,
  FileText,
  MapPin,
  Pencil,
} from "lucide-react";

const ViewCompanyPage = () => {
  const { companies, loadCompanies, loading } = useCompany();
  const navigate = useNavigate();

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full p-10 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Compañía Registrada
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Cargando compañías...</p>
        ) : !Array.isArray(companies) || companies.length === 0 ? (
          <p className="text-center text-gray-500">No hay compañías registradas.</p>
        ) : (
          companies.map((company) => (
            <Card
              key={company._id}
              className="relative p-6 bg-white shadow-lg rounded-2xl space-y-6 max-w-2xl mx-auto"
            >
              {/* Botón editar */}
              <button
                onClick={() => navigate("/edit-company")}
                className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 transition"
                title="Editar compañía"
              >
                <Pencil size={18} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-600 rounded-full p-3">
                  <Building2 size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {company.name || "Sin nombre"}
                </h2>
              </div>

              {/* Información */}
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <BadgePercent className="mt-1" size={18} />
                  <p>
                    <span className="font-semibold">NIT:</span>{" "}
                    {company.nit || "No disponible"}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <FileText className="mt-1" size={18} />
                  <p>
                    <span className="font-semibold">Razón Social:</span>{" "}
                    {company.legal_name || "No disponible"}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <FileText className="mt-1" size={18} />
                  <p>
                    <span className="font-semibold">Descripción:</span>{" "}
                    {company.description || "No disponible"}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="mt-1" size={18} />
                  <p>
                    <span className="font-semibold">Ciudad:</span>{" "}
                    {company.location?.city || "No disponible"}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </main>
    </div>
  );
};

export default ViewCompanyPage;