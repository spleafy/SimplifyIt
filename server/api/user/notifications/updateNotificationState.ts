import { Request, Response } from "express";
import Notification from "../../../models/database/notification";
import ResponseMessage from "../../../models/responseMessage";
// Utils
import { validateObjectKeys } from "../../../utils";

const updateNotificationState = async (req: Request | any, res: Response) => {
  if (validateObjectKeys(req.body, ["id"])) {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.body.id,
      },
      { $set: { opened: true } },
      { new: true }
    );

    if (notification) {
      const notifications = await Notification.find({ userId: req.id });

      res.json(new ResponseMessage(200, { notifications }));
    } else {
      res.json(new ResponseMessage(400));
    }
  } else {
    res.json(new ResponseMessage(403));
  }
};

export default updateNotificationState;
