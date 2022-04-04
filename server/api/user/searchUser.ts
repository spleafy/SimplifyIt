import { Request, Response } from "express";
import User from "../../models/database/user";
import ResponseMessage from "../../models/responseMessage";
import ResponseUser from "../../models/responseUser";

const searchUser = async (req: Request | any, res: Response) => {
  const search = req.query.search;
  const users = await User.find({ $text: { $search: search } });
  res.json(new ResponseMessage(200, { user: users }));
};

export default searchUser;
