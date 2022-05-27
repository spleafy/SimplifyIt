import { Request, Response } from "express";
import Notification from "../../../models/database/notification";
import ResponseMessage from "../../../models/responseMessage";
import ResponseError from "../../../models/responseError";
// Utils
import { validateObjectKeys } from "../../../utils";

const updateNotificationState = async (req: Request | any, res: Response) => {
  if (!validateObjectKeys(req.body, ["id"])) {
    res.status(403).json(ResponseError.params());
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
    res.status(404).json(ResponseError.notFound());
    return;
  }

  const notifications = await Notification.find({ userId: req.id });

  res.status(200).json(new ResponseMessage(200, { notifications }));
};

export default updateNotificationState;
