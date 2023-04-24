import { Document, model, Schema } from "mongoose";

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface Task {
  name: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskDocument extends Task, Document {}

const TaskSchema = new Schema<TaskDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE],
    default: TaskStatus.TODO,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const TaskModel = model<TaskDocument>("Task", TaskSchema);
