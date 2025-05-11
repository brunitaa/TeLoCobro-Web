import { useEffect, createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest, confirmAccountRequest, forgotPasswordRequest, resetPasswordRequest } from "../api/auth";
import Cookies from "js-cookie";
import React from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resetPasswordMessage, setResetPasswordMessage] = useState("");

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const confirmAccount = async ({ email, otp }) => {
    try {
      const res = await confirmAccountRequest({ email, otp });
      console.log(res.data);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al confirmar cuenta");
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await forgotPasswordRequest(email);
      console.log(res.data);
      setResetPasswordMessage("Te hemos enviado un OTP a tu correo");
    } catch (error) {
      console.log(error);
      setErrors(error.response?.data?.message || "Error al enviar el OTP");
    }
  };

  const resetPassword = async ({ email, otp, newPassword, confirmPassword }) => {
    try {
      console.log("Datos enviados:", { 
        email, 
        otp, 
        new_password: newPassword,  
        confirm_password: confirmPassword  
      });

      const res = await resetPasswordRequest({ 
        email, 
        otp, 
        new_password: newPassword,  
        confirm_password: confirmPassword 
      });

      console.log(res.data);
      setResetPasswordMessage("Contraseña restablecida con éxito");
    } catch (error) {
      console.log(error.response);  
      setErrors(error.response?.data?.message || "Error al restablecer la contraseña");
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        confirmAccount,
        isAuthenticated,
        errors,
        loading,
        forgotPassword,
        resetPassword,
        resetPasswordMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
