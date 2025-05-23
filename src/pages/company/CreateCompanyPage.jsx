import React, { useEffect } from "react";
import Sidebar from "../../components/ui/Sidebar";
import CreateCompanyForm from "../../components/company/CreateCompanyForm";
import { useCompany } from "../../context/companyContext";
import { useNavigate } from "react-router-dom";

const CreateCompanyPage = () => {
  const { companies, loading, loadCompanies } = useCompany();
  const navigate = useNavigate();

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  useEffect(() => {
    if (!loading && Array.isArray(companies) && companies.length > 0) {
      navigate("/view-company", { replace: true });
    }
  }, [companies, loading, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        <Sidebar />
        <main className="w-full lg:ml-64 flex items-center justify-center p-8">
          <span className="text-gray-500">Cargando...</span>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <main className="w-full lg:ml-64 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto">
          <CreateCompanyForm />
        </div>
      </main>
    </div>
  );
};

export default CreateCompanyPage;