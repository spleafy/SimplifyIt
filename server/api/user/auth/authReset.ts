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
  const id = req.id;

  if (validateObjectKeys(req.body, ["password"])) {
    const user = await User.findByIdAndUpdate(
      id,
      {
        password: await bcrypt.hash(req.body.password, 10),
      },
      { new: true }
    );

    if (user) {
      res.json(new ResponseMessage(200));
    } else {
      res.json(new ResponseMessage(403));
    }
  } else {
    res.json(new ResponseMessage(403));
  }
};

export default authReset;
