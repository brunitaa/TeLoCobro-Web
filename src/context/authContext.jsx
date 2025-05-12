import React, { useEffect, createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import {
  loginRequest,
  registerRequest,
  verifyTokenRequest,
  confirmAccountRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
} from "../api/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

// Función para transformar cualquier tipo de error a un array de strings
const parseErrorMessage = (msg) => {
  if (Array.isArray(msg)) return msg;
  if (typeof msg === "string") return [msg];
  if (typeof msg === "object" && msg?.message) return [msg.message];
  return ["Error desconocido."];
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resetPasswordMessage, setResetPasswordMessage] = useState("");

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (userData) => {
    try {
      const res = await registerRequest(userData);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data);
      setErrors(parseErrorMessage(error.response?.data?.message));
    }
  };

  const signin = async (userData) => {
    try {
      const res = await loginRequest(userData);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Signin error:", error.response?.data);
      setErrors(parseErrorMessage(error.response?.data?.message));
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
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al confirmar cuenta");
    }
  };

  const forgotPassword = async (email) => {
    try {
      await forgotPasswordRequest(email);
      setResetPasswordMessage("Te hemos enviado un OTP a tu correo");
    } catch (error) {
      console.error("Forgot password error:", error.response?.data);
      setErrors(parseErrorMessage(error.response?.data?.message));
    }
  };

  const resetPassword = async ({ email, otp, newPassword, confirmPassword }) => {
    try {
      await resetPasswordRequest({
        email,
        otp,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      setResetPasswordMessage("Contraseña restablecida con éxito");
    } catch (error) {
      console.error("Reset password error:", error.response?.data);
      setErrors(parseErrorMessage(error.response?.data?.message));
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(token);
        if (!res.data) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (error) {
        console.error("Token verification error:", error.response?.data);
        setIsAuthenticated(false);
      } finally {
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