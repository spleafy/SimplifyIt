import ResponseUser from "./models/responseUser";
import { UserType } from "./types";

export const validateObjectKeys = (obj: any, keys: string[]) => {
  let res = true;

  keys.forEach((key: string) => {
    if (!obj || !obj[key]) {
      res = false;
    }
  });

  return res;
};

export const filterUsers = (unfiltered: UserType[]) => {
  const users: UserType[] = [];

  unfiltered.forEach((user: UserType) => {
    users.push(new ResponseUser(user).getUser());
  });

  return users;
};
