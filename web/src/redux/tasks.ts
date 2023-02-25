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
    add: (state: any, action) => {
      action.payload.forEach((task: any) => {
        state.tasks = state.tasks.filter((p: any) => p._id !== task._id);
      });

      state.tasks = [...state.tasks, ...action.payload];
    },
    remove: (state: any, action) => {
      state.tasks = state.tasks.filter(
        (p: any) => p._id !== action.payload._id
      );
    },
  },
});

/**
 * slice actions
 * @description Exporting the deconstructed actions from the slice
 */
export const { add, remove } = slice.actions;

/**
 * slice reducer
 * @description Exporting the whole reducer from the slice
 */
export default slice.reducer;
