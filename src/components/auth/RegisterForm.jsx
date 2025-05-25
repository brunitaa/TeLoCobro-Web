/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../schemas/auth";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { useAuth } from "../../context/authContext";
import { useLocation } from "../../context/locationContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function RegisterForm() {
  const {
    countries,
    states,
    cities,
    setSelectedCountry,
    setSelectedState,
    setCities,
    selectedCountry,
    selectedState,
    loading,
  } = useLocation();

  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(signUpSchema) });

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated]);

  const onSubmit = async (data) => {
    try {
      const response = await signup(data);
      if (response) navigate("/confirm-account");
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId || "");
    setSelectedState("");
    setCities([]);
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId || "");
    const filteredCities = cities.filter((city) => city.state_id === stateId);
    setCities(filteredCities);
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setValue("city_id", cityId || "");
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4 w-full max-w-xl"
    >
      <Heading
        title="Registro de Usuario"
        subtitle="Crea tu cuenta para comenzar"
        center
      />

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
      <Input {...register("ci")} placeholder="C.I." error={errors.ci} />
      <Input
        {...register("email")}
        placeholder="Correo Electrónico"
        error={errors.email}
      />
      <Input
        {...register("phone_number")}
        placeholder="Teléfono"
        error={errors.phone_number}
      />

      <input
        type="date"
        {...register("date_of_birth")}
        className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300"
      />
      {errors.date_of_birth && (
        <p className="text-sm text-red-600">{errors.date_of_birth.message}</p>
      )}

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
            <option disabled>No hay países</option>
          )}
        </select>

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

        <select
          {...register("city_id")}
          onChange={handleCityChange}
          disabled={!cities.length}
          className="p-3 rounded-lg bg-gray-50 border border-gray-300"
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

      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button
          type="submit"
          label={loading ? "Registrando..." : "Registrarse"}
          disabled={loading}
          className="w-full"
        />
      </motion.div>

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

      <p className="text-center text-sm text-gray-600">
        ¿Ya tienes una cuenta?{" "}
        <Link
          to="/login"
          className="text-blue-600 hover:underline font-semibold"
        >
          Inicia sesión
        </Link>
      </p>
    </motion.form>
  );
}
