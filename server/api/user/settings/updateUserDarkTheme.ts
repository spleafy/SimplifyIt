import { Request, Response } from "express";
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
import ResponseUser from "../../../models/responseUser";

const updateUserDarkTheme = async (req: Request | any, res: Response) => {
  if (req.body && req.body.toggled) {
    const user = await User.findOneAndUpdate(
      { _id: req.id },
      {
        $set: {
          "settings.darkTheme": req.body.toggled,
        },
      },
      { new: true }
    );

    res.json(
      new ResponseMessage(200, { user: new ResponseUser(user).getUser() })
    );
  } else {
    res.json(new ResponseMessage(400));
  }
};

export default updateUserDarkTheme;
