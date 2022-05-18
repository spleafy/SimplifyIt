import { Request, Response } from "express";
import Team from "../../models/database/team";
import ResponseMessage from "../../models/responseMessage";

const fetchTeams = async (req: Request | any, res: Response) => {
  const teams = await Team.find({
    users: req.id,
  });

  res.json(new ResponseMessage(200, { teams }));
};

export default fetchTeams;
