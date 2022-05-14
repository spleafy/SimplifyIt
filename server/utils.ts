import ResponseUser from "./models/responseUser";

export const validateObjectKeys = (obj: any, keys: string[]) => {
  let res = true;

  keys.forEach((key: string) => {
    if (!obj || !obj[key]) {
      res = false;
    }
  });

  return res;
};

export const filterUsers = (unfiltered: any[]) => {
  const users: any[] = [];

  unfiltered.forEach((user: any) => {
    users.push(new ResponseUser(user).getUser());
  });

  return users;
};
