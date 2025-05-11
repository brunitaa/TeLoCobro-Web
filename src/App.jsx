import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { ProtectedRoute } from "./routes";
import HomePage from "./pages/HomePage";
import React from 'react';
import { LoginPage } from "./pages/authentication/LogInPage.jsx";
import RegisterPage from "./pages/authentication/RegisterPage.jsx";
import { LocationProvider } from "./context/locationContext.jsx";
import { ConfirmAccountPage } from "./pages/authentication/ConfirmAccountPage.jsx";
import { ForgotPasswordPage } from "./pages/authentication/ForgotPasswordPage.jsx";
import { ResetPasswordPage } from "./pages/authentication/ResetPasswordPage.jsx";
import DashBoardPage from "./pages/DashBoardPage.jsx";



function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
         
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/confirm-account" element={<ConfirmAccountPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />

              <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashBoardPage />} />

                          
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
        </LocationProvider>
    </AuthProvider>
  );
}

export default App;