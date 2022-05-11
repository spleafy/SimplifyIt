import { Request, Response } from "express";
import User from "../../../models/database/user";
import ResponseUser from "../../../models/responseUser";
import ResponseMessage from "../../../models/responseMessage";
// Utils
import { validateObjectKeys } from "../../../utils";

const removeFriend = async (req: Request | any, res: Response) => {
  if (!validateObjectKeys(req.body, ["id"])) {
    res.json(new ResponseMessage(403));
    return;
  }

  const user: any = await User.findOneAndUpdate(
    { _id: req.id },
    { $pull: { friends: req.body.id } },
    { new: true }
  );

  await User.updateOne({ _id: req.body.id }, { $pull: { friends: req.id } });

  res.json(
    new ResponseMessage(200, { user: new ResponseUser(user).getUser() })
  );
};

export default removeFriend;
