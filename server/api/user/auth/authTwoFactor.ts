import { Request, Response } from "express";
import jwt from "jsonwebtoken";
// Models
import ResponseMessage from "../../../models/responseMessage";
import ResponseError from "../../../models/responseError";
// Utils
import { validateObjectKeys } from "../../../utils";

const authReset = async (req: Request | any, res: Response) => {
  if (!validateObjectKeys(req.body, ["twofactorcode"])) {
    res.status(403).json(ResponseError.params());
    return;
  }

  const code = Number(req.body.twofactorcode);

  if (!code === req.code) {
    res.status(403).json(ResponseError.unauthorized());
    return;
  }

  const token = jwt.sign({ id: req.id }, process.env.TOKEN_SECRET as string);

  res.status(200).json(new ResponseMessage(200, { token }));
};

export default authReset;
