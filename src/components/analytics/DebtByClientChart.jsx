/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDebts } from "../../context/debtsContext";
import { useCurrency } from "../../context/currencyContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

export default function DebtByClientChart() {
  const { debts } = useDebts();
  const { currency } = useCurrency();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!debts.length) return;

    const filteredDebts = debts.filter((debt) => {
      if (currency === "BS") return debt.currency === "BS";
      if (currency === "USD") return debt.currency === "USD";
      return false;
    });

    const grouped = filteredDebts.reduce((acc, debt) => {
      const name = debt.client_id?.name || "Sin Nombre";
      const amount = Number(debt.outstanding) || 0;

      acc[name] = acc[name] ? acc[name] + amount : amount;
      return acc;
    }, {});

    const transformed = Object.entries(grouped)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10);

    setChartData(transformed);
  }, [debts, currency]);

  const getSymbol = () => (currency === "USD" ? "$" : "Bs.");

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Deuda por Cliente - {getSymbol()}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={{ fontSize: 12 }} />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fontSize: 12 }}
            width={100}
          />
          <Tooltip
            formatter={(value) =>
              `${getSymbol()} ${Number(value).toFixed(2)}`
            }
          />
          <Bar dataKey="amount" fill="#9333EA" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}