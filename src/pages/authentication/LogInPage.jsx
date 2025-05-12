import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from 'react';
import { signInSchema } from "../../schemas/auth";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Heading } from "../../components/ui/Heading";
import { Input } from "../../components/ui/Input";
import { FiMail, FiLock } from "react-icons/fi";  // Asegúrate de importar los íconos que usas

export function LoginPage() {
  const {
    register, // Utilizar register de react-hook-form
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Card className="p-8 shadow-lg rounded-xl bg-white w-full max-w-md mx-auto">
      <Heading
        title="Iniciar Sesión"
        subtitle="Ingresa tus credenciales para acceder"
        center
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <Input
          name="email"
          placeholder="Correo electrónico"
          type="email"
          {...register("email")}  // Usar el register para vincular el input con el form
          icon={<FiMail />}
          error={errors.email}
        />
        <Input
          name="password"
          placeholder="Contraseña"
          type="password"
          {...register("password")}  // Usar el register para vincular el input con el form
          icon={<FiLock />}
          error={errors.password}
        />
        <div className="text-sm text-right">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <Button
          type="submit"
          label={loginErrors ? "iniciar sesión" : "Iniciar Sesión"}
          disabled={false}  // Añade el control del estado de "loading" si es necesario
          className="w-full"
        />
        {loginErrors && (
          <p className="text-sm text-center mt-2 text-red-600">{loginErrors}</p>
        )}
      </form>

      <div className="text-center mt-6 text-sm">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Regístrate
        </Link>
      </div>
    </Card>
  );
}
