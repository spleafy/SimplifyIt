import { configureStore } from "@reduxjs/toolkit";
import user from "./user";

/**
 * Redux Store
 * @description Creating a redux store
 */
export default configureStore({
  reducer: {
    user,
  },
});
