import React, { useEffect, useState } from "react";
import CompanyForm from "./CompanyForm";
import { useCompany } from "../../context/companyContext";
import { useLocation } from "../../context/locationContext";
import { useNavigate } from "react-router-dom";

const EditCompanyForm = () => {
  const { companies, updateCompany, loading } = useCompany();
  const {
    countries,
    states,
    cities,
    selectedCountry,
    selectedState,
    setSelectedCountry,
    setSelectedState,
    setCities,
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

  // Precargar datos
  useEffect(() => {
    const company = companies[0];
    if (!company) return;

    setFormData({
      name: company.name || "",
      nit: company.nit || "",
      legal_name: company.legal_name || "",
      description: company.description || "",
      city_id: "", // se actualiza luego
    });

    let countryId = company.location?.country;
    if (countryId && countryId.length !== 24) {
      const found = countries.find((c) => c.name === countryId);
      countryId = found ? found._id : "";
    }
    setSelectedCountry(countryId || "");
  }, [companies, countries, setSelectedCountry]);

  useEffect(() => {
    const company = companies[0];
    if (company && company.location?.state && states.length > 0) {
      let stateId = company.location.state;
      if (stateId.length !== 24) {
        const found = states.find((s) => s.name === stateId);
        stateId = found ? found._id : "";
      }
      setSelectedState(stateId);
    }
  }, [companies, states, setSelectedState]);

  useEffect(() => {
    const company = companies[0];
    if (company && company.location?.city && cities.length > 0) {
      let cityId = company.location.city;
      if (cityId.length !== 24) {
        const found = cities.find((c) => c.name === cityId);
        cityId = found ? found._id : "";
      }
      setFormData((prev) => ({ ...prev, city_id: cityId }));
    }
  }, [companies, cities]);

  // Handlers
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCountryChange = (e) => {
    const id = e.target.value;
    setSelectedCountry(id || "");
    setSelectedState("");
    setCities([]);
    setFormData({ ...formData, city_id: "" });
  };

  const handleStateChange = (e) => {
    const id = e.target.value;
    setSelectedState(id || "");
    setFormData({ ...formData, city_id: "" });
  };

  const handleCityChange = (e) =>
    setFormData({ ...formData, city_id: e.target.value });

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
    <CompanyForm
      formData={formData}
      setFormData={setFormData}
      onChange={handleChange}
      onCountryChange={handleCountryChange}
      onStateChange={handleStateChange}
      onCityChange={handleCityChange}
      selectedCountry={selectedCountry}
      selectedState={selectedState}
      countries={countries}
      states={states}
      cities={cities}
      onSubmit={handleSubmit}
      loading={loading}
      locationLoading={locationLoading}
      submitLabel="Actualizar"
    />
  );
};

export default EditCompanyForm;