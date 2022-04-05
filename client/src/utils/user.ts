import store from "../redux/store";
import { userSlice } from "../redux/userSlice";
import { notificationSlice } from "../redux/notificationSlice";
// Utils
import { fecthLoggedUserData, fetchUserNotifications } from "./api";
import {
  followUser,
  unfollowUser,
  updateUserAccountColor,
  updateUserThemeColor,
  updateUserDarkTheme,
  updateNotificationState,
} from "./api";

export const updateUserData = async () => {
  const stateUser: any = store.getState().user.user;

  if (stateUser.username === undefined) {
    const response = await fecthLoggedUserData();
    store.dispatch(userSlice.actions.updateUser(response.data.user));
  }
};

export const updateUserNotifications = async () => {
  const stateNotifications: any = store.getState().notifications.notifications;

  if (stateNotifications.length === 0) {
    const response = await fetchUserNotifications();
    store.dispatch(
      notificationSlice.actions.updateNotifications(response.data.notifications)
    );
  }
};

export const followUserAndUpdate = async (username: string | undefined) => {
  const response = await followUser(username);
  store.dispatch(userSlice.actions.updateUser(response.data.loggedUser));
  return response;
};

export const unfollowUserAndUpdate = async (username: string | undefined) => {
  const response = await unfollowUser(username);
  store.dispatch(userSlice.actions.updateUser(response.data.loggedUser));
  return response;
};

export const updateUserProfileColorAndUpdate = async (color: string) => {
  const response = await updateUserAccountColor(color);
  store.dispatch(userSlice.actions.updateUser(response.data.user));
};

export const updateUserThemeColorAndUpdate = async (color: string) => {
  const response = await updateUserThemeColor(color);
  store.dispatch(userSlice.actions.updateUser(response.data.user));
};

export const updateUserDarkThemeAndUpdate = async (toggled: boolean) => {
  const response = await updateUserDarkTheme(toggled);
  store.dispatch(userSlice.actions.updateUser(response.data.user));
};

export const updateNotificationStateAndUpdate = async (id: string) => {
  const response = await updateNotificationState(id);
  store.dispatch(
    notificationSlice.actions.updateNotifications(response.data.notifications)
  );
};
