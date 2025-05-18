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
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg font-medium">Verificando información de la compañía...</p>
      </main>
    </div>
  );
};

export default CompanyScreenDecider;