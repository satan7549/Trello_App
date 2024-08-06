import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { IUser } from "../types/user";
import UserModel from "../models/user.model";
import sendResponse from "../utils/sendResponse";
import messages from "../utils/messages";

// interface for the user in req
export interface IUserRequest extends Request {
  user?: any;
}

const isUserAuthenticated = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return sendResponse(
      res,
      httpStatus.UNAUTHORIZED,
      false,
      messages.UNAUTHORIZED
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    // Fetch the user from the database
    const user = await UserModel.findById((decoded as any).id).select(
      "-password"
    );

    if (!user) {
      return sendResponse(
        res,
        httpStatus.UNAUTHORIZED,
        false,
        messages.USER_NOT_FOUND
      );
    }

    // Save user inside req.user
    req.user = user as IUser;

    next();
  } catch (error) {
    return sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      messages.SERVER_ERROR,
      error
    );
  }
};

export { isUserAuthenticated };
