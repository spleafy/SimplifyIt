import { createSlice } from "@reduxjs/toolkit";
// Redux
import store from "./store";
import { slice as taskSlice } from "./tasks";

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
        (p: any) => p._id !== action.payload
      );
    },
  },
});

/**
 * slice actions
 * @description Exporting the deconstructed actions from the slice
 */
export const { init, add, remove } = slice.actions;

/**
 * slice reducer
 * @description Exporting the whole reducer from the slice
 */
export default slice.reducer;
