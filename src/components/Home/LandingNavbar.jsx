'use client';

import { Link } from "react-router-dom";

export default function LandingNavbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white px-8 py-6 flex items-center justify-between shadow-none">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">TeLoCobro</div>

      {/* Navegación + Botón */}
      <div className="hidden md:flex items-center space-x-6">
        <nav className="flex space-x-6 text-gray-700 font-medium text-base">
          <Link to="/">Inicio</Link>
          <a href="#about" className="cursor-pointer">Sobre nosotros</a>
          <Link to="/login">Iniciar Sesión</Link>
        </nav>

        <Link
          to="/register"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 text-sm font-semibold rounded-full shadow-md hover:opacity-90 transition"
        >
          Regístrate
        </Link>
      </div>
    </header>
  );
}