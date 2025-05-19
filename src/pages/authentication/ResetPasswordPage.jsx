import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Heading } from "../../components/ui/Heading";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";

export function ResetPasswordPage() {
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

    // Validar contraseñas antes de enviar
    if (newPassword !== confirmPassword) {
      setLocalError("Las contraseñas no coinciden.");
      return;
    }

    setLocalError("");

    console.log("Datos enviados:", {
      email,
      otp,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });

    await resetPassword({
      email,
      otp,
      newPassword,
      confirmPassword,
    });

    setMessage("Contraseña restablecida con éxito");

    // Esperar 3 segundos antes de redirigir
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 shadow-lg rounded-xl bg-white w-full max-w-md">
        <Heading
          title="Restablecer Contraseña"
          subtitle="Ingresa el OTP y la nueva contraseña"
        />
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
          {localError && (
            <p className="text-red-500 text-sm text-center">{localError}</p>
          )}
          <Button type="submit" label="Restablecer Contraseña" />
        </form>
        {message && (
          <p className="text-center mt-4 text-green-600">{message}</p>
        )}
      </Card>
    </div>
  );
}
