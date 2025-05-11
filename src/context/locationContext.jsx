import { useEffect, useState, createContext, useContext } from "react";
import { countriesRequest, statesRequest, citiesRequest } from "../api/location"; // Asegúrate de que estas funciones están bien implementadas
import React from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) throw new Error("useLocation must be used within a LocationProvider");
  return context;
};

export const LocationProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  // Fetch countries
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await countriesRequest();
        console.log(response.data.data); // Verifica que los países estén llegando correctamente
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries", error);
        setErrors((prevErrors) => [...prevErrors, "Failed to load countries"]);
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      const loadStates = async () => {
        try {
          const response = await statesRequest(selectedCountry);
          setStates(response.data.data);
        } catch (error) {
          console.error("Error fetching states", error);
          setErrors((prevErrors) => [...prevErrors, "Failed to load states"]);
        }
      };
      loadStates();
    } else {
      setStates([]); // Reset states when no country is selected
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedState) {
      const loadCities = async () => {
        try {
          const response = await citiesRequest(selectedState);
          setCities(response.data.data);
        } catch (error) {
          console.error("Error fetching cities", error);
          setErrors((prevErrors) => [...prevErrors, "Failed to load cities"]);
        }
      };
      loadCities();
    } else {
      setCities([]); // Reset cities when no state is selected
    }
  }, [selectedState]);

  return (
    <LocationContext.Provider
      value={{
        countries,
        states,
        cities,
        selectedCountry,
        selectedState,
        setSelectedCountry,
        setSelectedState,
        setCities, // Exportando setCities para su uso
        loading,
        errors,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
