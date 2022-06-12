import ResponseUser from "./models/responseUser";
import ResponseWorkspace from "./models/responseWorkspace";
import { UserType, WorkspaceType } from "./types";

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

export const filterWorkspaces = (unfiltered: WorkspaceType[]) => {
  const workspaces: WorkspaceType[] = [];

  unfiltered.forEach((workspace: WorkspaceType) => {
    workspaces.push(new ResponseWorkspace(workspace).getWorkspace());
  });

  return workspaces;
};
