import { createContext, useContext, useEffect, useState } from "react";
import {
  uploadDebtsCSVRequest,
  getAllDebtsRequest,
  getDebtsByClientRequest,
  searchDebtsByStatusRequest,
} from "../api/debts";
import { useAuth } from "./authContext";

const DebtsContext = createContext();

export const useDebts = () => useContext(DebtsContext);

export const DebtsProvider = ({ children }) => {
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const loadDebts = async () => {
    setLoading(true);
    try {
      const res = await getAllDebtsRequest();
      console.log("Deudas recibidos:", res.data.data.debts);
      setDebts(res.data.data.debts);
    } catch (error) {
      console.error("Error loading clients", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadDebtsCSV = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      await uploadDebtsCSVRequest(formData);
      await loadDebts();
    } catch (error) {
      console.error("Error uploading CSV", error);
    }
  };

  const getDebtsByClient = async (clientId) => {
    try {
      const res = await getDebtsByClientRequest(clientId);
      return res.data.data.debts;
    } catch (error) {
      console.error("Error fetching debts by client", error);
    }
  };

  const searchDebtsByStatus = async (clientId, status) => {
    try {
      const res = await searchDebtsByStatusRequest(clientId, status);
      return res.data.data.debts;
    } catch (error) {
      console.error("Error searching debts by status", error);
    }
  };

  return (
    <DebtsContext.Provider
      value={{
        debts,
        loading,
        uploadDebtsCSV,
        loadDebts,
        getDebtsByClient,
        searchDebtsByStatus,
      }}
    >
      {children}
    </DebtsContext.Provider>
  );
};
