import { Request, Response } from "express";
import User from "../../models/database/user";
import ResponseMessage from "../../models/responseMessage";
import ResponseUser from "../../models/responseUser";

const fetchUserFollowers = async (req: Request | any, res: Response) => {
  const start = req.query.start;

  const limit = req.query.limit;

  const id = req.query.id;

  const user = await User.findOne({ _id: id });

  if (start && limit && user) {
    const followers = await User.find({
      _id: {
        $in: user.followers,
      },
    })
      .limit(limit)
      .skip(start);

    let followersFormatted: any[] = [];

    followers.forEach((account: any) => {
      const userFormatted = new ResponseUser(account).getUser();
      followersFormatted.push(userFormatted);
    });

    res.json(new ResponseMessage(200, { followers: followersFormatted }));
  } else {
    res.json(
      new ResponseMessage(
        400,
        { user: null },
        {
          msg: "Limit or start are not defined or there is no user with that id!",
        }
      )
    );
  }
};

export default fetchUserFollowers;
