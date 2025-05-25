/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../schemas/auth";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signInSchema) });

  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => await signin(data);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated]);

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Heading
          title="Iniciar Sesión"
          subtitle="Ingresa tus credenciales para acceder"
          center
        />
      </motion.div>

      <Input
        name="email"
        placeholder="Correo electrónico"
        type="email"
        {...register("email")}
        icon={<FiMail />}
        error={errors.email}
      />

      <Input
        name="password"
        placeholder="Contraseña"
        type="password"
        {...register("password")}
        icon={<FiLock />}
        error={errors.password}
      />

      <div className="text-sm text-right">
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button type="submit" label="Iniciar Sesión" className="w-full" />
      </motion.div>

      {loginErrors && (
        <p className="text-sm text-center mt-2 text-red-600">{loginErrors}</p>
      )}

      <motion.p
        className="text-sm text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Regístrate
        </Link>
      </motion.p>
    </motion.form>
  );
}