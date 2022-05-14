import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Pages
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPage from "../pages/ForgotPage";
import ResetPage from "../pages/ResetPage";
import TwoFactorPage from "../pages/auth/TwoFactorPage";
// Components

const AuthRoutes: FC = () => {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to={"login"} />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot" element={<ForgotPage />} />
          <Route path="reset" element={<ResetPage />} />
          <Route path="twofactor" element={<TwoFactorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
};

export default AuthRoutes;
