import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import { ProtectedRoute } from "./routes";
import HomePage from "./pages/HomePage";
import React from 'react';
import { LoginPage } from "./pages/authentication/LogInPage.jsx";
import RegisterPage from "./pages/authentication/RegisterPage.jsx";
import { CompanyProvider } from "./context/companyContext.jsx";
import { LocationProvider } from "./context/locationContext.jsx";
import { ConfirmAccountPage } from "./pages/authentication/ConfirmAccountPage.jsx";
import { ForgotPasswordPage } from "./pages/authentication/ForgotPasswordPage.jsx";
import { ResetPasswordPage } from "./pages/authentication/ResetPasswordPage.jsx";
import DashBoardPage from "./pages/DashBoardPage.jsx";
import CompanyRegistrationPage from "./pages/company/CreateCompanyPage.jsx";
import ViewCompanyPage from "./pages/company/ViewCompanyPage.jsx";
import EditCompanyPage from "./pages/company/EditCompanyPage.jsx";
import ClientUploadPage from "./pages/clients/ClientUploadPage.jsx";
import { ClientsProvider } from "./context/clientsContext.jsx";
import CompanyScreenDecider from "./components/company/CompanyScreenDecider";
import { DebtsProvider } from "./context/debtsContext.jsx";
import DebtUploadPage from "./pages/debts/DebtUploadPage.jsx";
import DashboardAnalytics from "./pages/analytics/DashboardAnalytics.jsx";
import { CurrencyProvider } from "./context/currencyContext.jsx";
import ClientProfilePage from "./pages/clients/ClientProfilePage";
import NotificationPage from "./pages/notifications/NotificationPage";

function App() {
  return (
    <CurrencyProvider>
      <AuthProvider>
        <DebtsProvider>
          <ClientsProvider>
            <LocationProvider>
              <CompanyProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/confirm-account" element={<ConfirmAccountPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/register-company" element={<CompanyRegistrationPage />} />
                      <Route path="/view-company" element={<ViewCompanyPage />} />
                      <Route path="/edit-company" element={<EditCompanyPage />} />
                      <Route path="/clients" element={<ClientUploadPage />} />
                      <Route path="/dashboard" element={<DashBoardPage />} />
                      <Route path="/my-company" element={<CompanyScreenDecider />} />
                      <Route path="/debts" element={<DebtUploadPage />} />
                      <Route path="/analytics" element={<DashboardAnalytics />} />
                      <Route path="/clients/:id" element={<ClientProfilePage />} />
                      <Route path="/notifications" element={<NotificationPage />} />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </CompanyProvider>
            </LocationProvider>
          </ClientsProvider>
        </DebtsProvider>
      </AuthProvider>
    </CurrencyProvider>
  );
}

export default App;
