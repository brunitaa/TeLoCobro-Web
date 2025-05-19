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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Spinner />
    </div>
  );
}