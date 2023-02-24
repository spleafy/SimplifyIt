import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import projects from "./projects";
import tasks from "./tasks";

/**
 * Redux Store
 * @description Creating a redux store
 */
export default configureStore({
  reducer: {
    user,
    projects,
    tasks,
  },
});
