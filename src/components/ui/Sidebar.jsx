import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import {
  Building2,
  LogOut,
  Clock,
  User2Icon,
  MonitorCheck,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  // Escuchar cambios de tamaño
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleResize = (e) => {
      setIsMobile(e.matches);
      setIsOpen(!e.matches); // cerrado si es móvil
    };

    mediaQuery.addEventListener("change", handleResize);
    handleResize(mediaQuery); // inicializa correctamente

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-screen bg-white shadow-md p-6 z-40 transform transition-transform duration-300 ease-in-out
        ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}`}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-8">TeLoCobro</h2>
            <nav className="flex flex-col space-y-4 text-gray-700 font-medium">
              <Link to="/my-company" className="flex items-center gap-2 hover:text-purple-600">
                <Building2 size={18} /> Mi Compañía
              </Link>
              <Link to="/clients" className="flex items-center gap-2 hover:text-purple-600">
                <User2Icon size={18} /> Clientes
              </Link>
              <Link to="/debts" className="flex items-center gap-2 hover:text-purple-600">
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
        </div>
      </aside>

      {/* Overlay oscuro en móvil */}
      {isMobile && isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
        />
      )}
    </>
  );
}