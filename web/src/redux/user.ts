import { createSlice } from "@reduxjs/toolkit";

/**
 * User slice
 * @description Exporting the slice
 */
export const slice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    update: (state, action) => {
      state.user = action.payload;
    },
  },
});

/**
 * slice actions
 * @description Exporting the deconstructed actions from the slice
 */
export const { update } = slice.actions;

/**
 * slice reducer
 * @description Exporting the whole reducer from the slice
 */
export default slice.reducer;
