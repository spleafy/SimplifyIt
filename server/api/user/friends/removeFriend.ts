import { Request, Response } from "express";
import User from "../../../models/database/user";
import ResponseUser from "../../../models/responseUser";
import ResponseMessage from "../../../models/responseMessage";
import ResponseError from "../../../models/responseError";
// Utils
import { validateObjectKeys } from "../../../utils";
import { UserType } from "../../../types";

const removeFriend = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.body, ["id"])) {
    res.status(403).json(ResponseError.params());
    return;
  }

  const user: UserType | null = await User.findOneAndUpdate(
    { _id: req.id },
    { $pull: { friends: req.body.id } },
    { new: true }
  );

  await User.updateOne({ _id: req.body.id }, { $pull: { friends: req.id } });

  res
    .status(200)
    .json(new ResponseMessage(200, { user: new ResponseUser(user).getUser() }));
};

export default removeFriend;
