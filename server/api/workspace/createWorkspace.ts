import { Request, Response } from "express";
import ResponseMessage from "../../models/responseMessage";
import ResponseWorkspace from "../../models/responseWorkspace";
import ResponseUser from "../../models/responseUser";
import Workspace from "../../models/database/workspace";
import User from "../../models/database/user";
// Types
import { WorkspaceType } from "../../types";

const createWorkspace = async (req: Request | any, res: Response) => {
  if (req.body) {
    const workspace: WorkspaceType = await new Workspace({
      administrators: [req.id],
      users: [req.id],
      name: req.body.name,
      settings: {
        allowUsersToCreate: false,
        workspaceColor: req.body.color,
      },
    }).save();

    if (workspace) {
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
    } else {
      res.json(
        new ResponseMessage(
          400,
          { workspace: null },
          { message: "Error creating workspace!" }
        )
      );
    }
  } else {
    res.json(
      new ResponseMessage(
        400,
        { workspace: null },
        { message: "No data provided!" }
      )
    );
  }
};

export default createWorkspace;
