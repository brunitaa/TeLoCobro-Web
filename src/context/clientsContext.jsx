import { createContext, useContext, useEffect, useState } from "react";
import {
  uploadCSVRequest,
  getAllClientsRequest,
  getClientRequest,
} from "../api/clients";
import { useAuth } from "./authContext";

const ClientsContext = createContext();

export const useClients = () => useContext(ClientsContext);

export const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated} = useAuth(); 

  const loadClients = async () => {
    setLoading(true);
    try {
      const res = await getAllClientsRequest();
      console.log("Clientes recibidos:", res.data.data.clients);
      setClients(res.data.data.clients);
    } catch (error) {
      console.error("Error loading clients", error);
    } finally {
      setLoading(false);
    }
};

  const uploadCSV = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      await uploadCSVRequest(formData);
      await loadClients();
    } catch (error) {
      console.error("Error uploading CSV", error);
    }
  };

  const getClientById = async (id) => {
    try {
      const res = await getClientRequest(id);
      return res.data;
    } catch (error) {
      console.error("Error fetching client by ID", error);
    }
  };

  return (
    <ClientsContext.Provider
      value={{ clients, loading, uploadCSV, getClientById, loadClients }}
    >
      {children}
    </ClientsContext.Provider>
  );
};