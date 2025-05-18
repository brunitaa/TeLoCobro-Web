import React, { createContext, useContext, useState, useCallback } from "react";
import { createCompany, getCompanies, updateCompanyRequest } from "../api/company";

const CompanyContext = createContext();

export const useCompany = () => {
  return useContext(CompanyContext);
};

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const addCompany = async (companyData) => {
    setLoading(true);
    try {
      const newCompany = await createCompany(companyData);
      setCompanies((prev) => [...prev, newCompany]);
    } catch (error) {
      console.error("Error adding company:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getCompanies();
      console.log("Respuesta del backend:", response);
      const company = response.data.company;
      setCompanies(company ? [company] : []);
    } catch (error) {
      console.error("Error loading companies:", error);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCompany = async (companyData) => {
    setLoading(true);
    try {
      const updatedCompany = await updateCompanyRequest(companyData);
      setCompanies((prev) =>
        prev.map((company) =>
          company._id === updatedCompany._id ? updatedCompany : company
        )
      );
    } catch (error) {
      console.error("Error updating company:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CompanyContext.Provider value={{ companies, addCompany, loadCompanies, updateCompany, loading }}>
      {children}
    </CompanyContext.Provider>
  );
};
