import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Layout
import SitLayout from "../layouts/SitLayout";
// Pages
import HomePage from "../pages/app/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
// // Services
import api from "../api";
// // Redux
import store from "../redux/store";
import { slice as user } from "../redux/user";

const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const effect = async () => {
      const response = await api.v1.user.controller.fetch();

      if (response.status === "SUCCESS" && response.data.user) {
        store.dispatch(user.actions.update(response.data.user));
      } else {
        navigate("/auth");
      }
    };

    effect();
  }, []);

  return (
    <SitLayout header>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route
          path="*"
          element={<NotFoundPage to="/auth" name="Login Page" />}
        />
      </Routes>
    </SitLayout>
  );
};

export default AppRoutes;
