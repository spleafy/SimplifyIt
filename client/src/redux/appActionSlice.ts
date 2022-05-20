import { createSlice } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import { ActionType } from "../utils/types";

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
    pushError: (state: RootStateOrAny, action) => {
      state.errors = [...state.errors, action.payload];
    },
    deleteError: (state: RootStateOrAny, action) => {
      state.errors = state.errors.filter(
        (error: ActionType) => error._id !== action.payload
      );
    },
    pushSuccess: (state: RootStateOrAny, action) => {
      state.successes = [...state.successes, action.payload];
    },
    deleteSuccess: (state: RootStateOrAny, action) => {
      state.successes = state.successes.filter(
        (success: ActionType) => success._id !== action.payload
      );
    },
    pushWarning: (state: RootStateOrAny, action) => {
      state.warnings = [...state.warnings, action.payload];
    },
    deleteWarning: (state: RootStateOrAny, action) => {
      state.warnings = state.warnings.filter(
        (warning: ActionType) => warning._id !== action.payload
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
