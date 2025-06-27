/* eslint-disable no-unused-vars */
import React, { Fragment, useMemo } from "react";
import { Tab } from "@headlessui/react";
import { useCurrency } from "../../context/currencyContext";
import ClientKPISection from "../clients/ClientKPISection";
import ClientCharts from "../clients/ClientCharts";
import DebtTable from "../debts/DebtTable";
import Pagination from "../clients/Pagination";
import EmptyState from "../ui/EmptyState";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CurrencyTabs({
  debts,
  currency,
  setCurrency,
  sortField,
  sortOrder,
  onSort,
  currentPage,
  setCurrentPage,
  pageSize,
}) {
  const groupedDebts = useMemo(() => {
    return {
      BS: debts.filter((d) => d.currency !== "USD"),
      USD: debts.filter((d) => d.currency === "USD"),
    };
  }, [debts]);

  const totalPages = {
    BS: Math.ceil(groupedDebts.BS.length / pageSize),
    USD: Math.ceil(groupedDebts.USD.length / pageSize),
  };

  const paginatedDebts = {
    BS: groupedDebts.BS.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    USD: groupedDebts.USD.slice((currentPage - 1) * pageSize, currentPage * pageSize),
  };

  const tabs = [
    { id: "BS", label: "Bolivianos (Bs)" },
    { id: "USD", label: "Dólares (USD)" },
  ];

  return (
    <Tab.Group
      defaultIndex={currency === "USD" ? 1 : 0}
      onChange={(index) => setCurrency(tabs[index].id)}
    >
      <Tab.List className="flex space-x-2 sm:space-x-4 bg-white rounded-xl p-2 shadow-md w-full max-w-md mx-auto mb-6">
        {tabs.map((tab) => (
          <Tab as={Fragment} key={tab.id}>
            {({ selected }) => (
              <button
                className={classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "focus:outline-none transition-all duration-200",
                  selected
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {tab.label}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels className="mt-2 space-y-12">
        {tabs.map((tab) => (
          <Tab.Panel key={tab.id}>
            {groupedDebts[tab.id].length === 0 ? (
              <EmptyState
                title="Sin deudas registradas"
                subtitle={`No se encontraron deudas en ${
                  tab.id === "USD" ? "dólares" : "bolivianos"
                }.`}
              />
            ) : (
              <>
                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                    Indicadores Clave
                  </h2>
                  <ClientKPISection debts={groupedDebts[tab.id]} currency={tab.id} />
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 mb-4">
                    Gráficas de Deudas
                  </h2>
                  <ClientCharts debts={groupedDebts[tab.id]} currency={tab.id} />
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 mb-4">
                    Deudas Asociadas
                  </h2>
                  <DebtTable
                    debts={paginatedDebts[tab.id]}
                    onSelectDebt={() => {}}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={onSort}
                  />
                  {totalPages[tab.id] > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages[tab.id]}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </section>
              </>
            )}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}