import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mail from "@sendgrid/mail";
import Team from "../../models/database/team";
import User from "../../models/database/user";
import ResponseMessage from "../../models/responseMessage";
// Utils
import { validateObjectKeys } from "../../utils";

const createTeam = async (req: Request | any, res: Response) => {
  if (!validateObjectKeys(req.body, ["users", "name", "color"])) {
    res.json(new ResponseMessage(403));
    return;
  }

  const loggedUser = await User.findOne({ _id: req.id });

  const team = await new Team({
    name: req.body.name,
    users: [req.id],
    adminitstrators: [req.id],
    settings: {
      teamColor: req.body.color,
    },
  }).save();

  req.body.users.split(" ").forEach(async (id: string) => {
    const user = await User.findOne({ _id: id });

    if (user === null) {
      return;
    }

    mail.setApiKey(process.env.SENDGRID_API_KEY as string);

    const token = jwt.sign(
      { id: team._id },
      process.env.TOKEN_SECRET as string
    );

    const message = {
      to: user.email,
      from: "communitybuilderbot@outlook.com",
      subject: "SimplifyIt Team Invitation",
      text: `Join Team Link: ${process.env.FRONTEND_PROTOCOL}://${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/app/team/join?token=${token}`,
      html: `<!DOCTYPE html><html lang="en"><head><style>body {font-family: Verdana, Geneva, Tahoma, sans-serif;display: block;}h1 {color: rgb(36, 40, 58);width: 100%;margin-bottom: 40px;}h2 {color: rgb(57, 59, 65);width: 100%;margin-bottom: 10px;font-size: 16pt;}h3 {color: rgb(70, 75, 97);width: 100%;font-size: 10pt;margin-bottom: 20px;}a {color: rgb(70, 75, 97);width: 100%;transition: color 0.2s ease-in-out;}a:hover {color: rgb(70, 75, 97);}</style></head><body><div><h1>simplifyIt</h1><h2>Join a team</h2><h2>${loggedUser.username} has invited you to join team: ${team.name}</h2><h3>By following this link you will be redirected to our team page</h3><a href="${process.env.FRONTEND_PROTOCOL}://${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}/app/team/join?token=${token}">Join Team</a></div></body></html>`,
    };

    await mail.send(message);
  });

  res.json(new ResponseMessage(200, { team }));
};

export default createTeam;
