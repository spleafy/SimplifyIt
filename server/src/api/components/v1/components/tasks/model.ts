import { Schema, model } from "mongoose";

interface Type {
  name: string;
  description: string;
  projectId: string;
  completed: boolean;
  settings: {
    shape: "star" | "circle" | "square" | "triangle";
    color: string;
  };
  creator: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface TaskType extends Type {
  _id: string;
}

const taskSchema = new Schema<Type>(
  {
    name: String,
    description: String,
    projectId: String,
    completed: Boolean,
    settings: {
      shape: String,
      color: String,
    },
    creator: String,
  },
  { timestamps: true }
);

export const Task = model<Type>("Task", taskSchema);
