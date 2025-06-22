// src/components/notifications/NotificationForm.jsx
import React, { useState } from "react";
import { sendNotification } from "../../api/reminders";
import { toast } from "react-hot-toast";
import ClientAutocomplete from "../clients/ClientAutocomplete";
import SendSuccessOverlay from "./SendSuccessOverlay";

export default function NotificationForm() {
  const [form, setForm] = useState({ sent_to: "", subject: "", content: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendNotification({ ...form, channel: "email" });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      setForm({ sent_to: "", subject: "", content: "" });
    } catch (err) {
      console.error("Error al enviar notificación:", err);
      toast.error("Error al enviar la notificación");
    }
  };

  return (
    <div className="max-w-3xl mx-auto relative">
      {/* Overlay + check */}
      <SendSuccessOverlay isVisible={showSuccess} />

      {/* Form container (blur when showSuccess) */}
      <div
        className={`bg-white rounded-2xl shadow-md p-8 space-y-6 transition-filter duration-300 ${
          showSuccess ? "filter blur-sm" : ""
        }`}
      >
        <h2 className="text-xl font-semibold text-gray-800">Enviar recordatorio</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cliente destinatario
            </label>
            <ClientAutocomplete
              value={form.sent_to}
              onChange={(val) => setForm((f) => ({ ...f, sent_to: val }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Asunto
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
              placeholder="Título del recordatorio"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2 h-32 resize-none"
              placeholder="Escribe aquí el contenido del recordatorio..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-3 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Enviar notificación
          </button>
        </form>
      </div>
    </div>
  );
}