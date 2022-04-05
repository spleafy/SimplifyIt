import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import notificationSlice from "./notificationSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    notifications: notificationSlice,
  },
});
