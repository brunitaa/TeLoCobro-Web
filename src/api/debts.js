// src/api/clients.js
import axios from "./axios";

export const uploadDebtsCSVRequest = async (formData) =>
  axios.post(`/debts/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getAllDebtsRequest = async () => axios.get(`/debts`);

