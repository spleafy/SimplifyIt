import { createSlice } from "@reduxjs/toolkit";

/**
 * Tasks slice
 * @description Exporting the slice
 */
export const slice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    init: (state: any, action) => {
      state.tasks = action.payload;
    },
    add: (state: any, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    remove: (state: any, action) => {
      state.tasks = state.tasks.filter((p: any) => p._id !== action.payload);
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
