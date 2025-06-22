import { createContext, useContext, useEffect, useState } from "react";
import {
  getReminders,
  getReminderConfig,
  enableReminders,
  disableReminders,
  updateReminderConfig,
} from "../api/reminders";

const ReminderContext = createContext();

export const useReminders = () => useContext(ReminderContext);

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReminders = async () => {
    setLoading(true);
    try {
      const res = await getReminders();
      setReminders(res?.data?.data || []);
    } catch (err) {
      setError("Error al cargar el historial de notificaciones");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const res = await getReminderConfig();
      setConfig(res?.data?.config || null);
    } catch (err) {
      setError("Error al cargar configuración de notificaciones");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleReminders = async (enable) => {
    setLoading(true);
    try {
      if (enable) await enableReminders();
      else await disableReminders();
      await fetchConfig();
    } catch (err) {
      setError("Error al actualizar estado de notificaciones");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = async (daysBefore) => {
    setLoading(true);
    try {
      await updateReminderConfig({ days_before_due: daysBefore });
      await fetchConfig();
    } catch (err) {
      setError("Error al actualizar configuración de notificaciones");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
    fetchConfig();
  }, []);

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        config,
        loading,
        error,
        fetchReminders,
        fetchConfig,
        toggleReminders,
        updateConfig,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
};