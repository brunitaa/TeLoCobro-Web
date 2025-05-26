/* eslint-disable no-unused-vars */
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { useDebts } from "../../context/debtsContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = {
  pending: "#FACC15", 
  paid: "#34D399",     
  overdue: "#F87171",  
};

const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#111827"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={13}
      fontWeight={500}
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DebtStatusPie() {
  const { debts } = useDebts();
  const [data, setData] = useState([]);

  useEffect(() => {
    const grouped = debts.reduce(
      (acc, debt) => {
        switch (debt.status) {
          case "pending": acc.pending++; break;
          case "paid": acc.paid++; break;
          case "overdue": acc.overdue++; break;
          default: break;
        }
        return acc;
      },
      { pending: 0, paid: 0, overdue: 0 }
    );

    setData([
      { name: "Pendientes", value: grouped.pending, color: COLORS.pending },
      { name: "Pagadas", value: grouped.paid, color: COLORS.paid },
      { name: "Vencidas", value: grouped.overdue, color: COLORS.overdue },
    ]);
  }, [debts]);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 w-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Deudas por Estado
      </h3>
      <ResponsiveContainer width="100%" height={360}>
        <PieChart
          margin={{ top: 10, right: 20, bottom: 50, left: 20 }}
        >
          <Pie
            data={data}
            cx="50%"
            cy="60%"
            outerRadius={110}
            label={renderCustomLabel}
            labelLine={false}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}