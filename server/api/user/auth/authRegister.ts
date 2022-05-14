import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Models
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
import ResponseUser from "../../../models/responseUser";
// Types
import { UserType } from "../../../types";
// Utils
import { validateObjectKeys } from "../../../utils";

const authRegister = async (req: Request, res: Response) => {
  if (
    validateObjectKeys(req.body, ["fullname", "email", "password", "username"])
  ) {
    const registeredUser = await User.findOne({ email: req.body.email });

    if (!registeredUser) {
      const user: UserType = new ResponseUser(req.body).getUser();

      const colors: string[] = [
        "slate",
        "amber",
        "blue",
        "cyan",
        "emerald",
        "fuchsia",
        "green",
        "indigo",
        "lime",
        "orange",
        "pink",
        "purple",
        "red",
        "rose",
        "sky",
        "teal",
        "violet",
        "yellow",
      ];

      user.password = await bcrypt.hash(req.body.password, 10);
      user.settings = {
        profileColor: "",
        themeColor: "blue",
        darkTheme: false,
        initialSetup: false,
        twoFactor: false,
      };
      user.settings.profileColor =
        colors[Math.floor(Math.random() * colors.length) - 1];

      const createdUser = await new User(user).save();

      const token = jwt.sign(
        { id: createdUser._id },
        process.env.TOKEN_SECRET as string
      );
      res.json(new ResponseMessage(200, { token }));
    } else {
      res.json(
        new ResponseMessage(403, {}, { msg: "User already registered" })
      );
    }
  } else {
    res.json(new ResponseMessage(403));
  }
};

export default authRegister;
