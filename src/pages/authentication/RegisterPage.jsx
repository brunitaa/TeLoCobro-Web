import React, { useEffect } from "react";
import { useAuth } from "../../context/authContext"; // Importar el contexto
import { useLocation } from "../../context/locationContext"; // Importar contexto para países, estados y ciudades
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../../components/ui/Card";
import { Heading } from "../../components/ui/Heading";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

function RegisterPage() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    countries,
    states,
    cities,
    setSelectedCountry,
    setSelectedState,
    setCities, // Asegurarnos de que tenemos una función para setear las ciudades
    selectedCountry,
    selectedState,
    loading,
  } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await signup(data);
      console.log("Registro exitoso:", response);
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/confirm-account");
  }, [isAuthenticated]);

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId || "");
    setSelectedState(""); // Resetear estado cuando cambie el país
    setCities([]); // Limpiar ciudades al cambiar el país
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId || "");
    // Filtrar las ciudades para el estado seleccionado
    const filteredCities = cities.filter((city) => city.state_id === stateId);
    setCities(filteredCities); // Actualizar las ciudades disponibles para el estado seleccionado
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setValue("city_id", cityId || "");
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card className="p-8 shadow-xl rounded-2xl bg-white space-y-6">
        <Heading
          title="Registro de Usuario"
          subtitle="Crea tu cuenta para comenzar"
          center
        />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("first_name")}
            placeholder="Nombre"
            error={errors.first_name}
          />
          <Input
            {...register("last_name")}
            placeholder="Apellido"
            error={errors.last_name}
          />
          <Input
            {...register("ci")}
            placeholder="Cédula de Identidad"
            error={errors.ci}
          />
          <Input
            {...register("email")}
            placeholder="Correo electrónico"
            error={errors.email}
          />
          <Input
            {...register("phone_number")}
            placeholder="Número de teléfono"
            error={errors.phone_number}
          />
          <div className="relative">
            <input
              type="date"
              {...register("date_of_birth")}
              className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300"
            />
            {errors.date_of_birth && (
              <p className="text-sm text-red-600">
                {errors.date_of_birth.message}
              </p>
            )}
          </div>

          <select
            {...register("gender")}
            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300"
          >
            <option value="">Selecciona género</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
            <option value="other">Otro</option>
          </select>
          {errors.gender && (
            <p className="text-sm text-red-600">{errors.gender.message}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* País - solo para visualización */}
            <select
              className="p-3 rounded-lg bg-gray-50 border border-gray-300"
              onChange={handleCountryChange}
              value={selectedCountry || ""}
            >
              <option value="">País</option>
              {countries.length > 0 ? (
                countries.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))
              ) : (
                <option disabled>No hay países disponibles</option>
              )}
            </select>

            {/* Estado - solo para visualización */}
            <select
              className="p-3 rounded-lg bg-gray-50 border border-gray-300"
              onChange={handleStateChange}
              value={selectedState || ""}
              disabled={!states.length}
            >
              <option value="">Departamento</option>
              {states.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>

            {/* Ciudad - esta sí se envía al backend */}
            <select
              {...register("city_id")}
              className="p-3 rounded-lg bg-gray-50 border border-gray-300"
              onChange={handleCityChange}
              defaultValue=""
              disabled={!cities.length}
            >
              <option value="">Ciudad</option>
              {cities.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {errors.city_id && (
            <p className="text-sm text-red-600">{errors.city_id.message}</p>
          )}

          <Input
            {...register("password")}
            type="password"
            placeholder="Contraseña"
            error={errors.password}
          />
          <Input
            {...register("confirm_password")}
            type="password"
            placeholder="Confirmar contraseña"
            error={errors.confirm_password}
          />

          <Button
            type="submit"
            label={loading ? "Registrando..." : "Registrarse"}
            disabled={loading}
            className="w-full"
          />
          {Array.isArray(registerErrors)
            ? registerErrors.map((err, idx) => (
                <p key={idx} className="text-sm text-center mt-2 text-red-600">
                  {err}
                </p>
              ))
            : registerErrors && (
                <p className="text-sm text-center mt-2 text-red-600">
                  {registerErrors}
                </p>
              )}
        </form>

        <p className="text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Inicia sesión
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default RegisterPage;
