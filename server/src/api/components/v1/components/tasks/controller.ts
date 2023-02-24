import { Request, Response } from "express";
// Services
import {
  validateObjectKeys,
  ResponseMessage,
} from "../../../../../services/helper";
// Models
import { Task } from "./model";

const fetch = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.query, ["id"])) {
    res.status(403).json(ResponseMessage.INVALID_PARAMS());
    return;
  }

  const tasks = await Task.findOne({
    _id: req.query.id,
    creator: req.data.id,
  });

  res.status(200).json(ResponseMessage.SUCCESS({ tasks }));
};

const fetchAll = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.query, ["id"])) {
    res.status(403).json(ResponseMessage.INVALID_PARAMS());
    return;
  }

  const tasks = await Task.find({
    projectId: req.query.id,
    creator: req.data.id,
  });

  res.status(200).json(ResponseMessage.SUCCESS({ tasks }));
};

const create = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.body, ["title", "description", "projectId"])) {
    res.status(403).json(ResponseMessage.INVALID_PARAMS());
    return;
  }

  const structure = Object.assign({}, req.body, {
    completed: false,
    creator: req.data.id,
  });

  const tasks = await new Task(structure).save();

  res.status(200).json(ResponseMessage.SUCCESS({ tasks }));
};

const update = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.query, ["id"])) {
    res.status(403).json(ResponseMessage.INVALID_PARAMS());
    return;
  }

  const tasks = await Task.findOneAndUpdate(
    {
      _id: req.query.id,
      creator: req.data.id,
    },
    req.body,
    { new: true }
  );

  res.status(200).json(ResponseMessage.SUCCESS({ tasks }));
};

const remove = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.query, ["id"])) {
    res.status(403).json(ResponseMessage.INVALID_PARAMS());
    return;
  }

  const removed = await Task.deleteOne({
    _id: req.query.id,
    creator: req.data.id,
  });

  if (!removed.acknowledged) {
    res.status(200).json(ResponseMessage.NOT_FOUND());
  }

  res.status(200).json(ResponseMessage.SUCCESS());
};

export default { fetch, fetchAll, create, update, remove };
