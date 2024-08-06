import mongoose, { Schema, Document } from "mongoose";
import { ITask } from "../types/task";

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    column: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model<ITask>("Task", TaskSchema);

export default TaskModel;
