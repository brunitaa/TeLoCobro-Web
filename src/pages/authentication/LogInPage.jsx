/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Illustration from "../../assets/login-illustration.png";
import LoginForm from "../../components/auth/LoginForm";

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      {/* Card contenedora */}
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Formulario */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <LoginForm />
        </motion.div>

        {/* Imagen ilustrativa */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={Illustration}
            alt="Ilustración de inicio de sesión"
            className="w-[220px] sm:w-[280px] md:w-[320px] lg:w-[400px] animate-float"
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}