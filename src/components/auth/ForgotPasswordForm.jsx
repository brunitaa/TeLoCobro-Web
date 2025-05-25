/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { forgotPassword, resetPasswordMessage, errors } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setMessage(resetPasswordMessage);
    navigate("/reset-password");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Heading
        title="Olvidé mi Contraseña"
        subtitle="Ingresa tu correo para recibir un OTP"
        center
      />
      <Input
        name="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button type="submit" label="Enviar OTP" className="w-full" />
      </motion.div>

      {message && (
        <p className="text-sm text-center mt-2 text-green-600">{message}</p>
      )}
    </motion.form>
  );
}