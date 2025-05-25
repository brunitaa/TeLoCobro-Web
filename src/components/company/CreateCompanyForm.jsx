/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CompanyForm from "./CompanyForm";
import { useCompany } from "../../context/companyContext";
import { useLocation } from "../../context/locationContext";
import { useNavigate } from "react-router-dom";

const CreateCompanyForm = () => {
  const { addCompany, companies, loading } = useCompany();
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
    if (Array.isArray(companies) && companies.length > 0) {
      navigate("/view-company");
    }
  }, [companies, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId || "");
    setSelectedState("");
    setCities([]);
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

    const { name, nit, legal_name, description, city_id } = formData;

    if (!name || !nit || !legal_name || !description || !city_id) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      await addCompany(formData);
      alert("Compañía registrada con éxito");
      navigate("/view-company");
    } catch (error) {
      console.error("Error al registrar la compañía:", error);
      alert("Hubo un error al registrar la compañía");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
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
        submitLabel="Registrar"
      />
    </motion.div>
  );
};

export default CreateCompanyForm;