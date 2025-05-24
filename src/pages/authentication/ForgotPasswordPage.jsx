import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Heading } from "../../components/ui/Heading";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";

export function ForgotPasswordPage() {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-6 sm:p-8 shadow-lg rounded-xl bg-white">
        <Heading
          title="Olvidé mi Contraseña"
          subtitle="Ingresa tu correo para recibir un OTP"
        />
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            name="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Button type="submit" label="Enviar OTP" />
        </form>
        {message && (
          <p className="text-center mt-4 text-sm text-green-600">{message}</p>
        )}
      </Card>
    </div>
  );
}