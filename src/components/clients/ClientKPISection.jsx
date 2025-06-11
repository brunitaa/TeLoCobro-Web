import React from "react";
import {
  FaListAlt,
  FaMoneyBillAlt,
  FaExclamationCircle,
} from "react-icons/fa";
import KPICard from "/src/components/clients/KpiCard.jsx";
import { useCurrency } from "/src/context/currencyContext";

const ClientKPISection = ({ debts }) => {
  const { currency } = useCurrency();

  if (!debts || debts.length === 0) return null;

  const formatCurrency = (value) =>
    currency === "USD"
      ? `$${(value / 7).toFixed(2)}`
      : `Bs. ${value.toLocaleString("es-BO")}`;

  const totalDebts = debts.length;

  const totalOutstanding = debts.reduce(
    (acc, d) => acc + parseFloat(d.outstanding || 0),
    0
  );

  const overdueCount = debts.filter((d) => d.status === "overdue").length;
  const morosityIndex =
    totalDebts > 0 ? ((overdueCount / totalDebts) * 100).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <KPICard
        icon={<FaListAlt className="text-blue-600 text-3xl" />}
        title="Cantidad de Deudas"
        value={totalDebts}
        description="Total de deudas registradas para este cliente"
      />
      <KPICard
        icon={<FaMoneyBillAlt className="text-green-600 text-3xl" />}
        title="Monto Total Adeudado"
        value={formatCurrency(totalOutstanding)}
        description={`En ${currency}`}
      />
      <KPICard
        icon={<FaExclamationCircle className="text-red-600 text-3xl" />}
        title="Índice de Morosidad"
        value={`${morosityIndex}%`}
        description="% de deudas vencidas"
      />
    </div>
  );
};

export default ClientKPISection;