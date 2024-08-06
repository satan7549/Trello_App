import { Request, Response } from "express";
import TaskModel from "../models/task.model";
import httpStatus from "http-status";
import sendResponse from "../utils/sendResponse";
import messages from "../utils/messages";

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.find();
    sendResponse(res, httpStatus.OK, true, messages.TASKS_FETCHED, tasks);
  } catch (err) {
    sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      messages.SERVER_ERROR,
      err
    );
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  const { title, description, column } = req.body;
  try {
    if (!title || !column) {
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        messages.ALL_CREDENTIAL_REUIRED
      );
    }

    const task = await TaskModel.create({ title, description, column });
    sendResponse(res, httpStatus.CREATED, true, messages.TASK_CREATED, task);
  } catch (err) {
    sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      messages.SERVER_ERROR,
      err
    );
  }
};

// Update an existing task
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, column } = req.body;
  try {
    const task = await TaskModel.findByIdAndUpdate(
      id,
      { title, description, column },
      { new: true }
    );
    if (!task)
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        messages.TASK_NOT_FOUND
      );
    sendResponse(res, httpStatus.OK, true, messages.TASK_UPDATED, task);
  } catch (err) {
    sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      messages.SERVER_ERROR,
      err
    );
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        messages.TASK_ID_REQUIRED
      );
    }

    const task = await TaskModel.findByIdAndDelete(id);
    if (!task)
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        false,
        messages.TASK_NOT_FOUND
      );
    sendResponse(res, httpStatus.OK, true, messages.TASK_DELETED);
  } catch (err) {
    sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      messages.SERVER_ERROR,
      err
    );
  }
};
