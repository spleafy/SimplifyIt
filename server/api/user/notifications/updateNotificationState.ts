import { Request, Response } from "express";
import Notification from "../../../models/database/notification";
import ResponseMessage from "../../../models/responseMessage";
// Utils
import { validateObjectKeys } from "../../../utils";

const updateNotificationState = async (req: Request | any, res: Response) => {
  if (!validateObjectKeys(req.body, ["id"])) {
    res.json(new ResponseMessage(403));
    return;
  }

  const notification = await Notification.findOneAndUpdate(
    {
      _id: req.body.id,
    },
    { $set: { opened: true } },
    { new: true }
  );

  if (!notification) {
    res.json(new ResponseMessage(400));
    return;
  }

  const notifications = await Notification.find({ userId: req.id });

  res.json(new ResponseMessage(200, { notifications }));
};

export default updateNotificationState;
