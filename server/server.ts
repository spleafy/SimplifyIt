import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import { setupSocket } from "./socket";

// Config
dotenv.config({});

const upload = multer();

const app: Application = express();

app.use(cors({}));

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 4000;
const HOST = process.env.HOST ?? "127.0.0.1";

setupSocket();

// mongoose.connect(
//   `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`
// );

mongoose.connect(
  `mongodb://${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`
);

// Middleware
import verifyToken from "./middleware/verifyToken";

// Api Endpoint
import fetchApi from "./api/fetchApi";

// Auth Endpoints
import authLogin from "./api/user/auth/authLogin";
import authRegister from "./api/user/auth/authRegister";
import authForgot from "./api/user/auth/authForgot";
import authReset from "./api/user/auth/authReset";
import authTwoFactor from "./api/user/auth/authTwoFactor";

// Validate Endpoints
import validateUsername from "./api/user/validate/validateUsername";
import validateEmail from "./api/user/validate/validateEmail";
import validateToken from "./api/user/validate/validateToken";

// User Endpoints
import fetchUserData from "./api/user/fetchUserData";
import fetchData from "./api/user/fetchData";
import initialSetup from "./api/user/initialSetup";

// Settings Endpoints
import updateUserAccount from "./api/user/settings/updateUserAccount";

// Notifications Endpoints
import updateNotificationState from "./api/user/notifications/updateNotificationState";
import fetchNotifications from "./api/user/notifications/fetchNotifications";

// Friend Endpoints
import createFriendRequest from "./api/user/friends/createFriendRequest";
import acceptFriendRequest from "./api/user/friends/acceptFriendRequest";
import cancelFriendRequest from "./api/user/friends/cancelFriendRequest";
import rejectFriendRequest from "./api/user/friends/rejectFriendRequest";
import fetchFriendRequests from "./api/user/friends/fetchFriendRequests";
import fetchFriends from "./api/user/friends/fetchFriends";
import removeFriend from "./api/user/friends/removeFriend";

// Workspace Endpoints
import createWorkspace from "./api/workspace/createWorkspace";
import fetchWorkspace from "./api/workspace/fetchWorkspace";
import fetchActiveWorkspace from "./api/workspace/fetchActiveWorkspace";
import fetchAllWorkspaces from "./api/workspace/fetchAllWorkspaces";
import changeActiveWorkspace from "./api/workspace/changeActiveWorkspace";

// Api Route
app.get("/api", fetchApi);

// Auth Routes
app.post("/api/v1/user/auth/login", upload.none(), authLogin);

app.post("/api/v1/user/auth/register", upload.none(), authRegister);

app.post("/api/v1/user/auth/forgot", upload.none(), authForgot);

app.post("/api/v1/user/auth/reset", verifyToken, upload.none(), authReset);

app.post(
  "/api/v1/user/auth/twofactor",
  verifyToken,
  upload.none(),
  authTwoFactor
);

// Validate Routes
app.get("/api/v1/user/validate/username", validateUsername);

app.get("/api/v1/user/validate/email", validateEmail);

app.get("/api/v1/user/validate/token", verifyToken, validateToken);

// User Routes
app.get("/api/v1/user", verifyToken, fetchUserData);

app.get("/api/v1/user/search", verifyToken, fetchData);

app.post("/api/v1/user/initial", verifyToken, upload.none(), initialSetup);

// Settings Routes
app.put(
  "/api/v1/user/settings/account",
  upload.none(),
  verifyToken,
  updateUserAccount
);

// Notification Routes
app.get("/api/v1/user/notifications", verifyToken, fetchNotifications);

app.put(
  "/api/v1/user/notifications/state",
  upload.none(),
  verifyToken,
  updateNotificationState
);

// Friend Routes
app.get("/api/v1/user/friend/request", verifyToken, fetchFriendRequests);

app.post(
  "/api/v1/user/friend/request",
  verifyToken,
  upload.none(),
  createFriendRequest
);

app.post(
  "/api/v1/user/friend/request/reject",
  verifyToken,
  upload.none(),
  rejectFriendRequest
);

app.post(
  "/api/v1/user/friend/request/cancel",
  verifyToken,
  upload.none(),
  cancelFriendRequest
);

app.post(
  "/api/v1/user/friend/request/accept",
  verifyToken,
  upload.none(),
  acceptFriendRequest
);

app.get("/api/v1/user/friend", verifyToken, fetchFriends);

app.post(
  "/api/v1/user/friend/remove",
  verifyToken,
  upload.none(),
  removeFriend
);

// Workspace Routes
app.get("/api/v1/workspace", verifyToken, fetchWorkspace);

app.post("/api/v1/workspace", verifyToken, upload.none(), createWorkspace);

app.get("/api/v1/workspace/active", verifyToken, fetchActiveWorkspace);

app.post(
  "/api/v1/workspace/active",
  verifyToken,
  upload.none(),
  changeActiveWorkspace
);

app.get("/api/v1/workspace/all", verifyToken, fetchAllWorkspaces);

app.listen(PORT, HOST, () => {
  console.log(`Server listening on port : http://${HOST}:${PORT}`);
});
