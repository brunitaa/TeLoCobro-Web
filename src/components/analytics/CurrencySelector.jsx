/* eslint-disable no-unused-vars */
import React from "react";
import { useCurrency } from "../../context/currencyContext";

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  const options = [
    { value: "BS", label: "Bolivianos (Bs)" },
    { value: "USD", label: "Dólares (USD)" },
  ];

  if (!currency) return null;

  return (
    <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <label htmlFor="currency" className="text-sm font-medium text-gray-700">
        Moneda:
      </label>
      <select
        id="currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}