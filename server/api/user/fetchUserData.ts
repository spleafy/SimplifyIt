import { Request, Response } from "express";
import User from "../../models/database/user";
import ResponseMessage from "../../models/responseMessage";
import ResponseUser from "../../models/responseUser";
// Utils
import { validateObjectKeys } from "../../utils";

const fetchUserData = async (req: Request | any, res: Response) => {
  if (validateObjectKeys(req.query, ["username"])) {
    const user = await User.findOne({ username: req.query.username });
    res.json(
      new ResponseMessage(200, { user: new ResponseUser(user).getUser() })
    );
  } else {
    const user = await User.findOne({ _id: req.id });
    res.json(
      new ResponseMessage(200, { user: new ResponseUser(user).getUser() })
    );
  }
};

export default fetchUserData;
