import React, { useEffect, useState, useCallback } from "react";
import {
  getNotificationConfig,
  enableNotifications,
  disableNotifications,
  setNotificationFrequency,
} from "../../api/reminders";
import { toast } from "react-hot-toast";

export default function NotificationConfig({ isActive }) {
  const [days, setDays] = useState("3");
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadConfig = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getNotificationConfig();
      const cfg = res.data?.data?.config;
      if (cfg) {
        setDays(String(cfg.days_before_due));
        setEnabled(cfg.status === "enabled");
      }
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error("Error al cargar configuración:", err);
        toast.error("No se pudo cargar la configuración");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isActive) loadConfig();
  }, [isActive, loadConfig]);

  const handleToggle = async () => {
    try {
      if (enabled) {
        await disableNotifications();
        toast.success("Notificaciones deshabilitadas");
      } else {
        await enableNotifications();
        toast.success("Notificaciones habilitadas");
      }
      await loadConfig();
    } catch (err) {
      console.error("Error al cambiar estado:", err);
      toast.error("Error al cambiar estado de notificaciones");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setNotificationFrequency({ days_before_due: Number(days) });
      toast.success("Frecuencia actualizada");
      await loadConfig();
    } catch (err) {
      console.error("Error al actualizar frecuencia:", err);
      toast.error("Error al actualizar la frecuencia");
    }
  };

  if (!isActive) return null;

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-10 text-center text-gray-600">
        Cargando configuración…
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">
        Configuración de notificaciones
      </h2>

      <div className="flex items-center justify-between">
        <span className="text-gray-700 font-medium">
          Notificaciones automáticas
        </span>
        <button
          onClick={handleToggle}
          className={`px-5 py-2 rounded-lg text-white font-medium transition ${
            enabled
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {enabled ? "Deshabilitar" : "Habilitar"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Días antes del vencimiento
          </label>
          <input
            type="number"
            value={days}
            min="1"
            onChange={(e) => setDays(e.target.value)}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full inline-flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-3 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Guardar configuración
        </button>
      </form>
    </div>
  );
}