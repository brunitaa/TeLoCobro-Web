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
import { FiMail, FiLock } from "react-icons/fi";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await signin(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="p-8 shadow-lg rounded-xl bg-white w-full max-w-md">
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
          <Button
            type="submit"
            label={loginErrors ? "iniciar sesión" : "Iniciar Sesión"}
            disabled={false}
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
    </div>
  );
}