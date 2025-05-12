import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOutRequest } from "../../api/auth";
import {
  Home,
  Building2,
  PlusCircle,
  LogOut,
  Clock,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOutRequest();
      navigate("/"); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <aside className="w-64 h-screen bg-white shadow-md p-6 fixed left-0 top-0 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-8">TeLoCobro</h2>
        <nav className="flex flex-col space-y-4 text-gray-700 font-medium">
          <Link to="/dashboard" className="flex items-center gap-2 hover:text-purple-600">
            <Home size={18} /> Inicio
          </Link>
          <Link to="/view-company" className="flex items-center gap-2 hover:text-purple-600">
            <Building2 size={18} /> Ver Compañía
          </Link>
          <Link to="/register-company" className="flex items-center gap-2 hover:text-purple-600">
            <PlusCircle size={18} /> Crear Compañía
          </Link>
          <span className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
            <Clock size={18} /> Próximamente
          </span>
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition"
      >
        <LogOut size={16} /> Cerrar sesión
      </button>
    </aside>
  );
}