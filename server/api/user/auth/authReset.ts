import { Request, Response } from "express";
import bcrypt from "bcryptjs";
// Models
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
// Types
import { UserType } from "../../../types";
// Utils
import { validateObjectKeys } from "../../../utils";

const authReset = async (req: Request | any, res: Response) => {
  if (!validateObjectKeys(req.body, ["password"])) {
    res.json(new ResponseMessage(403));
    return;
  }

  const user = await User.findByIdAndUpdate(
    req.id,
    {
      password: await bcrypt.hash(req.body.password, 10),
    },
    { new: true }
  );

  if (!user) {
    res.json(new ResponseMessage(403));
    return;
  }

  res.json(new ResponseMessage(200));
};

export default authReset;
