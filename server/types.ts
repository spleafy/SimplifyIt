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
  friends: string[];
  settings: {
    profileColor: string;
    themeColor: string;
    darkTheme: boolean;
    initialSetup: boolean;
    twoFactor: boolean;
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
  posts: [];
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
