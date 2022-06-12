import { Request, Response } from "express";
import ResponseMessage from "../../models/responseMessage";
import Workspace from "../../models/database/workspace";
// Utils
import { filterWorkspaces } from "../../utils";

const fetchAllWorkspaces = async (req: Request, res: Response) => {
  const unFilteredWorkspaces = await Workspace.find({
    users: {
      $in: [req.id],
    },
  });

  const workspaces = filterWorkspaces(unFilteredWorkspaces);

  res.json(
    new ResponseMessage(200, {
      workspaces,
    })
  );
};

export default fetchAllWorkspaces;
