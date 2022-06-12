import { createSlice } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import { UserType } from "../utils/types";

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
    updateFriends: (state: RootStateOrAny, action) => {
      state.friends = action.payload;
    },
    removeFriend: (state: RootStateOrAny, action) => {
      state.friends = state.friends.filter(
        (friend: UserType) => friend._id !== action.payload
      );
    },
  },
});

/**
 * friendSlice actions
 * @description Exporting the deconstructed actions from the friendSlice
 */
export const { updateFriends, removeFriend } = friendSlice.actions;

/**
 * friendSlice reducer
 * @description Exporting the whole reducer from the friendSlice
 */
export default friendSlice.reducer;
