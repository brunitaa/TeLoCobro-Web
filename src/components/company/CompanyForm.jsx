import React from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import LocationSelects from "./LocationSelects";

function CompanyForm({
  formData,
  setFormData,
  onChange,
  onCountryChange,
  onStateChange,
  onCityChange,
  selectedCountry,
  selectedState,
  countries,
  states,
  cities,
  onSubmit,
  loading,
  locationLoading,
  submitLabel = "Registrar",
}) {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">
        Registra tu compañía
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <Input
            name="name"
            label="Nombre"
            value={formData.name}
            onChange={onChange}
            className="w-full"
          />
          <Input
            name="nit"
            label="NIT"
            value={formData.nit}
            onChange={onChange}
            className="w-full"
          />
        </div>

        <Input
          name="legal_name"
          label="Razón Social"
          value={formData.legal_name}
          onChange={onChange}
        />

        <Input
          name="description"
          label="Descripción"
          value={formData.description}
          onChange={onChange}
        />

        <LocationSelects
          formData={formData}
          setFormData={setFormData}
          selectedCountry={selectedCountry}
          selectedState={selectedState}
          onCountryChange={onCountryChange}
          onStateChange={onStateChange}
          onCityChange={onCityChange}
          countries={countries}
          states={states}
          cities={cities}
        />

        <Button
          type="submit"
          label={loading || locationLoading ? "Procesando..." : submitLabel}
          disabled={loading || locationLoading}
          className="w-full"
        />
      </form>
    </div>
  );
}

export default CompanyForm;