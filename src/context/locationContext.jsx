import { useEffect, useState, createContext, useContext } from "react";
import { countriesRequest, statesRequest, citiesRequest } from "../api/location"; 
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

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await countriesRequest();
        console.log(response.data.data);
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
      setStates([]);
    }
  }, [selectedCountry]);

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
      setCities([]);
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
        setCities,
        loading,
        errors,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
