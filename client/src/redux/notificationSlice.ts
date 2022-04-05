import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
  },
  reducers: {
    updateNotifications: (state: any, action) => {
      action.payload.reverse();
      state.notifications = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
