import { Request, Response } from "express";
import ResponseMessage from "../../models/responseMessage";
import ResponseWorkspace from "../../models/responseWorkspace";
import ResponseUser from "../../models/responseUser";
import Workspace from "../../models/database/workspace";
import User from "../../models/database/user";
// Types
import { WorkspaceType } from "../../types";

const getWorkspace = async (req: Request | any, res: Response) => {
  res.json(new ResponseMessage(200, { workspace: null }));
};

export default getWorkspace;
