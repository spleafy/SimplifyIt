import { Request, Response } from "express";
import jwt from "jsonwebtoken";
// Models
import ResponseMessage from "../../../models/responseMessage";
// Utils
import { validateObjectKeys } from "../../../utils";

const authReset = async (req: Request | any, res: Response) => {
  if (!validateObjectKeys(req.body, ["twofactorcode"])) {
    res.json(new ResponseMessage(400));
    return;
  }

  const code = Number(req.body.twofactorcode);

  if (!code === req.code) {
    res.json(new ResponseMessage(400));
    return;
  }

  const token = jwt.sign({ id: req.id }, process.env.TOKEN_SECRET as string);

  res.json(new ResponseMessage(200, { token }));
};

export default authReset;
