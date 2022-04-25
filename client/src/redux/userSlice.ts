import { createSlice } from "@reduxjs/toolkit";

/**
 * User slice
 * @description Exporting the userSlice
 */
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

/**
 * userSlice actions
 * @description Exporting the deconstructed actions from the userSlice
 */
export const { updateUser } = userSlice.actions;

/**
 * userSlice reducer
 * @description Exporting the whole reducer from the userSlice
 */
export default userSlice.reducer;
