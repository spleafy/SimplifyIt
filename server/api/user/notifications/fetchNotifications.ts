import { Request, Response } from "express";
import Notification from "../../../models/database/notification";
import ResponseMessage from "../../../models/responseMessage";

const fetchNotifications = async (req: Request | any, res: Response) => {
  const notifications = await Notification.find({ userId: req.id });
  res.json(new ResponseMessage(200, { notifications }));
};

export default fetchNotifications;
