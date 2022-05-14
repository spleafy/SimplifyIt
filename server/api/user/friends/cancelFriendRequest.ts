import { Request, Response } from "express";
import FriendRequest from "../../../models/database/friendRequest";
import ResponseMessage from "../../../models/responseMessage";
// Utils
import { validateObjectKeys } from "../../../utils";

const cancelFriendRequest = async (req: Request | any, res: Response) => {
  if (!validateObjectKeys(req.body, ["id"])) {
    res.json(new ResponseMessage(403));
    return;
  }

  await FriendRequest.deleteOne({ to: req.body.id, from: req.id });
  res.json(new ResponseMessage(200));
};

export default cancelFriendRequest;
