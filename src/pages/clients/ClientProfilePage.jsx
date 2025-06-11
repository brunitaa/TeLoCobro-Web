/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";
import ClientProfileHeader from "../../components/clients/ClientProfileHeader";
import CurrencyTabs from "../../components/analytics/CurrencyTabs";
import { useClients } from "../../context/clientsContext";
import { useCurrency } from "../../context/currencyContext";
import { getDebtsByClientRequest } from "../../api/debts";

function ClientProfilePage() {
  const { id } = useParams();
  const { getClientById } = useClients();
  const { setCurrency, currency } = useCurrency();

  const [client, setClient] = useState(null);
  const [debts, setDebts] = useState([]);
  const [sortField, setSortField] = useState("due_date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const clientRes = await getClientById(id);
        const clientData =
          clientRes?.data?.client || clientRes?.client || clientRes;
        setClient(clientData || {});

        const debtRes = await getDebtsByClientRequest(id);
        const debtData = debtRes?.data?.data?.debts || [];
        setDebts(debtData);

        // Detectar moneda predominante para inicializar el tab
        const usdCount = debtData.filter((d) => d.currency === "USD").length;
        const bsCount = debtData.filter((d) => d.currency === "BS").length;

        if (usdCount > bsCount) setCurrency("USD");
        else if (bsCount > 0) setCurrency("BS");
        else setCurrency("BS"); // fallback en caso de sin moneda
      } catch (error) {
        console.error("Error al cargar datos del cliente:", error);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debts, sortField, sortOrder]);

  const handleSort = (field) => {
    const newOrder =
      field === sortField && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
    const sorted = [...debts].sort((a, b) => {
      if (a[field] < b[field]) return newOrder === "asc" ? -1 : 1;
      if (a[field] > b[field]) return newOrder === "asc" ? 1 : -1;
      return 0;
    });
    setDebts(sorted);
  };

  if (!client) return <div className="p-6">Cargando...</div>;

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />

      <main className="md:ml-64 w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center">
          Perfil del Cliente
        </h1>

        <ClientProfileHeader client={client} />

        {/* Sección de Tabs para monedas */}
        <CurrencyTabs
          debts={debts}
          currency={currency}
          setCurrency={setCurrency}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
        />
      </main>
    </div>
  );
}

export default ClientProfilePage;