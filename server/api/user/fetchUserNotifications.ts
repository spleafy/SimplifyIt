import { Request, Response } from "express";
import Notification from "../../models/database/notification";
import ResponseMessage from "../../models/responseMessage";

const fetchUserNotifications = async (req: Request | any, res: Response) => {
  const notifications = await Notification.find({ userID: req.id });
  res.json(new ResponseMessage(200, { notifications }));
};

export default fetchUserNotifications;
