import { Request, Response } from "express";
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
import ResponseUser from "../../../models/responseUser";

const updateUserAccount = async (req: Request | any, res: Response) => {
  if (req.body) {
    const user = await User.findOneAndUpdate(
      { _id: req.id },
      {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        jobtitle: req.body.jobtitle,
        website: req.body.website,
        location: req.body.location,
        $set: {
          "settings.profileColor": req.body.profileColor,
          "settings.themeColor": req.body.themeColor,
          "settings.darkTheme": req.body.darkTheme,
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

export default updateUserAccount;
