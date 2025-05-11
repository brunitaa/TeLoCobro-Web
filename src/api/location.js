import axios from "./axios";

// Solicitud para obtener los países
export const countriesRequest = async () =>
  axios.get(`/location/countries`);

// Solicitud para obtener los estados de un país
export const statesRequest = async (countryId) =>
  axios.get(`/location/states/${countryId}`); // Pasamos el ID del país a la URL

// Solicitud para obtener las ciudades de un estado
export const citiesRequest = async (stateId) =>
  axios.get(`/location/cities/${stateId}`); // Pasamos el ID del estado a la URL
