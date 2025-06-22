import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import NotificationForm from "../../components/notifications/NotificationForm";
import NotificationConfig from "../../components/notifications/NotificationConfig";
import NotificationList from "../../components/notifications/NotificationList";
import Sidebar from "../../components/ui/Sidebar";

export default function NotificationPage() {
  const tabs = ["Historial", "Configuración", "Enviar Notificación"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <main className="w-full md:ml-64 px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center">
          Gestión de Notificaciones
        </h1>

        <div className="w-full max-w-5xl mx-auto">
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="flex space-x-2 sm:space-x-4 bg-white p-2 rounded-xl shadow w-full mx-auto justify-center">
              {tabs.map((tab, idx) => (
                <Tab
                  key={idx}
                  className={({ selected }) =>
                    `w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg focus:outline-none transition-all ${
                      selected
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels className="mt-6 space-y-10">
              <Tab.Panel>
                <NotificationList />
              </Tab.Panel>
              <Tab.Panel>
                {/* recarga al mostrarse */}
                <NotificationConfig isActive={selectedIndex === 1} />
              </Tab.Panel>
              <Tab.Panel>
                <NotificationForm />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
    </div>
  );
}