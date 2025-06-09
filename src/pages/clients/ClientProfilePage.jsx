/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";
import ClientProfileHeader from "../../components/clients/ClientProfileHeader";
import ClientCharts from "../../components/clients/ClientCharts";
import DebtTable from "../../components/debts/DebtTable";
import Pagination from "../../components/clients/Pagination";
import { useClients } from "../../context/clientsContext";
import { getDebtsByClientRequest } from "../../api/debts";

function ClientProfilePage() {
  const { id } = useParams();
  const { getClientById } = useClients();

  const [client, setClient] = useState(null);
  const [debts, setDebts] = useState([]);
  const [sortField, setSortField] = useState("due_date");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function fetchData() {
      const clientRes = await getClientById(id);
      console.log("Respuesta getClientById:", clientRes);

      const clientData =
        clientRes?.data?.client || clientRes?.client || clientRes;

      setClient(clientData || {});

      const debtRes = await getDebtsByClientRequest(id);
      setDebts(debtRes?.data?.data?.debts || []);
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

  const totalPages = Math.ceil(debts.length / pageSize);
  const paginatedDebts = debts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (!client) return <div className="p-6">Cargando...</div>;

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />

      <main className="md:ml-64 w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center">
          Perfil del Cliente
        </h1>

        <ClientProfileHeader client={client} />

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Gráficas de Deudas
          </h2>
          <ClientCharts debts={debts} />
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Deudas Asociadas
          </h2>

          <DebtTable
            debts={paginatedDebts}
            onSelectDebt={() => {}}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default ClientProfilePage;