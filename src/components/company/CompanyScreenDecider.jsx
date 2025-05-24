import { useEffect } from "react";
import { useCompany } from "../../context/companyContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";

export default function CompanyScreenDecider() {
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
  }, [loading, companies, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 bg-gray-50">
      <Spinner />
      <p className="mt-4 text-sm text-gray-600 text-center">
        Verificando información de la compañía...
      </p>
    </div>
  );
}