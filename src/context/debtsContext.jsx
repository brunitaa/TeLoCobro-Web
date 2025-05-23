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
      console.log("Deudas recibidas:", res.data.data.debts);
      setDebts(res.data.data.debts);
    } catch (error) {
      console.error("Error cargando deudas:", error);
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
      console.error("Error subiendo archivo CSV de deudas:", error);
    }
  };

  const getDebtsByClient = async (clientId) => {
    try {
      const res = await getDebtsByClientRequest(clientId);
      return res.data.data.debts;
    } catch (error) {
      console.error("Error obteniendo deudas del cliente:", error);
    }
  };

  const searchDebtsByStatus = async (clientId, status) => {
    try {
      const res = await searchDebtsByStatusRequest(clientId, status);
      return res.data.data.debts;
    } catch (error) {
      console.error("Error filtrando deudas por estado:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDebts();
    }
  }, [isAuthenticated]);

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