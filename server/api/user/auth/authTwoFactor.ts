import { Request, Response } from "express";
import jwt from "jsonwebtoken";
// Models
import ResponseMessage from "../../../models/responseMessage";

const authReset = async (req: Request | any, res: Response) => {
  if (req.body && req.body.twofactorcode) {
    const code = Number(req.body.twofactorcode);

    if (code === req.code) {
      const token = jwt.sign(
        { id: req.id },
        process.env.TOKEN_SECRET as string
      );

      res.json(new ResponseMessage(200, { token }));
    } else {
      res.json(new ResponseMessage(400));
    }
  } else {
    res.json(
      new ResponseMessage(
        400,
        {},
        { message: "No parameters or falsy parameters provided!" }
      )
    );
  }
};

export default authReset;
