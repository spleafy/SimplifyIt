import { Routes, Route } from "react-router-dom";
// Pages
import MainPage from "../pages/app/projects/MainPage";
import ProjectPage from "../pages/app/projects/ProjectPage";
import NotFoundPage from "../pages/NotFoundPage";

const ProjectsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/:id/*" element={<ProjectPage />} />
      <Route
        path="*"
        element={<NotFoundPage to="/app/projects" name="Projects Page" />}
      />
    </Routes>
  );
};

export default ProjectsRoutes;
