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
      <div className="flex">
        <Sidebar />
        <main className="ml-64 w-full min-h-screen bg-gray-50 p-8 flex items-center justify-center">
          <span className="text-gray-500">Cargando...</span>
        </main>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen bg-gray-50 p-8">
        <CreateCompanyForm />
      </main>
    </div>
  );
};

export default CreateCompanyPage;
