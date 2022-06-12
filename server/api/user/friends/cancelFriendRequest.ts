import { Request, Response } from "express";
import FriendRequest from "../../../models/database/friendRequest";
import ResponseMessage from "../../../models/responseMessage";
import ResponseError from "../../../models/responseError";
// Utils
import { validateObjectKeys } from "../../../utils";

const cancelFriendRequest = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.body, ["id"])) {
    res.status(403).json(ResponseError.params());
    return;
  }

  await FriendRequest.deleteOne({ to: req.body.id, from: req.id });
  res.status(200).json(new ResponseMessage(200));
};

export default cancelFriendRequest;
