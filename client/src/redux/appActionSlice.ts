import { createSlice } from "@reduxjs/toolkit";

/**
 * Error slice
 * @description Exporting the appActionSlice
 */
export const appActionSlice = createSlice({
  name: "actions",
  initialState: {
    errors: [],
    successes: [],
    warnings: [],
  },
  reducers: {
    pushError: (state: any, action) => {
      state.errors = [...state.errors, action.payload];
    },
    deleteError: (state: any, action) => {
      state.errors = state.errors.filter(
        (error: any) => error.id !== action.payload
      );
    },
    pushSuccess: (state: any, action) => {
      state.successes = [...state.successes, action.payload];
    },
    deleteSuccess: (state: any, action) => {
      state.successes = state.successes.filter(
        (success: any) => success.id !== action.payload
      );
    },
    pushWarning: (state: any, action) => {
      state.warnings = [...state.warnings, action.payload];
    },
    deleteWarning: (state: any, action) => {
      state.warnings = state.warnings.filter(
        (warning: any) => warning.id !== action.payload
      );
    },
  },
});

/**
 * appActionSlice actions
 * @description Exporting the deconstructed actions from the appActionSlice
 */
export const {
  pushError,
  deleteError,
  pushSuccess,
  deleteSuccess,
  pushWarning,
  deleteWarning,
} = appActionSlice.actions;

/**
 * appActionSlice reducer
 * @description Exporting the whole reducer from the appActionSlice
 */
export default appActionSlice.reducer;
