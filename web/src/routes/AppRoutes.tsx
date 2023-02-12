import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Components
import SitNav from "../layouts/navigation/SitNav";
import SitNavTop from "../layouts/navigation/SitNavTop";
// Layout
import SitLayout from "../layouts/SitLayout";
// Pages
import HomePage from "../pages/app/HomePage";
import ProjectsPage from "../pages/app/ProjectsPage";
import NotFoundPage from "../pages/NotFoundPage";
// Services
import api from "../api";
// Redux
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
    <SitLayout aside={<SitNav />} header={<SitNavTop />}>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/projects/*" element={<ProjectsPage />} />
        <Route
          path="*"
          element={<NotFoundPage to="/app/home" name="Home Page" />}
        />
      </Routes>
    </SitLayout>
  );
};

export default AppRoutes;
