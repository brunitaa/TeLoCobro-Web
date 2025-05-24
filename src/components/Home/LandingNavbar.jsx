"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/Logo2.png";

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white px-4 sm:px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + texto */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="TeLoCobro logo"
            className="h-10 w-auto object-contain"
          />
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text leading-none">
            TeLoCobro
          </span>
        </Link>

        {/* Botón menú móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Abrir menú"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menú principal (pantallas medianas o mayores) */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6 text-gray-700 font-medium text-base">
            <Link to="/">Inicio</Link>
            <a href="#about" className="cursor-pointer">
              Sobre nosotros
            </a>
            <Link to="/login">Iniciar Sesión</Link>
          </nav>
          <Link
            to="/register"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 text-sm font-semibold rounded-full shadow-md hover:opacity-90 transition"
          >
            Regístrate
          </Link>
        </div>
      </div>

      {/* Menú móvil (pantallas pequeñas) */}
      {isOpen && (
        <div className="md:hidden mt-4 px-4 pb-4 space-y-4 bg-white shadow-md rounded-b-lg">
          <nav className="flex flex-col space-y-2 text-gray-700 font-medium">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Inicio
            </Link>
            <a href="#about" onClick={() => setIsOpen(false)}>
              Sobre nosotros
            </a>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              Iniciar Sesión
            </Link>
          </nav>
          <Link
            to="/register"
            className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-md hover:opacity-90 transition"
            onClick={() => setIsOpen(false)}
          >
            Regístrate
          </Link>
        </div>
      )}
    </header>
  );
}