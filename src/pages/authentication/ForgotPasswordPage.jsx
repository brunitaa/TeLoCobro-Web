import React, { useState } from "react";
import { useAuth } from "../../context/authContext"; // Importar el contexto
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Heading } from "../../components/ui/Heading";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { forgotPassword, resetPasswordMessage, errors } = useAuth(); // Usar el contexto
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);  // Llamar al contexto para enviar el OTP
    setMessage(resetPasswordMessage);
    
      navigate("/reset-password");
    
  };

  return (
    <div className="space-y-6">
      <Heading title="Olvidé mi Contraseña" subtitle="Ingresa tu correo para recibir un OTP" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Button type="submit" label="Enviar OTP" />
      </form>
      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
}
