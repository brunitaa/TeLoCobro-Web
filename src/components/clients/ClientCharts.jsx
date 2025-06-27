import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { useCurrency } from "/src/context/currencyContext";

const COLORS = ["#3B82F6", "#9333EA", "#FACC15", "#EF4444", "#10B981"];
const ESTADOS_ES = {
  pending: "Pendientes",
  paid:    "Pagadas",
  overdue: "Vencidas",
};

// Label exterior (escritorio)
const renderDesktopLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
  const RAD = Math.PI / 180;
  const r = outerRadius + 15;
  const x = cx + r * Math.cos(-midAngle * RAD);
  const y = cy + r * Math.sin(-midAngle * RAD);
  return (
    <text
      x={x}
      y={y}
      fill="#111827"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={500}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Label interno (móvil)
const renderMobileLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RAD = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RAD);
  const y = cy + radius * Math.sin(-midAngle * RAD);
  return (
    <text
      x={x}
      y={y}
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

const ClientCharts = ({ debts }) => {
  const { currency } = useCurrency();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Detectar mobile/desktop
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Datos de estado
  const statusData = debts.reduce((acc, debt) => {
    const estado = debt.status;
    const found = acc.find((i) => i.name === estado);
    if (found) found.value += 1;
    else acc.push({ name: estado, value: 1 });
    return acc;
  }, []);

  // Datos mes y monto por estado siguen igual…
  const monthData = debts.reduce((acc, debt) => {
    const mes = new Date(debt.issue_date).toLocaleString("es-ES", {
      month: "short",
      year: "numeric",
    });
    const valor = parseFloat(debt.outstanding || 0);
    const found = acc.find((i) => i.name === mes);
    if (found) found.value += valor;
    else acc.push({ name: mes, value: valor });
    return acc;
  }, []);
  const amountByStatus = debts.reduce((acc, debt) => {
    const estado = debt.status;
    const valor = parseFloat(debt.outstanding || 0);
    const found = acc.find((i) => i.name === estado);
    if (found) found.value += valor;
    else acc.push({ name: estado, value: valor });
    return acc;
  }, []);

  const cardStyle =
    "snap-start w-[90%] max-w-[500px] shrink-0 bg-white rounded-2xl shadow-md p-6 sm:p-8 transition hover:shadow-lg";

  return (
    <div className="overflow-x-scroll snap-x snap-mandatory px-4">
      <div className="flex gap-6 min-w-full w-fit pl-4 pr-8">
        {/* 1. Gráfico de torta */}
        <div className={cardStyle}>
          <h3 className="text-xl font-semibold text-blue-700 mb-6 text-center">
            Cantidad por Estado
          </h3>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={isMobile ? 50 : 0}
                  outerRadius={isMobile ? 80 : "80%"}
                  paddingAngle={4}
                  label={isMobile ? renderMobileLabel : renderDesktopLabel}
                  labelLine={false}
                >
                  {statusData.map((entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} deudas`, ESTADOS_ES[name] || name]}
                />
                {!isMobile && <Legend verticalAlign="bottom" iconType="circle" />}
              </PieChart>
            </ResponsiveContainer>
          </div>
          {isMobile && (
            <div className="mt-4 flex justify-center gap-6">
              {statusData.map((entry, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-sm">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span className="text-gray-700">{ESTADOS_ES[entry.name]}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2. Monto por Mes */}
        <div className={cardStyle}>
          <h3 className="text-xl font-semibold text-blue-700 mb-6 text-center">
            Monto por Mes ({currency})
          </h3>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(v) =>
                    `${currency === "USD" ? "$" : "Bs. "} ${v.toFixed(2)}`
                  }
                />
                <Legend />
                <Bar
                  dataKey="value"
                  fill="#3B82F6"
                  name={`Monto total (${currency})`}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Monto por Estado */}
        <div className={cardStyle}>
          <h3 className="text-xl font-semibold text-blue-700 mb-6 text-center">
            Monto por Estado ({currency})
          </h3>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={amountByStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tickFormatter={(name) => ESTADOS_ES[name] || name}
                />
                <YAxis />
                <Tooltip
                  formatter={(v, name) => [
                    `${currency === "USD" ? "$" : "Bs. "} ${v.toFixed(2)}`,
                    ESTADOS_ES[name] || name,
                  ]}
                />
                <Legend />
                <Bar
                  dataKey="value"
                  fill="#10B981"
                  name={`Monto total (${currency})`}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCharts;