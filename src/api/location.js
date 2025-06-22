import axios from "./axios";

export const countriesRequest = async () =>
  axios.get(`/location/countries`);

export const statesRequest = async (countryId) =>
  axios.get(`/location/states/${countryId}`); 

export const citiesRequest = async (stateId) =>
  axios.get(`/location/cities/${stateId}`); 
