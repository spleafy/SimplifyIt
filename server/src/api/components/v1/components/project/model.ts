import { Schema, model } from "mongoose";

interface Type {
  name: string;
  owner: string;
  private: boolean;
  users: string[];
  settings: {};
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectType extends Type {
  _id: string;
}

const projectSchema = new Schema<Type>(
  {
    name: String,
    owner: String,
    private: Boolean,
    users: [String],
    settings: {},
  },
  { timestamps: true }
);

export const Project = model<Type>("Project", projectSchema);
