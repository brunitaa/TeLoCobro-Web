/* eslint-disable no-unused-vars */
import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Illustration from "../assets/dashboard-illustration.png";
import { motion } from "framer-motion";

function DashBoardPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center bg-gray-50"
      >
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Home
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-10">
            Bienvenido al panel de control. Usa la barra lateral para navegar por las funcionalidades disponibles.
          </p>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="w-[260px] sm:w-[340px] md:w-[440px] lg:w-[520px] xl:w-[580px] h-auto drop-shadow-2xl"
        >
          <img
            src={Illustration}
            alt="Ilustración del dashboard"
            className="w-full h-auto"
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

export default DashBoardPage;