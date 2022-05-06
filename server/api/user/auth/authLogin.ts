import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import mail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
// Models
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
// Types
import { UserType } from "../../../types";

const authLogin = async (req: Request, res: Response) => {
  const user: UserType | null = req.body
    ? await User.findOne({
        username: req.body.username,
      })
    : null;

  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      if (user.settings.twoFactor) {
        mail.setApiKey(process.env.SENDGRID_API_KEY as string);

        const code = Math.floor(Math.random() * 9000 + 1000);

        const message = {
          to: user.email,
          from: "communitybuilderbot@outlook.com",
          subject: "SimplifyIt Two Factor Authentication",
          text: `Two factor authentication`,
          html: `<!DOCTYPE html><html lang="en"><head><style>body {font-family: Verdana, Geneva, Tahoma, sans-serif;display: block;}h1 {color: rgb(36, 40, 58);width: 100%;margin-bottom: 40px;}h2 {color: rgb(57, 59, 65);width: 100%;margin-bottom: 10px;font-size: 16pt;}h3 {color: rgb(70, 75, 97);width: 100%;font-size: 10pt;margin-bottom: 20px;}a {color: rgb(70, 75, 97);width: 100%;transition: color 0.2s ease-in-out;}a:hover {color: rgb(70, 75, 97);}</style></head><body><div><h1>simplifyIt</h1><h2>Two factor authentication</h2><h3>Paste this code in the field of the page: </h3><h1>${code}</h1></div></body></html>`,
        };

        const response = await mail.send(message);

        const twoFactorToken = jwt.sign(
          {
            code,
            id: user._id,
          },
          process.env.TOKEN_SECRET as string,
          { expiresIn: "1h" }
        );

        res.json(
          new ResponseMessage(200, {
            twoFactorToken,
            mailStatus: response[0].statusCode,
          })
        );
      } else {
        const token = jwt.sign(
          { id: user._id },
          process.env.TOKEN_SECRET as string
        );

        res.json(new ResponseMessage(200, { token }));
      }
    } else {
      res.json(new ResponseMessage(400));
    }
  } else {
    res.json(new ResponseMessage(400));
  }
};

export default authLogin;
