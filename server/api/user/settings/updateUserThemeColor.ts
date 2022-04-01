import { Request, Response } from "express";
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
import ResponseUser from "../../../models/responseUser";

const updateUserThemeColor = async (req: Request | any, res: Response) => {
  if (req.body && req.body.color) {
    const user = await User.findOneAndUpdate(
      { _id: req.id },
      {
        $set: {
          "settings.themeColor": req.body.color,
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

export default updateUserThemeColor;
