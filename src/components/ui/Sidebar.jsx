import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import {
  Home,
  Building2,
  PlusCircle,
  LogOut,
  Clock,
  User2Icon,
  MonitorCheck,
} from "lucide-react";
import { BiMoney } from "react-icons/bi";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <aside className="w-64 h-screen bg-white shadow-md p-6 fixed left-0 top-0 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-8">TeLoCobro</h2>
        <nav className="flex flex-col space-y-4 text-gray-700 font-medium">
          <Link
            to="/my-company"
            className="flex items-center gap-2 hover:text-purple-600"
          >
            <Building2 size={18} /> Mi Compañía
          </Link>

          <Link
            to="/clients"
            className="flex items-center gap-2 hover:text-purple-600"
          >
            <User2Icon size={18} /> Clientes
          </Link>
          <Link
            to="/debts"
            className="flex items-center gap-2 hover:text-purple-600"
          >
            <MonitorCheck size={18} /> Deudas
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