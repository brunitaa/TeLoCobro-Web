/* eslint-disable no-unused-vars */
/* src/components/analytics/DebtStatusPie.jsx */
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { useDebts } from "../../context/debtsContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = {
  pending: "#FACC15",
  paid: "#34D399",
  overdue: "#F87171",
};

// label externo (escritorio)
const renderDesktopLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
  const RAD = Math.PI / 180;
  const r = outerRadius + 20;
  const x = cx + r * Math.cos(-midAngle * RAD);
  const y = cy + r * Math.sin(-midAngle * RAD);
  return (
    <text
      x={x} y={y}
      fill="#111827"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={500}
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

// label interno (móvil)
const renderMobileLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RAD = Math.PI / 180;
  // punto medio entre inner y outer
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RAD);
  const y = cy + radius * Math.sin(-midAngle * RAD);
  return (
    <text
      x={x} y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={500}
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

export default function DebtStatusPie() {
  const { debts } = useDebts();
  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const counts = debts.reduce(
      (acc, d) => {
        if (d.status === "pending") acc.pending++;
        if (d.status === "paid")    acc.paid++;
        if (d.status === "overdue") acc.overdue++;
        return acc;
      },
      { pending: 0, paid: 0, overdue: 0 }
    );
    setData([
      { name: "Pendientes", value: counts.pending, fill: COLORS.pending },
      { name: "Pagadas",    value: counts.paid,    fill: COLORS.paid    },
      { name: "Vencidas",   value: counts.overdue, fill: COLORS.overdue },
    ]);
  }, [debts]);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 w-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Deudas por Estado</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart margin={{ top: 10, right: 20, bottom: isMobile ? 0 : 40, left: 20 }}>
          <Pie
            data={data}
            cx="50%" cy="50%"
            innerRadius={isMobile ? 50 : 0}
            outerRadius={isMobile ? 80 : 100}
            dataKey="value"
            label={isMobile ? renderMobileLabel : renderDesktopLabel}
            labelLine={false}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          {!isMobile && <Legend verticalAlign="bottom" iconType="circle" />}
        </PieChart>
      </ResponsiveContainer>

      {isMobile && (
        <div className="mt-4 flex justify-center gap-6">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center space-x-2 text-sm">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.fill }} />
              <span className="text-gray-700">{entry.name}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}