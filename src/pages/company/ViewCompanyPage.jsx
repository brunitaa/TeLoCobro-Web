import React, { useEffect } from "react";
import { useCompany } from "../../context/companyContext";
import Sidebar from "../../components/ui/Sidebar";
import CompanyCard from "../../components/company/CompanyCard";

const ViewCompanyPage = () => {
  const { companies, loadCompanies, loading } = useCompany();

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
            <CompanyCard key={company._id} company={company} />
          ))
        )}
      </main>
    </div>
  );
};

export default ViewCompanyPage;