import { Request, Response } from "express";
import ResponseMessage from "../../models/responseMessage";
import ResponseWorkspace from "../../models/responseWorkspace";
import ResponseError from "../../models/responseError";
import Workspace from "../../models/database/workspace";
import User from "../../models/database/user";
// Types
import { UserType } from "../../types";
// Utils
import { validateObjectKeys } from "../../utils";
import ResponseUser from "../../models/responseUser";

const changeActiveWorkspace = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.body, ["id"])) {
    res.status(403).json(ResponseError.params());
    return;
  }

  const workspace = await Workspace.findOne({
    _id: req.body.id,
    users: {
      $in: [req.id],
    },
  });

  if (!workspace) {
    res.status(404).json(ResponseError.notFound());
    return;
  }

  const user = await User.findOneAndUpdate(
    { _id: req.id },
    {
      $set: {
        activeWorkspace: workspace._id,
      },
    },
    {
      new: true,
    }
  );

  res.json(
    new ResponseMessage(200, {
      user: new ResponseUser(user).getUser(),
      workspace: new ResponseWorkspace(workspace).getWorkspace(),
    })
  );
  return;
};

export default changeActiveWorkspace;
