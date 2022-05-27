import { Request, Response } from "express";
import FriendRequest from "../../../models/database/friendRequest";
import User from "../../../models/database/user";
import Notification from "../../../models/database/notification";
import ResponseUser from "../../../models/responseUser";
import ResponseError from "../../../models/responseError";
import ResponseMessage from "../../../models/responseMessage";
// Utils
import { validateObjectKeys } from "../../../utils";

const createFriendRequest = async (req: Request | any, res: Response) => {
  if (!validateObjectKeys(req.body, ["id"])) {
    res.status(403).json(ResponseError.params());
    return;
  }

  const createdFriendRequest = await FriendRequest.findOne({
    from: req.id,
    to: req.body.id,
  });

  if (createdFriendRequest) {
    res
      .status(403)
      .json(new ResponseError(403, "Friend request already exists"));
    return;
  }

  const userTo = await User.findOne({ _id: req.body.id });
  const userFrom = await User.findOne({ _id: req.id });

  if (!userTo.settings.notification.friendRequest) {
    const friendRequest = await new FriendRequest({
      from: req.id,
      to: req.body.id,
      userTo: new ResponseUser(userTo).getUser(),
      userFrom: new ResponseUser(userFrom).getUser(),
    }).save();

    res.status(200).json(new ResponseMessage(200, { friendRequest }));
    return;
  }

  const friendRequest = await new FriendRequest({
    from: req.id,
    to: req.body.id,
    userTo: new ResponseUser(userTo).getUser(),
    userFrom: new ResponseUser(userFrom).getUser(),
  }).save();

  await new Notification({
    userId: userTo._id,
    type: "friendRequest",
    data: {
      username: userFrom.username,
      fullname: userFrom.fullname,
      settings: userFrom.settings,
    },
    opened: false,
    date: new Date(),
  }).save();

  res.status(200).json(new ResponseMessage(200, { friendRequest }));
};

export default createFriendRequest;
