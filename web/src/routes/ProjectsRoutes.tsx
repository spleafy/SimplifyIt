import { Routes, Route } from "react-router-dom";
// Pages
import ProjectsPage from "../pages/app/projects/ProjectsPage";
import ProjectPage from "../pages/app/projects/ProjectPage";
import NotFoundPage from "../pages/NotFoundPage";

const ProjectsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectsPage />} />
      <Route path="/:id" element={<ProjectPage />} />
      <Route
        path="*"
        element={<NotFoundPage to="/app/projects" name="Projects Page" />}
      />
    </Routes>
  );
};

export default ProjectsRoutes;
