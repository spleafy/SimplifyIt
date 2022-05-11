import { Request, Response } from "express";
import User from "../../models/database/user";
import ResponseMessage from "../../models/responseMessage";
// Utils
import { validateObjectKeys } from "../../utils";

const fetchData = async (req: Request | any, res: Response) => {
  if (validateObjectKeys(req.query, ["param"])) {
    const search = req.query.search;
    const param = req.query.param;
    if (param === "all") {
    } else if (param === "workspaces") {
    } else if (param === "tasks") {
    } else if (param === "people") {
    } else if (param === "chats") {
    } else {
    }
    const users = await User.find({ $text: { $search: search } });
    res.json(new ResponseMessage(200, { user: users }));
  } else {
    res.json(new ResponseMessage(403));
  }
};

export default fetchData;
