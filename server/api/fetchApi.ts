import { Request, Response } from "express";
import ResponseMessage from "../models/responseMessage";

const fetchApi = async (req: Request, res: Response) => {
  res.status(200).json(new ResponseMessage(200, { version: "1.0" }));
};

export default fetchApi;
