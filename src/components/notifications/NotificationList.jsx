/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getAllReminders } from "../../api/reminders";
import EmptyState from "../ui/EmptyState";

// Componente para mostrar cada notificación estilo bandeja
function NotificationItem({ reminder }) {
  const {
    subject,
    channel,
    createdAt,
    sent_to: { first_name, last_name, email }
  } = reminder;

  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex-1">
        <p className="font-medium text-gray-800">{subject}</p>
        <p className="text-sm text-gray-500">
          Para: <span className="text-gray-700">{first_name} {last_name}</span>
        </p>
        <p className="text-xs text-gray-400 break-words">{email}</p>
      </div>
      <div className="text-right text-sm text-gray-500">
        <p>{formattedDate}</p>
        <p>{formattedTime}</p>
      </div>
    </div>
  );
}

export default function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllReminders();
        setNotifications(res.data.data.reminders || []);
      } catch (err) {
        console.error("Error al cargar historial:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <p className="text-center py-6">Cargando historial de notificaciones...</p>;
  }

  if (!notifications.length) {
    return (
      <EmptyState
        title="Sin notificaciones enviadas"
        subtitle="Todavía no se han enviado recordatorios."
      />
    );
  }

  return (
    <div className="space-y-2 max-w-3xl mx-auto">
      {notifications.map((reminder) => (
        <NotificationItem key={reminder._id} reminder={reminder} />
      ))}
    </div>
  );
}