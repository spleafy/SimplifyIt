import { createSlice } from "@reduxjs/toolkit";

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
    updateReceivedFriendRequests: (state: any, action) => {
      state.friendRequests.received = action.payload;
    },
    pushReceivedFriendRequest: (state: any, action) => {
      state.friendRequests.received = [
        ...state.friendRequests.received,
        action.payload,
      ];
    },
    deleteReceivedFriendRequest: (state: any, action) => {
      state.friendRequests.received = state.friendRequests.received.filter(
        (friendRequest: any) => friendRequest.from !== action.payload
      );
    },
    updateSentFriendRequests: (state: any, action) => {
      state.friendRequests.sent = action.payload;
    },
    pushSentFriendRequest: (state: any, action) => {
      state.friendRequests.sent = [
        ...state.friendRequests.sent,
        action.payload,
      ];
    },
    deleteSentFriendRequest: (state: any, action) => {
      state.friendRequests.sent = state.friendRequests.sent.filter(
        (friendRequest: any) => friendRequest.to !== action.payload
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
