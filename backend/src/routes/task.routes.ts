import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.get("/", getTasks);
taskRouter.post("/", createTask);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;
