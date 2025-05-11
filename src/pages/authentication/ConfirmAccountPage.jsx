import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Heading } from "../../components/ui/Heading";
import { Input } from "../../components/ui/Input";
import { FiMail, FiKey } from "react-icons/fi";

export function ConfirmAccountPage() {
  const { confirmAccount } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    if (!email) newErrors.email = "Correo requerido";
    if (!otp) newErrors.otp = "Código requerido";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      await confirmAccount({ email, otp });
      setMessage("Cuenta confirmada con éxito");
      setSuccess(true);

      // Espera 2 segundos antes de redirigir al login
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Error al confirmar la cuenta");
      setSuccess(false);
    }
  };

  return (
    <Card>
      <Heading
        title="Confirma tu cuenta"
        subtitle="Revisa tu correo e ingresa el código"
        center
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: "" }));
          }}
          icon={<FiMail />}
          error={errors.email}
        />
        <Input
          name="otp"
          placeholder="Código de verificación"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
            setErrors((prev) => ({ ...prev, otp: "" }));
          }}
          icon={<FiKey />}
          error={errors.otp}
        />
        <Button type="submit" label="Confirmar Cuenta" />
      </form>

      {message && (
        <p
          className={`text-sm text-center mt-4 ${
            success ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </Card>
  );
}
