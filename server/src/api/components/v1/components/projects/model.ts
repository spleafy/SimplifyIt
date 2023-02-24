import { Schema, model } from "mongoose";

interface Type {
  name: string;
  private: boolean;
  users: string[];
  settings: {
    shape: "star" | "circle" | "square" | "triangle";
    color: string;
  };
  creator: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectType extends Type {
  _id: string;
}

const projectSchema = new Schema<Type>(
  {
    name: String,
    private: Boolean,
    users: [String],
    settings: {
      shape: String,
      color: String,
    },
    creator: String,
  },
  { timestamps: true }
);

export const Project = model<Type>("Project", projectSchema);
