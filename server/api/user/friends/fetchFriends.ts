import { Request, Response } from "express";
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
import ResponseError from "../../../models/responseError";
// Utils
import { filterUsers } from "../../../utils";

const fetchFriends = async (req: Request | any, res: Response) => {
  const user = await User.findOne({ _id: req.id });

  if (!user) {
    res.status(404).json(ResponseError.notFound());
    return;
  }

  const friends = filterUsers(
    await User.find({
      _id: {
        $in: user.friends,
      },
    })
  );

  res.status(200).json(new ResponseMessage(200, { friends }));
};

export default fetchFriends;
