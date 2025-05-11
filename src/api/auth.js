import axios from "./axios";

// Solicitudes de registro y autenticación
export const registerRequest = async (user) => axios.post(`/auth/sign-up`, user);
export const loginRequest = async (user) => axios.post(`/auth/sign-in`, user);
export const verifyTokenRequest = async () => axios.get(`/auth/status`);
export const signOutRequest = async () => axios.post(`/auth/sign-out`);
export const confirmAccountRequest = async (data) => axios.post(`/auth/sign-up/confirm`, data);

export const forgotPasswordRequest = async (email) => axios.post(`/auth/password/forgot`, { email });
export const resetPasswordRequest = async (data) => axios.post(`/auth/password/reset`, data);
