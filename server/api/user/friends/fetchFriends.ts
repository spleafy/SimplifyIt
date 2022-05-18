import { Request, Response } from "express";
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
// Utils
import { filterUsers } from "../../../utils";

const fetchFriends = async (req: Request | any, res: Response) => {
  const user = await User.findOne({ _id: req.id });

  if (!user) {
    res.json(new ResponseMessage(403));
    return;
  }

  const friends = filterUsers(
    await User.find({
      _id: {
        $in: user.friends,
      },
    })
  );

  res.json(new ResponseMessage(200, { friends }));
};

export default fetchFriends;
