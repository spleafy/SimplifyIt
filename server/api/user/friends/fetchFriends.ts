import { Request, Response } from "express";
import User from "../../../models/database/user";
import ResponseUser from "../../../models/responseUser";
import ResponseMessage from "../../../models/responseMessage";

const fetchFriends = async (req: Request | any, res: Response) => {
  const user = await User.findOne({ _id: req.id });

  const friendsUnfiltered = await User.find({
    _id: {
      $in: user.friends,
    },
  });

  const friends: any = [];

  friendsUnfiltered.forEach((unfilteredFriend: any) => {
    friends.push(new ResponseUser(unfilteredFriend).getUser());
  });

  res.json(new ResponseMessage(200, { friends }));
};

export default fetchFriends;
