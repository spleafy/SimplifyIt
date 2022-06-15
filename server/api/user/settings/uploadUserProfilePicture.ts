import { Response, Request } from "express";
import { validateObjectKeys } from "../../../utils";
import ResponseError from "../../../models/responseError";
import { writeFileSync } from "fs";
// Models
import User from "../../../models/database/user";
import ResponseMessage from "../../../models/responseMessage";

const uploadUserProfilePicture = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.body, ["file"])) {
    res.status(403).json(ResponseError.params());
    return;
  }

  const loggedUser = await User.findOne({ _id: req.id });

  const buffer = new Buffer(
    req.body.file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2],
    "base64"
  );

  writeFileSync(`./files/${loggedUser._id}.png`, buffer);

  const user = await User.findOneAndUpdate(
    { _id: req.id },
    {
      $set: {
        "settings.profile.profilePicture": true,
      },
    }
  );

  res.status(200).json(new ResponseMessage(200, { user }));
};

export default uploadUserProfilePicture;
