import { Request, Response } from "express";
import Notification from "../../models/database/notification";
import ResponseMessage from "../../models/responseMessage";

const updateNotificationState = async (req: Request | any, res: Response) => {
  const notification = await Notification.findOneAndUpdate(
    {
      _id: req.body.id,
    },
    { $set: { opened: true } },
    { new: true }
  );

  if (notification) {
    const notifications = await Notification.find({ userID: req.id });

    res.json(new ResponseMessage(200, { notifications }));
  } else {
    res.json(new ResponseMessage(400));
  }
};

export default updateNotificationState;
