import React from "react";
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

const COLORS = ["#3B82F6", "#9333EA", "#FACC15", "#EF4444", "#10B981"];

const ESTADOS_ES = {
  pending: "Pendiente",
  paid: "Pagado",
  overdue: "Vencido",
  id: "Desconocido",
};

const ClientCharts = ({ debts }) => {
  if (!debts || debts.length === 0) return null;

  const statusData = debts.reduce((acc, debt) => {
    const estado = debt.status;
    const found = acc.find((item) => item.name === estado);
    if (found) {
      found.value += 1;
    } else {
      acc.push({ name: estado, value: 1 });
    }
    return acc;
  }, []);

  const monthData = debts.reduce((acc, debt) => {
    const mes = new Date(debt.issue_date).toLocaleString("es-ES", {
      month: "short",
      year: "numeric",
    });
    const valor = parseFloat(debt.outstanding || 0);
    const found = acc.find((item) => item.name === mes);
    if (found) {
      found.value += valor;
    } else {
      acc.push({ name: mes, value: valor });
    }
    return acc;
  }, []);

  const amountByStatus = debts.reduce((acc, debt) => {
    const estado = debt.status;
    const valor = parseFloat(debt.outstanding || 0);
    const found = acc.find((item) => item.name === estado);
    if (found) {
      found.value += valor;
    } else {
      acc.push({ name: estado, value: valor });
    }
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
                  outerRadius="80%"
                  innerRadius="50%"
                  label={({ name }) => ESTADOS_ES[name] || name}
                  paddingAngle={5}
                >
                  {statusData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [
                    `${value} deudas`,
                    ESTADOS_ES[name] || name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Monto por Mes */}
        <div className={cardStyle}>
          <h3 className="text-xl font-semibold text-blue-700 mb-6 text-center">
            Monto por Mes (Bs)
          </h3>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(v) => `Bs. ${v}`} />
                <Legend />
                <Bar dataKey="value" fill="#3B82F6" name="Monto total" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Monto por Estado */}
        <div className={cardStyle}>
          <h3 className="text-xl font-semibold text-blue-700 mb-6 text-center">
            Monto por Estado (Bs)
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
                  formatter={(v, name) => [`Bs. ${v}`, ESTADOS_ES[name] || name]}
                />
                <Legend />
                <Bar dataKey="value" fill="#10B981" name="Monto total" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCharts;