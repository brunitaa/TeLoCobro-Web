/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [localError, setLocalError] = useState("");

  const { resetPassword, errors } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setLocalError("Las contraseñas no coinciden.");
      return;
    }

    setLocalError("");

    await resetPassword({
      email,
      otp,
      newPassword,
      confirmPassword,
    });

    setMessage("Contraseña restablecida con éxito");

    setTimeout(() => {
      navigate("/login");
    }, 2500);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Heading
          title="Restablecer Contraseña"
          subtitle="Ingresa el OTP y la nueva contraseña"
          center
        />
      </motion.div>

      <Input
        name="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <Input
        name="otp"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        error={errors.otp}
      />
      <Input
        name="newPassword"
        placeholder="Nueva Contraseña"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        error={errors.newPassword}
      />
      <Input
        name="confirmPassword"
        placeholder="Confirmar Contraseña"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
      />

      {localError && (
        <p className="text-red-500 text-sm text-center">{localError}</p>
      )}

      <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
        <Button type="submit" label="Restablecer Contraseña" className="w-full" />
      </motion.div>

      {message && (
        <p className="text-center mt-4 text-green-600 text-sm">{message}</p>
      )}
    </motion.form>
  );
}