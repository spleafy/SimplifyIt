import { createSlice } from "@reduxjs/toolkit";

/**
 * Error slice
 * @description Exporting the errorSlice
 */
export const errorSlice = createSlice({
  name: "errors",
  initialState: {
    errors: [],
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
  },
});

/**
 * errorSlice actions
 * @description Exporting the deconstructed actions from the errorSlice
 */
export const { pushError, deleteError } = errorSlice.actions;

/**
 * errorSlice reducer
 * @description Exporting the whole reducer from the errorSlice
 */
export default errorSlice.reducer;
