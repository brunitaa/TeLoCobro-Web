/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import Indicators from "../../components/analytics/Indicators";
import DebtByClientChart from "../../components/analytics/DebtByClientChart";
import DebtStatusPie from "../../components/analytics/DebtStatusPie";
import TopDebtors from "../../components/analytics/TopDebtors";
import DashboardLayout from "../../layouts/DashboardLayout";
import CurrencySelector from "../../components/analytics/CurrencySelector";

export default function DashboardAnalytics() {
  return (
    <DashboardLayout>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Panel Analítico de Clientes y Deudas
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Visualiza indicadores clave para la toma de decisiones estratégicas, tácticas y operativas.
          </p>
        </div>

        {/* Selector de moneda */}
        <div className="mb-6">
          <CurrencySelector />
        </div>

        <Indicators />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <DebtByClientChart />
          <DebtStatusPie />
        </div>
        
      </motion.div>
    </DashboardLayout>
  );
}