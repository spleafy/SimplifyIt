import { Request, Response } from "express";
import bcrypt from "bcryptjs";
// Models
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
import ResponseError from "../../../models/responseError";
// Types
import { UserType } from "../../../types";
// Utils
import { validateObjectKeys } from "../../../utils";

const authReset = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.body, ["password"])) {
    res.status(403).json(ResponseError.params());
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
    res.status(404).json(ResponseError.notFound());
    return;
  }

  res.status(200).json(new ResponseMessage(200));
};

export default authReset;
