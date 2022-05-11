import { Request, Response } from "express";
import FriendRequest from "../../../models/database/friendRequest";
import User from "../../../models/database/user";
import ResponseUser from "../../../models/responseUser";
import ResponseMessage from "../../../models/responseMessage";
// Utils
import { validateObjectKeys } from "../../../utils";

const createFriendRequest = async (req: Request | any, res: Response) => {
  if (validateObjectKeys(req.body, ["id"])) {
    const createdFriendRequest = await FriendRequest.findOne({
      from: req.id,
      to: req.body.id,
    });

    if (createdFriendRequest) {
      res.json(new ResponseMessage(403));
      return;
    }

    const userTo = await User.findOne({ _id: req.body.id });
    const userFrom = await User.findOne({ _id: req.id });

    const friendRequest = await new FriendRequest({
      from: req.id,
      to: req.body.id,
      userTo: new ResponseUser(userTo).getUser(),
      userFrom: new ResponseUser(userFrom).getUser(),
    }).save();
    res.json(new ResponseMessage(200, { friendRequest }));
  } else {
    res.json(new ResponseMessage(403));
  }
};

export default createFriendRequest;
