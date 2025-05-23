import { createContext, useContext, useEffect, useState } from "react";
import {
  uploadDebtsCSVRequest,
  getAllDebtsRequest,
} from "../api/debts";
import { useAuth } from "./authContext";

const DebtsContext = createContext();

export const useDebts = () => useContext(DebtsContext);

export const DebtsProvider = ({ children }) => {
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated} = useAuth(); 

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

  return (
    <DebtsContext.Provider
      value={{ debts, loading, uploadDebtsCSV, loadDebts }}
    >
      {children}
    </DebtsContext.Provider>
  );
};