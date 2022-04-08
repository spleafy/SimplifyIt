import { Request, Response } from "express";
import User from "../../models/database/user";
import Notification from "../../models/database/notification";
import ResponseMessage from "../../models/responseMessage";
import ResponseUser from "../../models/responseUser";

const followUser = async (req: Request | any, res: Response) => {
  if (req.body && req.body.username) {
    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { followers: req.id } },
      { new: true }
    );

    if (user) {
      const loggedUser = await User.findOneAndUpdate(
        { _id: req.id },
        {
          $push: {
            following: user._id,
          },
        },
        { new: true }
      );

      await new Notification({
        userID: user._id,
        type: "Follow",
        data: new ResponseUser(loggedUser).getUser(),
        opened: false,
        date: Date.now(),
      }).save();

      res.json(
        new ResponseMessage(200, {
          user: new ResponseUser(user).getUser(),
          loggedUser: new ResponseUser(loggedUser).getUser(),
        })
      );
    } else {
      res.json(new ResponseMessage(400));
    }
  } else {
    res.json(new ResponseMessage(400));
  }
};

export default followUser;
