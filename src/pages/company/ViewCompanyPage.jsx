import React, { useEffect } from "react";
import { useCompany } from "../../context/companyContext";
import Sidebar from "../../components/ui/Sidebar";
import CompanyCard from "../../components/company/CompanyCard";
import { useNavigate } from "react-router-dom";

const ViewCompanyPage = () => {
  const { companies, loadCompanies, loading } = useCompany();
  const navigate = useNavigate();

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  useEffect(() => {
    if (!loading && (!Array.isArray(companies) || companies.length === 0)) {
      navigate("/register-company", { replace: true });
    }
  }, [companies, loading, navigate]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <main className="w-full lg:ml-64 px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
          Compañía Registrada
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Cargando compañías...</p>
        ) : !Array.isArray(companies) || companies.length === 0 ? (
          <p className="text-center text-gray-500">No hay compañías registradas.</p>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {companies.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewCompanyPage;