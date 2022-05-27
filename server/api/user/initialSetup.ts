import { Request, Response } from "express";
import ResponseMessage from "../../models/responseMessage";
import ResponseWorkspace from "../../models/responseWorkspace";
import ResponseUser from "../../models/responseUser";
import ResponseError from "../../models/responseError";
import Workspace from "../../models/database/workspace";
import User from "../../models/database/user";
// Types
import { UserType, WorkspaceType } from "../../types";
// Utils
import { validateObjectKeys } from "../../utils";

const initialSetup = async (req: Request | any, res: Response) => {
  if (!validateObjectKeys(req.body, ["name", "color"])) {
    res.status(403).json(ResponseError.params());
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
    res.status(404).json(ResponseError.notFound());
    return;
  }

  const user: UserType | null = await User.findOneAndUpdate(
    { _id: req.id },
    {
      $set: {
        "settings.initialSetup": true,
        activeWorkspace: workspace._id,
      },
      $push: {
        workspaces: workspace._id,
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

export default initialSetup;
