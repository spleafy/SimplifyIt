import { Request, Response } from "express";
import FriendRequest from "../../../models/database/friendRequest";
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
import ResponseUser from "../../../models/responseUser";
// Utils
import { validateObjectKeys } from "../../../utils";

const acceptFriendRequest = async (req: Request | any, res: Response) => {
  if (!validateObjectKeys(req.body, ["id"])) {
    res.json(new ResponseMessage(403));
    return;
  }

  const friendRequest = await FriendRequest.findOne({
    _id: req.body.id,
    to: req.id,
  });

  if (!friendRequest) {
    res.json(new ResponseMessage(400));
    return;
  }

  await FriendRequest.deleteOne({
    _id: req.body.id,
    to: req.id,
  });

  const user = await User.findOneAndUpdate(
    { _id: req.id },
    {
      $push: {
        friends: friendRequest.userFrom._id,
      },
    },
    { new: true }
  );

  await User.updateOne(
    { _id: friendRequest.userFrom._id },
    {
      $push: {
        friends: req.id,
      },
    }
  );

  res.json(
    new ResponseMessage(200, { user: new ResponseUser(user).getUser() })
  );
};

export default acceptFriendRequest;
