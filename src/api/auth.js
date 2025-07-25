import axios from "./axios";

export const registerRequest = async (user) => axios.post(`/auth/users/sign-up`, user);
export const loginRequest = async (user) => axios.post(`/auth/users/sign-in`, user);
export const verifyTokenRequest = async () => axios.get(`/auth/users/status`);
export const signOutRequest = async () => axios.post(`/auth/users/sign-out`);
export const confirmAccountRequest = async (data) => axios.post(`/auth/users/sign-up/confirm`, data);

export const forgotPasswordRequest = async (email) => axios.post(`/auth/users/password/forgot`, { email });
export const resetPasswordRequest = async (data) => axios.post(`/auth/users/password/reset`, data);
