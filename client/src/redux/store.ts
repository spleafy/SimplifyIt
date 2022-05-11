import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import notificationSlice from "./notificationSlice";
import workspaceSlice from "./workspaceSlice";
import appActionSlice from "./appActionSlice";
import friendRequestSlice from "./friendRequestSlice";
import friendSlice from "./friendSlice";

/**
 * Redux Store
 * @description Creating a redux store
 */
export default configureStore({
  reducer: {
    user: userSlice,
    notifications: notificationSlice,
    workspace: workspaceSlice,
    actions: appActionSlice,
    friendRequests: friendRequestSlice,
    friends: friendSlice,
  },
});
