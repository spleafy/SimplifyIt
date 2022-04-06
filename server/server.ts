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

// Validate Endpoints
import validateUsername from "./api/user/validate/validateUsername";
import validateEmail from "./api/user/validate/validateEmail";
import validateToken from "./api/user/validate/validateToken";

// Auth Endpoints
import authLogin from "./api/user/auth/authLogin";
import authRegister from "./api/user/auth/authRegister";
import authForgot from "./api/user/auth/authForgot";
import authReset from "./api/user/auth/authReset";

// User Endpoints
import fetchLoggedUserData from "./api/user/fetchLoggedUserData";
import fetchUserData from "./api/user/fetchUserData";
import searchUser from "./api/user/searchUser";
import followUser from "./api/user/followUser";
import unfollowUser from "./api/user/unfollowUser";
import fetchUserFollowers from "./api/user/fetchUserFollowers";
import fetchUserFollowing from "./api/user/fetchUserFollowing";
import fetchUserNotifications from "./api/user/fetchUserNotifications";

// Settings Endpoints
import updateUserAccount from "./api/user/settings/updateUserAccount";
import updateUserProfileColor from "./api/user/settings/updateUserProfileColor";
import updateUserThemeColor from "./api/user/settings/updateUserThemeColor";
import updateUserDarkTheme from "./api/user/settings/updateUserDarkTheme";
import updateNotificationState from "./api/user/updateNotificationState";

// Api Route
app.get("/api", fetchApi);

// Auth Routes
app.post("/api/user/auth/login", upload.none(), authLogin);

app.post("/api/user/auth/register", upload.none(), authRegister);

app.post("/api/user/auth/forgot", upload.none(), authForgot);

app.post("/api/user/auth/reset", verifyToken, upload.none(), authReset);

// Validate Routes
app.get("/api/user/validate/username", validateUsername);

app.get("/api/user/validate/email", validateEmail);

app.get("/api/user/validate/token", verifyToken, validateToken);

// User Routes
app.get("/api/user/logged", verifyToken, fetchLoggedUserData);

app.get("/api/user", verifyToken, fetchUserData);

app.get("/api/user/search", verifyToken, searchUser);

app.get("/api/user", verifyToken, fetchUserData);

app.get("/api/user/followers", verifyToken, fetchUserFollowers);

app.get("/api/user/following", verifyToken, fetchUserFollowing);

app.get("/api/user/notifications", verifyToken, fetchUserNotifications);

app.post("/api/user/follow", upload.none(), verifyToken, followUser);

app.post("/api/user/unfollow", upload.none(), verifyToken, unfollowUser);

// Settings Routes
app.post(
  "/api/user/settings/account",
  upload.none(),
  verifyToken,
  updateUserAccount
);

app.post(
  "/api/user/settings/account/color",
  upload.none(),
  verifyToken,
  updateUserProfileColor
);

app.post(
  "/api/user/settings/theme/color",
  upload.none(),
  verifyToken,
  updateUserThemeColor
);

app.post(
  "/api/user/settings/theme/dark",
  upload.none(),
  verifyToken,
  updateUserDarkTheme
);

app.put(
  "/api/user/notifications/state",
  upload.none(),
  verifyToken,
  updateNotificationState
);

// Workspace Endpoints

import createWorkspace from "./api/workspace/createWorkspace";

app.post("/api/workspace/create", upload.none(), verifyToken, createWorkspace);

app.listen(PORT, HOST, () => {
  console.log(`Server listening on port : http://${HOST}:${PORT}`);
});
