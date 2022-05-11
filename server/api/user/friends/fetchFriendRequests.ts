import { Request, Response } from "express";
import FriendRequest from "../../../models/database/friendRequest";
import ResponseMessage from "../../../models/responseMessage";

const fetchFriendRequests = async (req: Request | any, res: Response) => {
  const sentFriendRequests = await FriendRequest.find({ from: req.id });
  const receivedFriendRequests = await FriendRequest.find({ to: req.id });
  res.json(
    new ResponseMessage(200, { sentFriendRequests, receivedFriendRequests })
  );
};

export default fetchFriendRequests;
