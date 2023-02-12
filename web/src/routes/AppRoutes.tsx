import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Components
import SitNav from "../containers/SitNav";
import SitNavTop from "../containers/SitHeader";
// Containers
import SitAppActions from "../containers/SitAppActions";
// Layout
import SitLayout from "../layouts/SitLayout";
// Pages
import HomePage from "../pages/app/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
// Routes
import ProjectsRoutes from "./ProjectsRoutes";
// Utils
import setup from "../utils/setup";

const AppRoutes = () => {
  useEffect(() => {
    setup();
  }, []);

  return (
    <SitLayout aside={<SitNav />} header={<SitNavTop />}>
      <SitAppActions />
      <Routes>
        <Route path="/" element={<Navigate to={"home"} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/projects/*" element={<ProjectsRoutes />} />
        <Route
          path="*"
          element={<NotFoundPage to="/app/home" name="Home Page" />}
        />
      </Routes>
    </SitLayout>
  );
};

export default AppRoutes;
