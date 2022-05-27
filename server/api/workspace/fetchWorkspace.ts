import { Request, Response } from "express";
import ResponseMessage from "../../models/responseMessage";
import ResponseWorkspace from "../../models/responseWorkspace";
import ResponseUser from "../../models/responseUser";
import Workspace from "../../models/database/workspace";
import User from "../../models/database/user";
// Types
import { UserType, WorkspaceType } from "../../types";
// Utils
import { validateObjectKeys } from "../../utils";

const getWorkspace = async (req: Request | any, res: Response) => {
  if (!validateObjectKeys(req.query, ["id"])) {
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
  }

  const workspace = await Workspace.findOne({
    _id: req.query.id,
    users: {
      $in: [req.id],
    },
  });

  res.json(
    new ResponseMessage(200, {
      workspace: new ResponseWorkspace(workspace).getWorkspace(),
    })
  );
};

export default getWorkspace;
