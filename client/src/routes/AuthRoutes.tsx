import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Pages
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPage from "../pages/auth/ForgotPage";
import ResetPage from "../pages/auth/ResetPage";
import TwoFactorPage from "../pages/auth/TwoFactorPage";
// Components

const AuthRoutes: FC = () => {
  /**
   * Document title
   * @description Updating the document title
   */
  document.title = `Auth / ${process.env.REACT_APP_TITLE}`;

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
