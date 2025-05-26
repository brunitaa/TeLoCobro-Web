/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import {
  Building2,
  LogOut,
  Clock,
  User2Icon,
  MonitorCheck,
  Menu,
  X,
  BarChart3,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const buttonRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleResize = (e) => {
      setIsMobile(e.matches);
      setIsOpen(!e.matches);
    };
    mediaQuery.addEventListener("change", handleResize);
    handleResize(mediaQuery);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <>
      {isMobile && (
        <button
          aria-label="Abrir o cerrar menú lateral"
          ref={buttonRef}
          className="fixed top-4 left-4 z-50 bg-white border border-gray-200 p-2 rounded-full shadow"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 z-40 shadow-sm px-6 py-4"
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <motion.h2
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-8 ${
                    isMobile ? "pl-8" : ""
                  }`}
                >
                  TeLoCobro
                </motion.h2>

                <nav className="flex flex-col space-y-4 text-gray-700 font-medium">
                  <SidebarLink
                    to="/my-company"
                    icon={<Building2 size={18} />}
                    text="Mi Compañía"
                    active={pathname === "/my-company"}
                  />
                  <SidebarLink
                    to="/clients"
                    icon={<User2Icon size={18} />}
                    text="Clientes"
                    active={pathname === "/clients"}
                  />
                  <SidebarLink
                    to="/debts"
                    icon={<MonitorCheck size={18} />}
                    text="Deudas"
                    active={pathname === "/debts"}
                  />
                  <SidebarLink
                    to="/analytics"
                    icon={<BarChart3 size={18} />}
                    text="Análisis"
                    active={pathname === "/analytics"}
                  />

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
          </motion.aside>
        )}
      </AnimatePresence>

      {isMobile && isOpen && (
        <motion.div
          onClick={() => {
            toggleSidebar();
            buttonRef.current?.focus();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 backdrop-blur-sm bg-black/20 transition duration-300"
        />
      )}
    </>
  );
}

function SidebarLink({ to, icon, text, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 relative transition group ${
        active ? "text-blue-600 font-semibold" : "hover:text-blue-600"
      }`}
    >
      {icon} {text}
      <span
        className={`absolute left-0 -bottom-1 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}
