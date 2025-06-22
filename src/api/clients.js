import axios from "./axios";

export const uploadCSVRequest = async (formData) =>
  axios.post(`/clients/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getAllClientsRequest = async () => axios.get(`/clients`);

export const getClientRequest = async (id) =>
  axios.get(`/clients/${id}`);
