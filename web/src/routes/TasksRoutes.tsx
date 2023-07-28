import { Routes, Route } from "react-router-dom";
// Pages
import MainPage from "../pages/app/tasks/MainPage";
import TaskPage from "../pages/app/tasks/TaskPage";
import NotFoundPage from "../pages/NotFoundPage";

const TasksRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/:id/*" element={<TaskPage />} />
      <Route
        path="*"
        element={<NotFoundPage to="/app/tasks" name="Tasks Page" />}
      />
    </Routes>
  );
};

export default TasksRoutes;
