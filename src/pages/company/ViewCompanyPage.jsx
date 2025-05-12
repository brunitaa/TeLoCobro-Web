import React, { useEffect } from "react";
import { useCompany } from "../../context/companyContext";
import { Card } from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import Sidebar from "../../components/ui/Sidebar";

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
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Compañía Registrada
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Cargando compañías...</p>
        ) : !Array.isArray(companies) || companies.length === 0 ? (
          <p className="text-center text-gray-500">No hay compañías registradas.</p>
        ) : (
          companies.map((company) => (
            <Card key={company._id} className="p-6 space-y-2">
              <h2 className="text-xl font-bold text-gray-800">{company.name || "Sin nombre"}</h2>
              <p><strong>NIT:</strong> {company.nit || "No disponible"}</p>
              <p><strong>Razón Social:</strong> {company.legal_name || "No disponible"}</p>
              <p><strong>Descripción:</strong> {company.description || "No disponible"}</p>
              <p><strong>Ciudad:</strong> {company.location?.city || "No disponible"}</p>
              <Button
                label="Editar"
                onClick={() => navigate("/edit-company")}
                className="mt-4"
              />
            </Card>
          ))
        )}
      </main>
    </div>
  );
};

export default ViewCompanyPage;