import { Request, Response } from "express";
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
// Utils
import { validateObjectKeys } from "../../../utils";

const validateEmail = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.query, ["email"])) {
    res.json(new ResponseMessage(403));
    return;
  }

  const user = await User.findOne({ email: req.query.email });

  if (!user) {
    res.json(new ResponseMessage(200, { registered: false }));
    return;
  }

  res.json(new ResponseMessage(200, { registered: true }));
};

export default validateEmail;
