import { Request, Response } from "express";
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
// Utils
import { validateObjectKeys } from "../../../utils";

const validateUsername = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.query, ["username"])) {
    res.json(new ResponseMessage(403));
    return;
  }

  const user = await User.findOne({ username: req.query.username });

  if (!user) {
    res.json(new ResponseMessage(200, { registered: false }));
    return;
  }

  res.json(new ResponseMessage(200, { registered: true }));
};

export default validateUsername;
