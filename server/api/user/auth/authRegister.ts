import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mkdirSync } from "fs";
// Models
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
import ResponseUser from "../../../models/responseUser";
import ResponseError from "../../../models/responseError";
// Types
import { UserType } from "../../../types";
// Utils
import { validateObjectKeys } from "../../../utils";

const authRegister = async (req: Request, res: Response) => {
  if (
    !validateObjectKeys(req.body, ["fullname", "email", "password", "username"])
  ) {
    res.status(403).json(ResponseError.params());
    return;
  }

  const registeredUser = await User.findOne({ email: req.body.email });

  if (registeredUser) {
    res.status(403).json(new ResponseError(403, "User is already registered!"));
    return;
  }

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
    initialSetup: false,
    profile: {
      profileColor: colors[Math.floor(Math.random() * colors.length) - 1],
      profilePicture: false,
      themeColor: "blue",
      darkTheme: false,
    },
    security: { twoFactor: false },
    sound: {
      success: true,
      warning: true,
      error: true,
    },
    notification: {
      post: true,
      friendRequest: true,
    },
  };

  const createdUser = await new User(user).save();

  const token = jwt.sign(
    { id: createdUser._id },
    process.env.TOKEN_SECRET as string
  );
  res.status(200).json(new ResponseMessage(200, { token }));
};

export default authRegister;
