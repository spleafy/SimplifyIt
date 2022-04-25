import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import notificationSlice from "./notificationSlice";
import workspaceSlice from "./workspaceSlice";
import errorSlice from "./errorSlice";

/**
 * Redux Store
 * @description Creating a redux store
 */
export default configureStore({
  reducer: {
    user: userSlice,
    notifications: notificationSlice,
    workspace: workspaceSlice,
    errors: errorSlice,
  },
});
