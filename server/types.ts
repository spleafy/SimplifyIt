import { IndexDirection } from "mongoose";

export interface UserType {
  _id: string | object | Buffer;
  fullname: string;
  email: string;
  username: string;
  password: string;
  friends: string[];
  followers: string[];
  following: string[];
  settings: {
    profileColor: string;
    themeColor: string;
    darkTheme: boolean;
  };
  posts: [];
}

export interface NotificationType {
  userID: string;
  type: string;
  message: string;
  data: {
    username: string;
    fullname: string;
    settings: any;
  };
  opened: boolean;
  date: number;
}
