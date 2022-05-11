import { Request, Response } from "express";
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
// Utils
import { validateObjectKeys } from "../../../utils";

const validateUsername = async (req: Request, res: Response) => {
  if (validateObjectKeys(req.query, ["username"])) {
    const user = await User.findOne({ username: req.query.username });

    if (user) {
      res.json(new ResponseMessage(200, { registered: true }));
    } else {
      res.json(new ResponseMessage(200, { registered: false }));
    }
  } else {
    res.json(new ResponseMessage(403));
  }
};

export default validateUsername;
