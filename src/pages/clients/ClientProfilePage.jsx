/* src/pages/clients/ClientProfilePage.jsx */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/ui/Sidebar";
import ClientProfileHeader from "../../components/clients/ClientProfileHeader";
import CurrencyTabs from "../../components/analytics/CurrencyTabs";
import { useClients } from "../../context/clientsContext";
import { useCurrency } from "../../context/currencyContext";
import { getDebtsByClientRequest } from "../../api/debts";
import { predictRisk } from "../../api/risk";

export default function ClientProfilePage() {
  const { id } = useParams();
  const { getClientById } = useClients();
  const { setCurrency, currency } = useCurrency();

  const [client, setClient] = useState(null);
  const [debts, setDebts] = useState([]);
  const [sortField, setSortField] = useState("due_date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Estados para riesgo
  const [riskPrediction, setRiskPrediction] = useState(null);   // 0=Bajo,2=Medio,1=Alto
  const [riskProbability, setRiskProbability] = useState(0);    // 0..1

  useEffect(() => {
    async function fetchData() {
      try {
        // 1) Traer cliente
        const clientRes = await getClientById(id);
        const clientData = clientRes?.data?.client || clientRes;
        setClient(clientData || {});

        // 2) Traer deudas
        const debtRes = await getDebtsByClientRequest(id);
        const debtData = debtRes?.data?.data?.debts || [];
        setDebts(debtData);

        // 3) Inicializar moneda
        const usdCount = debtData.filter((d) => d.currency === "USD").length;
        const bsCount = debtData.filter((d) => d.currency === "BS").length;
        setCurrency(usdCount > bsCount ? "USD" : "BS");

        // 4) Calcular métricas para IA
        const debtCount = debtData.length;
        const totalDebtBOB = debtData.reduce((sum, d) => sum + (d.outstanding || 0), 0);

        const overdueDebts = debtData.filter((d) => d.status === "overdue");
        const totalPendingDebtBOB = overdueDebts.reduce((sum, d) => sum + (d.outstanding || 0), 0);
        const paymentDelayRate = debtCount ? overdueDebts.length / debtCount : 0;

        const paidDebts = debtData.filter((d) => d.status === "paid" && d.paid_at);
        const averagePaymentTime = paidDebts.length
          ? paidDebts
              .map((d) => (new Date(d.paid_at) - new Date(d.issue_date)) / 86400000)
              .reduce((a, b) => a + b, 0) / paidDebts.length
          : 0;

        // 5) Llamada a la API de riesgo
        const { data } = await predictRisk({
          totalDebtBOB,
          totalPendingDebtBOB,
          averagePaymentTime,
          paymentDelayRate,
          debtCount,
        });

        // ——————————————————————————————
        // 6) Clasificación “pura” de la IA
        const prob100 = data.probability * 100;
        let pred;
        if (prob100 <= 40) pred = 0;      // Bajo
        else if (prob100 <= 70) pred = 2; // Medio
        else pred = 1;                    // Alto

        // 7) Regla de negocio adicional sobre % de morosidad
        if (paymentDelayRate >= 1) {
          // 100% deudas vencidas → Alto riesgo
          pred = 1;
        } else if (paymentDelayRate >= 0.5) {
          // ≥50% vencidas → al menos Medio riesgo
          pred = Math.max(pred, 2);
        }

        setRiskProbability(data.probability);
        setRiskPrediction(pred);
      } catch (error) {
        console.error("Error al cargar perfil o riesgo:", error);
      }
    }

    fetchData();
  }, [id, getClientById, setCurrency]);

  // Reset de paginación al cambiar orden o datos
  useEffect(() => {
    setCurrentPage(1);
  }, [debts, sortField, sortOrder]);

  const handleSort = (field) => {
    const newOrder = field === sortField && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
    setDebts((prev) =>
      [...prev].sort((a, b) => {
        if (a[field] < b[field]) return newOrder === "asc" ? -1 : 1;
        if (a[field] > b[field]) return newOrder === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  if (!client) {
    return <div className="p-6">Cargando perfil del cliente…</div>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />

      <main className="md:ml-64 w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center">
          Perfil del Cliente
        </h1>

        <ClientProfileHeader
          client={client}
          riskPrediction={riskPrediction}
          riskProbability={riskProbability}
        />

        {/* Tabs de deudas */}
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