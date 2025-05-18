import React from "react";
import { useLocation } from "../../context/locationContext";

function LocationSelects({ formData, setFormData }) {
  const {
    countries,
    states,
    cities,
    selectedCountry,
    selectedState,
    setSelectedCountry,
    setSelectedState,
    setCities,
  } = useLocation();

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

  return (
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
  );
}

export default LocationSelects;
