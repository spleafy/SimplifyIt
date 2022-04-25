import store from "../redux/store";
import { userSlice } from "../redux/userSlice";
import { notificationSlice } from "../redux/notificationSlice";
import { workspaceSlice } from "../redux/workspaceSlice";
// Utils
import {
  fecthLoggedUserData,
  fetchUserNotifications,
  fetchUserWorkspace,
} from "./api";
import { addFriend, removeFriend, updateNotificationState } from "./api";

/**
 * updateUserData
 * @description Method to check if a user exists in the redux store, if not, it will be fetched from the backend and the redux store updated
 */
export const updateUserData = async () => {
  const stateUser: any = store.getState().user.user;

  if (stateUser.username === undefined) {
    const response = await fecthLoggedUserData();
    store.dispatch(userSlice.actions.updateUser(response.data.user));
  }
};

/**
 * updateUserNotifications
 * @description Method to check if notifications exist in the redux store, if not, they will be fetched from the backend and the redux store updated
 */
export const updateUserNotifications = async () => {
  const stateNotifications: any = store.getState().notifications.notifications;

  if (stateNotifications.length === 0) {
    const response = await fetchUserNotifications();
    store.dispatch(
      notificationSlice.actions.updateNotifications(response.data.notifications)
    );
  }
};

/**
 * updateWorkspace
 * @description Method to check if a workspace exists in the redux store, if not, it will be fetched from the backend and the redux store updated
 */
export const updateWorkspace = async () => {
  const stateWorkspace: any = store.getState().workspace.workspace;

  if (!stateWorkspace.name) {
    const response = await fetchUserWorkspace();
    store.dispatch(
      workspaceSlice.actions.updateWorkspace(response.data.workspace)
    );
  }
};

/**
 * addFriendAndUpdate
 * @param {string | undefined} username The username of the user to which the friend request should be sent
 * @returns {Object}
 * @description Method which sends a friend request and updates the redux store
 */
export const addFriendAndUpdate = async (username: string | undefined) => {
  const response = await addFriend(username);
  store.dispatch(userSlice.actions.updateUser(response.data.loggedUser));
  return response;
};

/**
 * addFriendAndUpdate
 * @param {string | undefined} username The username of the user to which should be removed from the friends list
 * @returns {Object}
 * @description Method which removes a user from the friend list and updates the redux store
 */
export const removeFriendAndUpdate = async (username: string | undefined) => {
  const response = await removeFriend(username);
  store.dispatch(userSlice.actions.updateUser(response.data.loggedUser));
  return response;
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
