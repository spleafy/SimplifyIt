import { Request, Response } from "express";
import ResponseMessage from "../../models/responseMessage";
import ResponseWorkspace from "../../models/responseWorkspace";
import Workspace from "../../models/database/workspace";
import User from "../../models/database/user";
// Types
import { UserType } from "../../types";

const fetchActiveWorkspace = async (req: Request, res: Response) => {
  const user: UserType | null = await User.findOne({ _id: req.id });

  const workspace = await Workspace.findOne({
    _id: user?.activeWorkspace,
    users: {
      $in: [req.id],
    },
  });

  res.json(
    new ResponseMessage(200, {
      workspace: new ResponseWorkspace(workspace).getWorkspace(),
    })
  );
  return;
};

export default fetchActiveWorkspace;
