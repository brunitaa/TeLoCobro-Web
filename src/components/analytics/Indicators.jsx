/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useClients } from "../../context/clientsContext";
import { useDebts } from "../../context/debtsContext";
import { motion } from "framer-motion";

export default function Indicators() {
  const { clients, loadClients } = useClients();
  const { debts, loadDebts } = useDebts();

  useEffect(() => {
    loadClients();
    loadDebts();
  }, []);

  const totalClients = clients.length;

  const debtsWithOutstanding = debts.filter((debt) => {
    const amount = parseFloat(debt.outstanding);
    return !isNaN(amount) && amount > 0;
  });

  const clientsWithDebt = new Set(
    debtsWithOutstanding.map((debt) => debt.client_id?._id)
  );
  const totalClientsWithDebt = clientsWithDebt.size;

  const totalBs = debts.reduce((sum, debt) => {
    const amount = parseFloat(debt.outstanding);
    return debt.currency?.toUpperCase() === "BS" && !isNaN(amount)
      ? sum + amount
      : sum;
  }, 0);

  const totalUsd = debts.reduce((sum, debt) => {
    const amount = parseFloat(debt.outstanding);
    return debt.currency?.toUpperCase() === "USD" && !isNaN(amount)
      ? sum + amount
      : sum;
  }, 0);

  const cards = [
    {
      title: "Clientes Registrados",
      value: totalClients,
      bg: "bg-blue-100",
      text: "text-blue-700",
    },
    {
      title: "Clientes con Deuda",
      value: totalClientsWithDebt,
      bg: "bg-orange-100",
      text: "text-orange-700",
    },
    {
      title: "Monto Total en Bs",
      value: totalBs.toLocaleString("es-BO", {
        style: "currency",
        currency: "BOB",
        minimumFractionDigits: 2,
      }),
      bg: "bg-green-100",
      text: "text-green-700",
    },
    {
      title: "Monto Total en USD",
      value: totalUsd.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }),
      bg: "bg-yellow-100",
      text: "text-yellow-700",
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className={`rounded-xl p-6 shadow-md ${card.bg} ${card.text} min-w-0`}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-lg font-semibold mb-2 truncate">{card.title}</h3>
          <p className="text-2xl font-bold truncate max-w-full break-words">
            {card.value}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}