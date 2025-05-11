import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Heading } from "../../components/ui/Heading";

export function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { resetPassword, errors } = useAuth(); // Usar el contexto

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mostrar los datos antes de enviarlos
    console.log("Datos enviados:", { 
      email, 
      otp, 
      new_password: newPassword, 
      confirm_password: confirmPassword 
    });

    await resetPassword({ 
      email, 
      otp, 
      newPassword, 
      confirmPassword 
    });

    setMessage("Contraseña restablecida con éxito");
  };

  return (
    <div className="space-y-6">
      <Heading title="Restablecer Contraseña" subtitle="Ingresa el OTP y la nueva contraseña" />
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <Button type="submit" label="Restablecer Contraseña" />
      </form>
      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
}
