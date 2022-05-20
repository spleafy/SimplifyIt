import { createFormData } from "./form";
import { addError, addSuccess } from "./utils";

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
  headers?: HeadersInit | undefined,
  body?: Object
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
    "api/v1/user/validate/token",
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
export const fecthUserData = async (username?: string | undefined) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/v1/user?username=${encodeURIComponent(username ? username : "")}`,
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

/**
 * fetchFriendRequests
 * @returns {Object}
 * @description Method that fetches user's friend requests from the backend
 */
export const fetchFriendRequests = async () => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/v1/user/friend/request`,
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

/**
 * sendFriendRequest
 * @param {string | undefined} id The id of the friend you want to send a friend request to
 * @returns {Object}
 * @description Method that sends a friend request to a user
 */
export const sendFriendRequest = async (id: string | undefined) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/v1/user/friend/request`,
    "POST",
    token ? { "X-Auth-Token": token } : {},
    { id }
  );

  if (response.status === 200) {
    addSuccess("sendfriendrequest");
  } else {
    addError("sendfriendrequets");
  }

  return response;
};

/**
 * acceptFriendRequest
 * @param {string | undefined} id The id of the friend request that you want to accept
 * @returns {Object}
 * @description Method that fetches all of the user's friend requests from the backend
 */
export const acceptFriendRequest = async (id: string | undefined) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/v1/user/friend/request/accept`,
    "POST",
    token ? { "X-Auth-Token": token } : {},
    { id }
  );

  if (response.status === 200) {
    addSuccess("acceptfriendrequest");
  } else {
    addError("acceptfriendrequets");
  }

  return response;
};

/**
 * rejectFriendRequest
 * @param {string | undefined} id The id of the user from whom you want to reject the request
 * @returns {Object}
 * @description Method that rejects a friend request
 */
export const rejectFriendRequest = async (id: string | undefined) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/v1/user/friend/request/reject`,
    "POST",
    token ? { "X-Auth-Token": token } : {},
    { id }
  );

  if (response.status === 200) {
    addSuccess("rejectfriendrequest");
  } else {
    addError("rejectfriendrequets");
  }

  return response;
};

/**
 * cancelFriendRequest
 * @param {string | undefined} id The id of the user to whom you want to cancel the request
 * @returns {Object}
 * @description Method that cancels a friend request
 */
export const cancelFriendRequest = async (id: string | undefined) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/v1/user/friend/request/cancel`,
    "POST",
    token ? { "X-Auth-Token": token } : {},
    { id }
  );

  if (response.status === 200) {
    addSuccess("cancelfriendrequest");
  } else {
    addError("cancelfriendrequets");
  }

  return response;
};

/**
 * removeFriend
 * @param {string | undefined} id The id of the friend that you want to remove
 * @returns {Object}
 * @description Method that removes a user from your friend list
 */
export const removeFriend = async (id: string | undefined) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/v1/user/friend/remove`,
    "POST",
    token ? { "X-Auth-Token": token } : {},
    { id }
  );

  if (response.status === 200) {
    addSuccess("removefriend");
  } else {
    addError("removefriend");
  }

  return response;
};

export const fetchUserFriends = async () => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/v1/user/friend`,
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
export const searchData = async (search: string, param: string) => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/v1/user/search?search=${encodeURIComponent(
      search
    )}&param=${encodeURIComponent(param)}`,
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
    `api/v1/user/notifications`,
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
    `api/v1/user/notifications/state`,
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
    `api/v1/workspace`,
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};

export const fetchUserTeams = async () => {
  const token = localStorage.getItem("X-Auth-Token");

  const response = await fetchBackendAsync(
    `api/v1/teams`,
    "GET",
    token ? { "X-Auth-Token": token } : {}
  );

  return response;
};
