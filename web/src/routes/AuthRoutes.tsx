import { Routes, Route, Navigate } from "react-router-dom";
// Layout
import SitLayout from "../layouts/SitLayout";
// Pages
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import NotFoundPage from "../pages/NotFoundPage";

const AuthRoutes = () => {
  return (
    <SitLayout>
      <Routes>
        <Route path="/" element={<Navigate to={"login"} />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route
          path="*"
          element={<NotFoundPage to="login" name="Login Page" />}
        />
      </Routes>
    </SitLayout>
  );
};

export default AuthRoutes;
