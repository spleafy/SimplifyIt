import { createSlice } from "@reduxjs/toolkit";

/**
 * Friend slice
 * @description Exporting the friendSlice
 */
export const friendSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [],
  },
  reducers: {
    updateFriends: (state: any, action) => {
      state.friends = action.payload;
    },
  },
});

/**
 * friendSlice actions
 * @description Exporting the deconstructed actions from the friendSlice
 */
export const { updateFriends } = friendSlice.actions;

/**
 * friendSlice reducer
 * @description Exporting the whole reducer from the friendSlice
 */
export default friendSlice.reducer;
