/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Illustration from "../../assets/register-illustration.png";
import RegisterForm from "../../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <motion.div
        className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl flex flex-col-reverse md:flex-row overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Formulario */}
        <motion.div
          className="w-full md:w-1/2 p-6 sm:p-10 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <RegisterForm />
        </motion.div>

        {/* Ilustración */}
        <motion.div
          className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-white p-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        >
          <img
            src={Illustration}
            alt="Ilustración de registro"
            className="w-[300px] lg:w-[360px] xl:w-[400px] h-auto drop-shadow-2xl"
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}