import { createFormData } from "./form";
import { addError } from "./utils";

/**
 * fetchBackendAsync
 * @param {string} path The path of the api that you want to fetch
 * @param {string=} method The method of the request e.g. POST, GET, PUT
 * @param {Object=} headers The headers object of the request
 * @param {any=} body The request body
 * @returns Promise<any>
 * @description Method to fetch the backend
 */
export const fetchBackendAsync = async (
  path: string,
  method?: string,
  headers?: any,
  body?: any
): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/${path}`,
      {
        method: method ? method.toUpperCase() : "GET",
        headers: headers ? headers : {},
        body: body ? createFormData(body) : undefined,
      }
    );

    const data = await response.json();

    return data;
  } catch (err: any) {
    addError(err.toString());
  }
};

/**
 * authToken
 * @returns {Object}
 * @description Validating the token in the user's browser with the token in the backend
 */
export const authToken = async () => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    "api/user/validate/token",
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

/**
 * fetchLoggedUserData
 * @returns {Object}
 * @description Method that fetches the logged user data from the backend
 */
export const fecthLoggedUserData = async () => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    "api/user/logged",
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

/**
 * fetchUserData
 * @param {string | undefined} username The requested user's username
 * @returns {Object}
 * @description Method that fetches user's data from the backend
 */
export const fecthUserData = async (username: string | undefined) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/user?username=${encodeURIComponent(username ? username : "")}`,
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

/**
 * addFriend
 * @param {string | undefined} username The username of the friend you want to add
 * @returns {Object}
 * @description Method that sends a friend request to a user
 */
export const addFriend = async (username: string | undefined) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/user/follow?username=${encodeURIComponent(username ? username : "")}`,
    "POST",
    token ? { "X-Auth-Token": token } : {},
    { username }
  );

  return response;
};

export const acceptFriendRequest = async () => {};

export const removeFriendRequest = async () => {};

/**
 * removeFriend
 * @param {string | undefined} username The username of the friend that you want to remove
 * @returns {Object}
 * @description Method that removes a user from your friend list
 */
export const removeFriend = async (username: string | undefined) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/user/unfollow`,
    "POST",
    token ? { "X-Auth-Token": token } : {},
    { username }
  );

  return response;
};

/**
 * fetchUserFollowers
 * @param {string} id The id of the user
 * @param {number=} start The start of the list with followers, for pagination
 * @param {number=} limit The number of users that will be sent back
 * @returns {Object}
 * @description Method that fetches user's followers from the backend
 */
export const fetchUserFollowers = async (
  id: string,
  start: number = 0,
  limit: number = 10
) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/user/followers?id=${encodeURIComponent(id)}&start=${encodeURIComponent(
      start
    )}&limit=${encodeURIComponent(limit)}`,
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

/**
 * fetchUserFollowing
 * @param {string} id The id of the user
 * @param {number=} start The start of the list with following users, for pagination
 * @param {number=} limit The number of users that will be sent back
 * @returns {Object}
 * @description Method that fetches user's following users from the backend
 */
export const fetchUserFollowing = async (
  id: string,
  start: number = 0,
  limit: number = 10
) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/user/following?id=${encodeURIComponent(id)}&start=${encodeURIComponent(
      start
    )}&limit=${encodeURIComponent(limit)}`,
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

/**
 * searchData
 * @param {string} search The search string
 * @returns {Object}
 * @description Method that searches the data
 */
export const searchData = async (search: string) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/user/search?search=${encodeURIComponent(search)}`,
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

/**
 * fetchUserNotifications
 * @returns {Object}
 * @description Method that fethces the logged user's notifications
 */
export const fetchUserNotifications = async () => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/user/notifications`,
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

/**
 * updateNotificationState
 * @param {sring} id The notification id
 * @returns {Object}
 * @description Method to mark a notification as read
 */
export const updateNotificationState = async (id: string) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/user/notifications/state`,
    "PUT",
    token ? { "X-Auth-Token": token } : {},
    { id }
  );

  return response;
};

/**
 * fetchUserWorkspace
 * @returns {Object}
 * @description Method that fetches the user active workspace
 */
export const fetchUserWorkspace = async () => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/workspace`,
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};
