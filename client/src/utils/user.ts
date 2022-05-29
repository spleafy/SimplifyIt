import store from "../redux/store";
import { userSlice } from "../redux/userSlice";
import { notificationSlice } from "../redux/notificationSlice";
import { friendRequestSlice } from "../redux/friendRequestSlice";
import { friendSlice } from "../redux/friendSlice";
// Utils
import {
  fetchUserNotifications,
  fetchUserData,
  fetchFriendRequests,
  updateNotificationState,
  acceptFriendRequest,
  cancelFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
  removeFriend,
  fetchUserFriends,
} from "./api";
import { RootStateOrAny } from "react-redux";
import { FriendRequestType } from "./types";

// User Methods

/**
 * updateUserData
 * @description Method to check if a user exists in the redux store, if not, it will be fetched from the backend and the redux store updated
 */
export const updateUserData = async () => {
  const stateUser: RootStateOrAny = store.getState().user.user;

  if (stateUser.username === undefined) {
    const response = await fetchUserData();
    store.dispatch(userSlice.actions.updateUser(response.data.user));
  }
};

// Friend Methods

/**
 * updateUserFriendRequests
 * @returns {Object}
 * @description Method to check if friend requests exists in the redux store, if not, they will be fetched from the backend and the redux store updated
 */
export const updateUserFriendRequests = async () => {
  const stateFriendRequests = store.getState().friendRequests.friendRequests;

  if (
    stateFriendRequests.sent.length === 0 ||
    stateFriendRequests.received.length === 0
  ) {
    const response = await fetchFriendRequests();
    store.dispatch(
      friendRequestSlice.actions.updateReceivedFriendRequests(
        response.data.receivedFriendRequests
      )
    );
    store.dispatch(
      friendRequestSlice.actions.updateSentFriendRequests(
        response.data.sentFriendRequests
      )
    );
    return response;
  }
};

/**
 * updateUserFriends
 * @returns {Object}
 * @description Method to check if friends exists in the redux store, if not, they will be fetched from the backend and the redux store updated
 */
export const updateUserFriends = async () => {
  const stateFriends = store.getState().friends.friends;

  if (stateFriends.length === 0) {
    const response = await fetchUserFriends();
    store.dispatch(friendSlice.actions.updateFriends(response.data.friends));
    return response;
  }
};

/**
 * addFriendAndUpdate
 * @param {string | undefined} id The id of the user to which should be removed from the friends list
 * @returns {Object}
 * @description Method which removes a user from the friend list and updates the redux store
 */
export const removeFriendAndUpdate = async (id: string | undefined) => {
  const response = await removeFriend(id);
  store.dispatch(userSlice.actions.updateUser(response.data.user));
  store.dispatch(friendSlice.actions.removeFriend(id));
  return response;
};

/**
 * acceptFriendRequestAndUpdate
 * @param {any} friendRequest The friend request object
 * @returns {Object}
 * @description Method which accepts a friend request, then removes it from the redux store
 */
export const acceptFriendRequestAndUpdate = async (
  friendRequest: FriendRequestType
) => {
  const response = await acceptFriendRequest(friendRequest._id);
  store.dispatch(userSlice.actions.updateUser(response.data.user));
  store.dispatch(
    friendRequestSlice.actions.deleteReceivedFriendRequest(friendRequest.from)
  );
  return response;
};

/**
 * sendFriendRequestAndUpdate
 * @param {string} id The id of the user to whom the request should be sent
 * @returns {Object}
 * @description Method that sends a friend request and then updates the redux store
 */
export const sendFriendRequestAndUpdate = async (id: string) => {
  const response = await sendFriendRequest(id);
  store.dispatch(
    friendRequestSlice.actions.pushSentFriendRequest(
      response.data.friendRequest
    )
  );
  return response;
};

/**
 * rejectFriendRequestAndUpdate
 * @param {string} id The id of the request that has to be rejected
 * @returns {Object}
 * @description Method that rejects a friend request and updates the redux store
 */
export const rejectFriendRequestAndUpdate = async (id: string) => {
  const response = await rejectFriendRequest(id);
  store.dispatch(friendRequestSlice.actions.deleteReceivedFriendRequest(id));
  return response;
};

/**
 * cancelFriendRequestAndUpdate
 * @param {string} id The id of the request that has to be canceled
 * @returns {Object}
 * @description Method that cancels a friend request and updates the redux store
 */
export const cancelFriendRequestAndUpdate = async (id: string) => {
  const response = await cancelFriendRequest(id);
  store.dispatch(friendRequestSlice.actions.deleteSentFriendRequest(id));
  return response;
};

// Notification Methods

/**
 * updateUserNotifications
 * @description Method to check if notifications exist in the redux store, if not, they will be fetched from the backend and the redux store updated
 */
export const updateUserNotifications = async () => {
  const stateNotifications: RootStateOrAny =
    store.getState().notifications.notifications;

  if (stateNotifications.length === 0) {
    const response = await fetchUserNotifications();
    store.dispatch(
      notificationSlice.actions.updateNotifications(response.data.notifications)
    );
  }
};

/**
 * updateNotificationStateAndUpdate
 * @param {string} id The id of the notification
 * @returns {Object}
 * @description Method which updates the notification state and updates it in the store
 */
export const updateNotificationStateAndUpdate = async (id: string) => {
  const response = await updateNotificationState(id);
  store.dispatch(
    notificationSlice.actions.updateNotifications(response.data.notifications)
  );
  return response;
};
