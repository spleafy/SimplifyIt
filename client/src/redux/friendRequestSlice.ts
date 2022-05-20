import { createSlice } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import { FriendRequestType } from "../utils/types";

/**
 * Friend request slice
 * @description Exporting the friendRequestSlice
 */
export const friendRequestSlice = createSlice({
  name: "friendRequests",
  initialState: {
    friendRequests: {
      sent: [],
      received: [],
    },
  },
  reducers: {
    updateReceivedFriendRequests: (state: RootStateOrAny, action) => {
      state.friendRequests.received = action.payload;
    },
    pushReceivedFriendRequest: (state: RootStateOrAny, action) => {
      state.friendRequests.received = [
        ...state.friendRequests.received,
        action.payload,
      ];
    },
    deleteReceivedFriendRequest: (state: RootStateOrAny, action) => {
      state.friendRequests.received = state.friendRequests.received.filter(
        (friendRequest: FriendRequestType) =>
          friendRequest.from !== action.payload
      );
    },
    updateSentFriendRequests: (state: RootStateOrAny, action) => {
      state.friendRequests.sent = action.payload;
    },
    pushSentFriendRequest: (state: RootStateOrAny, action) => {
      state.friendRequests.sent = [
        ...state.friendRequests.sent,
        action.payload,
      ];
    },
    deleteSentFriendRequest: (state: RootStateOrAny, action) => {
      state.friendRequests.sent = state.friendRequests.sent.filter(
        (friendRequest: FriendRequestType) =>
          friendRequest.to !== action.payload
      );
    },
  },
});

/**
 * friendRequestSlice actions
 * @description Exporting the deconstructed actions from the friendRequestSlice
 */
export const {
  updateReceivedFriendRequests,
  pushReceivedFriendRequest,
  deleteReceivedFriendRequest,
  updateSentFriendRequests,
  pushSentFriendRequest,
  deleteSentFriendRequest,
} = friendRequestSlice.actions;

/**
 * friendRequestSlice reducer
 * @description Exporting the whole reducer from the friendRequestSlice
 */
export default friendRequestSlice.reducer;
