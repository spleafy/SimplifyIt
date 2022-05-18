import { IndexDirection } from "mongoose";

export interface UserType {
  _id: string | object | Buffer;
  fullname: string;
  email: string;
  username: string;
  password: string;
  jobtitle?: string;
  website?: string;
  location?: string;
  settings: {
    initialSetup: boolean;
    profile: {
      profileColor: string;
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
}

export interface NotificationType {
  userID: string;
  type: string;
  data: {
    username: string;
    fullname: string;
    settings: any;
  };
  opened: boolean;
  date: number;
}

export interface WorkspaceType {
  administrators: string[];
  users: string[];
  name: string;
  settings: {
    allowUsersToCreate: boolean;
    workspaceColor: string;
  };
}

export interface TeamType {
  name: string;
  users: string[];
  administrators: string[];
  settings: {
    teamColor: string;
  };
}
