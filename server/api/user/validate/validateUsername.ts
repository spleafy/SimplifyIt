import { Request, Response } from "express";
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
import ResponseError from "../../../models/responseError";
// Utils
import { validateObjectKeys } from "../../../utils";

const validateUsername = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.query, ["username"])) {
    res.status(403).json(ResponseError.params());
    return;
  }

  const user = await User.findOne({ username: req.query.username });

  if (!user) {
    res.status(200).json(new ResponseMessage(200, { registered: false }));
    return;
  }

  res.status(200).json(new ResponseMessage(200, { registered: true }));
};

export default validateUsername;
