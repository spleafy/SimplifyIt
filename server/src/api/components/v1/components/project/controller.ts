import { Request, Response } from "express";
import bcrypt from "bcryptjs";
// Services
import {
  validateObjectKeys,
  ResponseMessage,
} from "../../../../../services/helper";
// Models
import { Project } from "./model";

export const create = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.body, ["name"])) {
    res.status(403).json(ResponseMessage.INVALID_PARAMS());
    return;
  }

  const structure = Object.assign({}, req.body, {
    owner: req.data.id,
    private: true,
    users: [req.data.id],
    settings: {},
  });

  const project = await new Project(structure).save();

  res.status(200).json(ResponseMessage.SUCCESS({ project }));
};

export const fetch = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.query, ["id"])) {
    const project = await Project.find({
      $or: [{ owner: req.data.id }, { users: req.data.id }],
    });

    res.status(200).json(ResponseMessage.SUCCESS({ project }));
    return;
  }

  const project = await Project.findOne({
    _id: req.query.id,
    owner: req.data.id,
  });

  res.status(200).json(ResponseMessage.SUCCESS({ project }));
};

export const update = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.query, ["id"])) {
    res.status(403).json(ResponseMessage.INVALID_PARAMS());
    return;
  }

  const project = await Project.findOneAndUpdate(
    {
      _id: req.query.id,
      owner: req.data.id,
    },
    req.body,
    { new: true }
  );

  res.status(200).json(ResponseMessage.SUCCESS(project));
};

export const remove = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.query, ["id"])) {
    res.status(403).json(ResponseMessage.INVALID_PARAMS());
    return;
  }

  const removed = await Project.deleteOne({
    _id: req.query.id,
    owner: req.data.id,
  });

  if (!removed.acknowledged) {
    res.status(200).json(ResponseMessage.NOT_FOUND());
  }

  res.status(200).json(ResponseMessage.SUCCESS());
};

export const invite = async (req: Request, res: Response) => {
  if (!validateObjectKeys(req.query, ["id", "path"])) {
    res.status(403).json(ResponseMessage.INVALID_PARAMS());
    return;
  }

  const project = await Project.findOne({
    _id: req.query.id,
    owner: req.data.id,
  });

  if (!project) {
    res.status(200).json(ResponseMessage.NOT_FOUND());
    return;
  }

  const hash = await bcrypt.hash(req.query.id as string, 10);

  const invite =
    req.protocol + "://" + req.get("host") + req.query.path + "/" + hash;

  res.status(200).json(ResponseMessage.SUCCESS({ invite }));
};

export default { create, fetch, update, remove, invite };
