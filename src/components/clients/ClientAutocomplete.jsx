/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { useClients } from "../../context/clientsContext";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function ClientAutocomplete({ value, onChange }) {
  const { clients, loadClients } = useClients();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!Array.isArray(clients) || clients.length === 0) {
      loadClients();
    }
  }, [clients, loadClients]);

  const filtered =
    query === ""
      ? clients
      : clients.filter((client) =>
          client.name.toLowerCase().includes(query.toLowerCase())
        );

  const selectedClient = clients.find((c) => c._id === value);

  return (
    <Combobox value={value} onChange={onChange}>
      <div className="relative">
        <Combobox.Input
          className="w-full border rounded-lg px-4 py-2"
          displayValue={(id) =>
            clients.find((c) => c._id === id)?.name || ""
          }
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar cliente por nombre..."
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon className="w-5 h-5 text-gray-500" />
        </Combobox.Button>

        {filtered && filtered.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md overflow-auto border border-gray-200">
            {filtered.map((client) => (
              <Combobox.Option
                key={client._id}
                value={client._id}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 ${
                    active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                  }`
                }
              >
                {({ selected, active }) => (
                  <div className="flex justify-between items-center">
                    <span className={`${selected ? "font-medium" : "font-normal"}`}>
                      {client.name}
                    </span>
                    {selected && (
                      <CheckIcon className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}

export default ClientAutocomplete;