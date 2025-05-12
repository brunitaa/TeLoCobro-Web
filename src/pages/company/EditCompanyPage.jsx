import React, { useEffect, useState } from "react";
import { useCompany } from "../../context/companyContext";
import { useLocation } from "../../context/locationContext";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
//proximamente ver si se puede hacer una clase que haga todo esto
const EditCompanyPage = () => {
  const { companies, updateCompany, loading } = useCompany();
  const {
    countries,
    states,
    cities,
    setSelectedCountry,
    setSelectedState,
    setCities,
    selectedCountry,
    selectedState,
    loading: locationLoading,
  } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    nit: "",
    legal_name: "",
    description: "",
    city_id: "",
  });
  useEffect(() => {
    const company = companies[0];
    if (company) {
      setFormData({
        name: company.name,
        nit: company.nit,
        legal_name: company.legal_name,
        description: company.description,
        city_id: "",
      });
      let countryId = company.location?.country;
      if (countryId && countries.length > 0 && countryId.length !== 24) {
        const found = countries.find(c => c.name === countryId);
        countryId = found ? found._id : "";
      }
      setSelectedCountry(countryId || "");
    }
  }, [companies, countries, setSelectedCountry]);
  useEffect(() => {
    const company = companies[0];
    if (company && company.location?.state && states.length > 0) {
      let stateId = company.location.state;
      if (stateId.length !== 24) {
        const found = states.find(s => s.name === stateId);
        stateId = found ? found._id : "";
      }
      setSelectedState(stateId);
    }
  }, [states, companies, setSelectedState]);
  useEffect(() => {
    const company = companies[0];
    if (company && company.location?.city && cities.length > 0) {
      let cityId = company.location.city;
      if (cityId.length !== 24) {
        const found = cities.find(c => c.name === cityId);
        cityId = found ? found._id : "";
      }
      setFormData((prev) => ({
        ...prev,
        city_id: cityId,
      }));
    }
  }, [cities, companies]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId || "");
    setSelectedState("");
    setFormData({ ...formData, city_id: "" });
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId || "");
    setFormData({ ...formData, city_id: "" });
  };

  const handleCityChange = (e) => {
    setFormData({ ...formData, city_id: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCompany(formData);
      alert("Compañía actualizada con éxito");
      navigate("/view-company");
    } catch (error) {
      console.error("Error al actualizar la compañía:", error);
      alert("Hubo un error al actualizar la compañía");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Editar Compañía</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          label="Nombre"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          name="nit"
          label="NIT"
          value={formData.nit}
          onChange={handleChange}
        />
        <Input
          name="legal_name"
          label="Razón Social"
          value={formData.legal_name}
          onChange={handleChange}
        />
        <Input
          name="description"
          label="Descripción"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="p-3 rounded-lg bg-gray-50 border border-gray-300"
            onChange={handleCountryChange}
            value={selectedCountry || ""}
          >
            <option value="">País</option>
            {countries.map((country) => (
              <option key={country._id} value={country._id}>
                {country.name}
              </option>
            ))}
          </select>
          <select
            className="p-3 rounded-lg bg-gray-50 border border-gray-300"
            onChange={handleStateChange}
            value={selectedState || ""}
            disabled={!states.length}
          >
            <option value="">Estado</option>
            {states.map((state) => (
              <option key={state._id} value={state._id}>
                {state.name}
              </option>
            ))}
          </select>
          <select
            name="city_id"
            className="p-3 rounded-lg bg-gray-50 border border-gray-300"
            onChange={handleCityChange}
            value={formData.city_id || ""}
            disabled={!cities.length}
          >
            <option value="">Ciudad</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <Button
          type="submit"
          label={loading || locationLoading ? "Actualizando..." : "Actualizar"}
          disabled={loading || locationLoading}
          className="w-full"
        />
      </form>
    </div>
  );
};

export default EditCompanyPage;
