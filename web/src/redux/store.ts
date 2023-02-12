import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import projects from "./projects";

/**
 * Redux Store
 * @description Creating a redux store
 */
export default configureStore({
  reducer: {
    user,
    projects,
  },
});
