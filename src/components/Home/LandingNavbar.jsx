/* eslint-disable no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/Logo2.png";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white px-0 py-4 shadow-sm transition">
      <div className="flex items-center justify-between w-full">
        {/* Logo - alineado a la izquierda */}
        <Link to="/" className="flex items-center gap-2 ml-10">
          <img
            src={Logo}
            alt="TeLoCobro logo"
            className="h-10 w-auto object-contain"
          />
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text leading-none">
            TeLoCobro
          </span>
        </Link>

        {/* Menú escritorio alineado a la derecha */}
        <div className="hidden md:flex items-center space-x-6 mr-10 ml-auto">
          <nav className="flex space-x-6 text-gray-700 font-medium text-base">
            <a href="#inicio" className="cursor-pointer hover:text-blue-600 transition">Inicio</a>
            <a href="#about" className="cursor-pointer hover:text-blue-600 transition">Sobre nosotros</a>
            <Link to="/login" className="hover:text-blue-600 transition">Iniciar Sesión</Link>
          </nav>
          <Link
            to="/register"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 text-sm font-semibold rounded-full shadow-md hover:scale-105 transition"
          >
            Regístrate
          </Link>
        </div>

        {/* Botón menú móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 mr-4"
          aria-label="Abrir menú"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú móvil animado */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-4 pb-4 mt-4 bg-white shadow-md rounded-b-lg space-y-4 overflow-hidden"
          >
            <nav className="flex flex-col space-y-2 text-gray-700 font-medium">
              <a href="#inicio" onClick={() => setIsOpen(false)}>Inicio</a>
              <a href="#about" onClick={() => setIsOpen(false)}>Sobre nosotros</a>
              <Link to="/login" onClick={() => setIsOpen(false)}>Iniciar Sesión</Link>
            </nav>
            <Link
              to="/register"
              className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-md hover:opacity-90 transition"
              onClick={() => setIsOpen(false)}
            >
              Regístrate
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}