import { Request, Response } from "express";
import ResponseMessage from "../../models/responseMessage";
import ResponseWorkspace from "../../models/responseWorkspace";
import ResponseUser from "../../models/responseUser";
import Workspace from "../../models/database/workspace";
import User from "../../models/database/user";
// Types
import { WorkspaceType } from "../../types";
// Utils
import { validateObjectKeys } from "../../utils";

const createWorkspace = async (req: Request | any, res: Response) => {
  if (!validateObjectKeys(req.body, ["name", "color"])) {
    res.json(new ResponseMessage(400));
    return;
  }

  const workspace: WorkspaceType = await new Workspace({
    administrators: [req.id],
    users: [req.id],
    name: req.body.name,
    settings: {
      allowUsersToCreate: false,
      workspaceColor: req.body.color,
    },
  }).save();

  if (!workspace) {
    res.json(new ResponseMessage(400));
    return;
  }

  const user: any = await User.findOneAndUpdate(
    { _id: req.id },
    {
      $set: {
        "settings.initialSetup": true,
      },
    },
    { new: true }
  );
  res.json(
    new ResponseMessage(200, {
      user: new ResponseUser(user).getUser(),
      workspace: new ResponseWorkspace(workspace).getWorkspace(),
    })
  );
};

export default createWorkspace;
