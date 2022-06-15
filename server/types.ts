import { Request, Response, RequestHandler } from "express";

export interface UserType {
  _id: string;
  fullname: string;
  email: string;
  username: string;
  jobtitle?: string;
  website?: string;
  location?: string;
  password: string;
  settings: {
    initialSetup: boolean;
    profile: {
      profileColor: string;
      profilePicture: boolean;
      themeColor: string;
      darkTheme: boolean;
    };
    security: {
      twoFactor: boolean;
    };
    sound: {
      success: boolean;
      warning: boolean;
      error: boolean;
    };
    notification: {
      post: boolean;
      friendRequest: boolean;
    };
  };
  posts: string[];
  friends: string[];
  teams: string[];
  workspaces: string[];
  activeWorkspace: string;
}

export interface NotificationType {
  _id: string;
  userID: string;
  type: string;
  data: {
    _id: string;
    username: string;
    fullname: string;
    settings: UserType["settings"];
  };
  opened: boolean;
  date: number;
}

export interface WorkspaceType {
  _id: string;
  administrators: string[];
  users: string[];
  name: string;
  settings: {
    allowUsersToCreate: boolean;
    workspaceColor: string;
  };
}

export interface TeamType {
  _id: string;
  name: string;
  users: string[];
  administrators: string[];
  settings: {
    teamColor: string;
  };
}

export interface PostType {
  _id: string;
  title: string;
}

export interface FriendRequestType {
  _id: string;
  from: string;
  to: string;
  userTo: UserType;
  userFrom: UserType;
}

export interface ActionType {
  _id: string;
  message: string;
}
