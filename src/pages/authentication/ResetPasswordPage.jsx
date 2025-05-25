/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
import Illustration from "../../assets/reset-illustration.png";

export function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <motion.div
        className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Formulario */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex items-center justify-center">
          <ResetPasswordForm />
        </div>

        {/* Ilustración */}
        <motion.div
          className="w-full md:w-1/2 flex items-center justify-center bg-white p-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        >
          <img
            src={Illustration}
            alt="Ilustración reset"
            className="w-[220px] sm:w-[280px] md:w-[320px] lg:w-[380px] xl:w-[420px] h-auto drop-shadow-2xl"
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}