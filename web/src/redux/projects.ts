import { createSlice } from "@reduxjs/toolkit";

/**
 * Projects slice
 * @description Exporting the slice
 */
export const slice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
  },
  reducers: {
    init: (state: any, action) => {
      state.projects = action.payload;
    },
    add: (state: any, action) => {
      state.projects = [...state.projects, action.payload];
    },
    remove: (state: any, action) => {
      state.projects = state.projects.filter(
        (p: any) => p._id !== action.payload._id
      );
    },
  },
});

/**
 * slice actions
 * @description Exporting the deconstructed actions from the slice
 */
export const { init } = slice.actions;

/**
 * slice reducer
 * @description Exporting the whole reducer from the slice
 */
export default slice.reducer;
