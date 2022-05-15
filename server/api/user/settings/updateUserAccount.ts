import { Request, Response } from "express";
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";
import ResponseUser from "../../../models/responseUser";

const updateUserAccount = async (req: Request | any, res: Response) => {
  if (!req.body) {
    res.json(new ResponseMessage(400));
    return;
  }

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
        "settings.twoFactor": req.body.twoFactor,
        "settings.sound.success": req.body.soundSuccess,
        "settings.sound.warning": req.body.soundWarning,
        "settings.sound.error": req.body.soundError,
        "settings.notification.post": req.body.notificationPost,
        "settings.notification.friendRequest":
          req.body.notificationFriendRequest,
      },
    },
    { new: true }
  );

  res.json(
    new ResponseMessage(200, { user: new ResponseUser(user).getUser() })
  );
};

export default updateUserAccount;
