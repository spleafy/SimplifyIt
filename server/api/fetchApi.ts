import { Request, Response } from "express";
import ResponseMessage from "../models/responseMessage";

const fetchApi = async (req: Request, res: Response) => {
  res.json(new ResponseMessage(200, { v: "0.0.1" }));
};

export default fetchApi;
