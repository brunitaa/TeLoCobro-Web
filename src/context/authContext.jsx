import React, { useEffect, createContext, useContext, useState } from "react";
import {
  loginRequest,
  registerRequest,
  verifyTokenRequest,
  confirmAccountRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  signOutRequest,
} from "../api/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

const parseErrorMessage = (data) => {
  if (!data) return ["Error desconocido."];

  if (Array.isArray(data)) {
    return data.map((err) => err.message || "Error");
  }

  if (typeof data === "object") {
    if (Array.isArray(data.error)) {
      return data.error.map((err) => err.message || "Error");
    }

    if (data.error?.message) {
      return [data.error.message];
    }

    if (data.message) {
      return [data.message];
    }
  }

  if (typeof data === "string") return [data];

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
        return res.data;
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data);
      setErrors(
        parseErrorMessage(error.response?.data?.data || error.response?.data)
      );
    }
  };

  const signin = async (userData) => {
    try {
      const res = await loginRequest(userData);
      setIsAuthenticated(true);
      setUser(res.data?.user || null);
    } catch (error) {
      console.error("Signin error:", error.response?.data);
      setErrors(
        parseErrorMessage(error.response?.data?.data || error.response?.data)
      );
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await signOutRequest();
    } catch (error) {
      console.error("Logout error:", error.response?.data);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const confirmAccount = async ({ email, otp }) => {
    try {
      const res = await confirmAccountRequest({ email, otp });
      return res.data;
    } catch (error) {
      setErrors(
        parseErrorMessage(error.response?.data?.data || error.response?.data)
      );
      throw new Error("Error al confirmar cuenta");
    }
  };

  const forgotPassword = async (email) => {
    try {
      await forgotPasswordRequest(email);
      setResetPasswordMessage("Te hemos enviado un OTP a tu correo");
    } catch (error) {
      console.error("Forgot password error:", error.response?.data);
      setErrors(
        parseErrorMessage(error.response?.data?.data || error.response?.data)
      );
    }
  };

  const resetPassword = async ({
    email,
    otp,
    newPassword,
    confirmPassword,
  }) => {
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
      setErrors(
        parseErrorMessage(error.response?.data?.data || error.response?.data)
      );
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await verifyTokenRequest();
        setIsAuthenticated(true);
        setUser(res.data?.user);
      } catch (error) {
        console.error("Token verification error:", error.response?.data);
        setIsAuthenticated(false);
        setUser(null);
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
