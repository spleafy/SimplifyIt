import { Schema, model } from "mongoose";

interface Type {
  title: string;
  description: string;
  projectId: string;
  completed: boolean;
  creator: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface TaskType extends Type {
  _id: string;
}

const taskSchema = new Schema<Type>(
  {
    title: String,
    description: String,
    projectId: String,
    completed: Boolean,
    creator: String,
  },
  { timestamps: true }
);

export const Task = model<Type>("Task", taskSchema);
