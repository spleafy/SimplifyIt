import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import TasksRoutes from "./TasksRoutes";
// Services
import api from "../api";
// Redux
import store from "../redux/store";
import { slice as userSlice } from "../redux/user";
import { slice as projectsSlice } from "../redux/projects";
import { slice as tasksSlice } from "../redux/tasks";

const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = async () => {
      const response = await api.user.fetch();

      if (response.status === "SUCCESS" && response.data.user) {
        store.dispatch(userSlice.actions.update(response.data.user));
      } else {
        navigate("/auth");
      }
    };

    const projects = async () => {
      const response = await api.projects.fetch();

      if (response.status === "SUCCESS" && response.data.projects) {
        store.dispatch(projectsSlice.actions.init(response.data.projects));
      } else {
        console.error("ERROR! --project-setup--");
      }
    };

    const tasks = async () => {
      const response = await api.tasks.fetchAll();

      if (response.status === "SUCCESS" && response.data.tasks) {
        store.dispatch(tasksSlice.actions.init(response.data.tasks));
      } else {
        console.error("ERROR! --tasks-setup--");
      }
    };

    const setup = async () => {
      await user();
      await projects();
      await tasks();
    };

    setup();
  }, []);

  return (
    <SitLayout aside={<SitNav />} header={<SitNavTop />}>
      <SitAppActions />
      <Routes>
        <Route path="/" element={<Navigate to={"home"} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/projects/*" element={<ProjectsRoutes />} />
        <Route path="/tasks/*" element={<TasksRoutes />} />
        <Route
          path="*"
          element={<NotFoundPage to="/app/home" name="Home Page" />}
        />
      </Routes>
    </SitLayout>
  );
};

export default AppRoutes;
