import { createSlice } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";

/**
 * Notification slice
 * @description Exporting the notificationSlice
 */
export const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
  },
  reducers: {
    updateNotifications: (state: RootStateOrAny, action) => {
      action.payload.reverse();
      state.notifications = action.payload;
    },
  },
});

/**
 * notificationSlice actions
 * @description Exporting the deconstructed actions from the notificationSlice
 */
export const { updateNotifications } = notificationSlice.actions;

/**
 * notificationSlice reducer
 * @description Exporting the whole reducer from the notificationSlice
 */
export default notificationSlice.reducer;
