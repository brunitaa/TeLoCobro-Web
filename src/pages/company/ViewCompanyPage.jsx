import React, { useEffect } from "react";
import { useCompany } from "../../context/companyContext";
import { Card } from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";

const ViewCompanyPage = () => {
  const { companies, loadCompanies, loading } = useCompany();
  const navigate = useNavigate();

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  if (loading) {
    return <p className="text-center">Cargando compañías...</p>;
  }

  if (!Array.isArray(companies) || companies.length === 0) {
    return <p className="text-center">No hay compañías registradas.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Compañia</h1>
      {companies.map((company) => (
        <Card key={company._id} className="p-6">
          <h2 className="text-xl font-bold">{company.name || "Sin nombre"}</h2>
          <p><strong>NIT:</strong> {company.nit || "No disponible"}</p>
          <p><strong>Razón Social:</strong> {company.legal_name || "No disponible"}</p>
          <p><strong>Descripción:</strong> {company.description || "No disponible"}</p>
          <p><strong>Ciudad:</strong> {company.location?.city || "No disponible"}</p>
          <Button
            label="Editar"
            onClick={() => navigate("/edit-company")} // Navega sin incluir un ID
            className="mt-4"
          />
        </Card>
      ))}
    </div>
  );
};

export default ViewCompanyPage;
