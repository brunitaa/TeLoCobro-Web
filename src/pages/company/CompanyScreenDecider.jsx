import { useEffect } from "react";
import { useCompany } from "../context/companyContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";

const CompanyScreenDecider = () => {
  const { companies, loadCompanies, loading } = useCompany();
  const navigate = useNavigate();

  useEffect(() => {
    loadCompanies(); 
  }, [loadCompanies]);

  useEffect(() => {
    if (!loading) {
      if (Array.isArray(companies) && companies.length > 0) {
        navigate("/view-company");
      } else {
        navigate("/register-company");
      }
    }
  }, [companies, loading, navigate]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <main className="w-full lg:ml-64 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <p className="text-gray-600 text-lg font-medium text-center">
          Verificando información de la compañía...
        </p>
      </main>
    </div>
  );
};

export default CompanyScreenDecider;