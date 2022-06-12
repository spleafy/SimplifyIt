import { Request, Response } from "express";
// Models
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";

export const authDelete = async (req: Request, res: Response) => {
  const user = User.findOneAndDelete({ _id: req.id });
};
