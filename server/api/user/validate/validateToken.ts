import { Request, Response } from "express";
import ResponseMessage from "../../../models/responseMessage";

const validateToken = (req: Request, res: Response) => {
  res.status(200).json(new ResponseMessage(200));
};

export default validateToken;
