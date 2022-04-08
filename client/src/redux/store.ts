import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import notificationSlice from "./notificationSlice";
import workspaceSlice from "./workspaceSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    notifications: notificationSlice,
    workspace: workspaceSlice,
  },
});
