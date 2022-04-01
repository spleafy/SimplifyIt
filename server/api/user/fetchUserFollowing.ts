import { Request, Response } from "express";
import User from "../../models/database/user";
import ResponseMessage from "../../models/responseMessage";
import ResponseUser from "../../models/responseUser";

const fetchUserFollowing = async (req: Request | any, res: Response) => {
  const start = req.query.start;

  const limit = req.query.limit;

  const id = req.query.id;

  const user = await User.findOne({ _id: id });

  if (start && limit && user) {
    const following = await User.find({
      _id: {
        $in: user.following,
      },
    })
      .limit(limit)
      .skip(start);

    let followingFormatted: any[] = [];

    following.forEach((account: any) => {
      const userFormatted = new ResponseUser(account).getUser();
      followingFormatted.push(userFormatted);
    });

    res.json(new ResponseMessage(200, { following: followingFormatted }));
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

export default fetchUserFollowing;
